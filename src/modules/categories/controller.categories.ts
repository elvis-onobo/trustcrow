import { Request, Response } from "express"
import logger from "@/utils/logger"
import * as categoryService from "./service.categories"
import * as response from "@utils/response"

export const createCategory = async (req:Request, res:Response) => {
    const { name, parentId } = req.body
    const data = await categoryService.createCategory(name, parentId)
    return response.success(res, "Category created successfully", 201, data)
}