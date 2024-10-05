import { Request, Response } from "express"
import logger from "../../utils/logger"
import * as categoryService from "./service.categories"
import * as response from "../../utils/response"

export const createCategory = async (req:Request, res:Response) => {
    const { name, parentId } = req.body
    const data = await categoryService.createCategory(name, parentId)
    return response.success(res, "Category created successfully", 201, data)
}

export const deleteCategory = async (req:Request, res:Response) => {
    const { id } = req.query
    await categoryService.deleteCategory(Number(id))
    return response.success(res, "Category deleted successfully", 200)
}

export const updateCategoryParent = async (req:Request, res:Response) => {
    const { categoryId, parentId } = req.body
    const data = await categoryService.updateCategoryParent(Number(categoryId), Number(parentId))
    return response.success(res, "Category parent updated successfully", 200, data)
}

export const getSubcategories = async(req: Request, res: Response) => {
    const { id } = req.query
    const data = await categoryService.getSubcategories(Number(id))
    return response.success(res, "Subcategories retrieved successfully", 200, data)
}