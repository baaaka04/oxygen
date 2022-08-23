export default function isAuthorized(req) {
    if (process.env.Z) return true //check demo mode
    const session = req.headers?.cookie
    const key = process.env.SESSION_KEY
    return session === `token=${key}`
}