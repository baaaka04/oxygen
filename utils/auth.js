export default function isAuthorized(req) {
    const session = req.headers?.cookie
    const key = process.env.SESSION_KEY
    return session === `token=${key}`
}