export default function login(req, res) {

    const body = req.body
    const MAX_AGE = 60 * 60 * 24 * 365 //1 год
    const pswd = process.env.PASS_WORD
    const session = process.env.SESSION_KEY

    if (body.value === pswd) {
        res.setHeader('Set-Cookie', `token=${session}; Max-Age=${MAX_AGE}; path=/`)
        res.status(200).send()
    } else {
        res.status(401).send("Authentication error: WRONG PASSWORD")
    }

}