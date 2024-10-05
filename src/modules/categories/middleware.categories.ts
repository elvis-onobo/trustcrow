import { Request, Response, NextFunction } from "express"
import * as CategoriesService from "./service.categories"
import { slugify } from "@/utils/globals/helpers"
import * as response from "@utils/response"
import logger from "@/utils/logger"

export const catgoryExistsBySlug = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const { name } = req.body
        const slug = slugify(name)
        const category = await CategoriesService.getCategoryBySlug(slug)
        if(category) return response.error(res, "Category already exists", 422)
        return next()
    } catch (error) {
        logger.error(`CategoriesMiddleware.catgoryExists:: Failed to retrieve category`)
        return response.error(res, "Category check failed", 400)
    }
}

export const parentCategoryExistsById = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const { parentId } = req.body
        const category = await CategoriesService.getCategoryById(parentId)
        if(!category) return response.error(res, "Parent category does not exist", 422)
        return next()
    } catch (error) {
        logger.error(`CategoriesMiddleware.categoryExistsById:: Failed to retrieve category`)
        return response.error(res, "Category check failed", 400)
    }
}