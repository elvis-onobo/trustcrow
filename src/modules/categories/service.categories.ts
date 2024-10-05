import db from "@/config/db"
import * as categoryQueries from "./queries.categories"
import * as helpers from "@utils/globals/helpers"

export const createCategory = async(name: string, parentId?: number) => {
    const slug = helpers.slugify(name)
    return await db.oneOrNone(categoryQueries.createCategory, [name, parentId, slug])
}

export const getCategoryBySlug = async(slug: string) => {
    return await db.oneOrNone(categoryQueries.getCategoryBySlug, [slug])
}

export const getCategoryById = async(id: number) => {
    return await db.oneOrNone(categoryQueries.getCategoryById, [id])
}