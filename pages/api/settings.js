import fs from 'fs'
import { getSettings, setSettings } from '../../utils/utils'

export default function settings(req, res) {
    const num = +req.body?.hotkey
    const categoriesList = req.body?.categories
    const currentSettingsFile = getSettings()
    let newSettings = JSON.parse(currentSettingsFile)
    num ? newSettings.user.hotkeys = num : null
    categoriesList ? newSettings.user.categories = categoriesList : null
    setSettings(newSettings)
    res.status(201).json({ newSettings })
}