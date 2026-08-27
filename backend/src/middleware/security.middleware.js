// Rate limiting & security headers middleware

const clientRequestCounts = new Map()

export const rateLimiter = (limit = 120, windowMs = 60000) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress || '127.0.0.1'
    const now = Date.now()

    const userRecord = clientRequestCounts.get(ip) || { count: 0, resetTime: now + windowMs }

    if (now > userRecord.resetTime) {
      userRecord.count = 1
      userRecord.resetTime = now + windowMs
    } else {
      userRecord.count += 1
    }

    clientRequestCounts.set(ip, userRecord)

    res.setHeader('X-RateLimit-Limit', limit)
    res.setHeader('X-RateLimit-Remaining', Math.max(0, limit - userRecord.count))
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('X-Frame-Options', 'DENY')
    res.setHeader('X-XSS-Protection', '1; mode=block')

    if (userRecord.count > limit) {
      return res.status(429).json({
        error: 'Too Many Requests',
        message: 'Rate limit exceeded for clinical NLP endpoint.',
      })
    }

    next()
  }
}
