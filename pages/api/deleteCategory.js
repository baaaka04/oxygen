import { getCategoriesList } from "../../utils/getCategoriesList";
import { getSettings, setSettings } from "../../utils/utils";


export default function deleteCategory(req, res) {
    const newCategory = req.body.category
    const curCategories = getCategoriesList()
    const newCategories = curCategories.filter(cat => cat !== newCategory)
    const curSettings = getSettings()
    let newSettings = JSON.parse(curSettings)
    newSettings.user.categories = newCategories
    setSettings(newSettings)
    res.status(201).json(
        { newCategories }
    )
}