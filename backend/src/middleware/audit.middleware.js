import crypto from 'crypto'

export const auditLoggerMiddleware = (req, res, next) => {
  const startTime = Date.now()

  res.on('finish', () => {
    const durationMs = Date.now() - startTime
    const payload = `${req.method}:${req.originalUrl}:${req.user?.id || 'anonymous'}:${Date.now()}`
    const sha256Hash = crypto.createHash('sha256').update(payload).digest('hex')

    const auditEntry = {
      timestamp: new Date().toISOString(),
      method: req.method,
      endpoint: req.originalUrl,
      statusCode: res.statusCode,
      actor: req.user?.name || 'System / Unauthenticated',
      role: req.user?.role || 'Guest',
      sha256Hash,
      durationMs,
    }

    if (process.env.NODE_ENV !== 'test') {
      console.log(`[AUDIT SHA-256:${sha256Hash.slice(0, 8)}] ${req.method} ${req.originalUrl} (${res.statusCode})`)
    }
  })

  next()
}
