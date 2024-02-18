import jwt from 'jsonwebtoken'

export function signJwt(object: Object, signingKey: string, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: 'RS256'
  })
}

export function verifyJwt<T>(token: string, verifyingKey: string): T | null {
  try {
    const decoded = jwt.verify(token, verifyingKey) as T
    return decoded
  } catch (error) {
    return null
  }
}
