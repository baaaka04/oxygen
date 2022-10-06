import fs from 'fs'

export function getCategoriesList() {
    const settings = fs.readFileSync('./utils/settings.json', 'utf-8');
    const categories = JSON.parse(settings).user.categories
    return categories
}