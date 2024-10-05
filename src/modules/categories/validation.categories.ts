import Joi from "joi";

export const createCategory = Joi.object({
  name: Joi.string().min(2).required(),
  parentId: Joi.number().optional()
});

