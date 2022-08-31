import fs from 'fs'

export default function settings(req, res) {
    const num = +req.body.hotkey
    const currentSettingsFile = fs.readFileSync('./utils/settings.json', 'utf-8')
    let newSettings = JSON.parse(currentSettingsFile)
    newSettings.user.hotkeys = num
    fs.writeFileSync('./utils/settings.json', JSON.stringify(newSettings))
    res.status(201).json({})
}