import Joi from "joi";

export const createCategory = Joi.object({
  name: Joi.string().min(2).required(),
  parentId: Joi.number().optional()
});

export const id = Joi.object({
    id: Joi.number().required()
})

export const updateCategoryParent = Joi.object({
    categoryId: Joi.number().required(),
    parentId: Joi.number().required()
})