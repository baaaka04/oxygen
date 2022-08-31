import fs from 'fs'

export function getHotkeysNumber () {
    const settings = fs.readFileSync('./utils/settings.json', 'utf-8');
    const buttonsN = JSON.parse(settings).user.hotkeys
    return buttonsN
}