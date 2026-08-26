import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'fedclin_nlp_development_secret_key_2026'

export const loginUser = (req, res) => {
  const { email, password, role } = req.body

  // Generate signed JWT token
  const token = jwt.sign(
    {
      id: 'usr-4821',
      email: email || 'puneeshgulati05@gmail.com',
      role: role || 'Doctor',
      hospitalAffiliation: 'Hospital Node A (Cardiology Hub)',
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  )

  return res.json({
    success: true,
    token,
    user: {
      id: 'usr-4821',
      name: 'Puneesh Gulati',
      email: email || 'puneeshgulati05@gmail.com',
      role: role || 'Doctor',
      hospitalAffiliation: 'Hospital Node A (Cardiology Hub)',
    },
  })
}

export const verifySession = (req, res) => {
  return res.json({
    valid: true,
    user: req.user,
    timestamp: new Date().toISOString(),
  })
}
