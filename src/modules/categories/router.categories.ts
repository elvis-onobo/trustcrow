import express from "express";
import * as CategoryController from "./controller.categories";
import * as CategoryMiddleware from "./middleware.categories";
import * as CategoryValidator from "./validation.categories";
import * as Validator from "../../utils/validator"

const router = express.Router();
export default router;

router.post(
  "/category",
  Validator.validateBody(CategoryValidator.createCategory),
  CategoryMiddleware.catgoryExistsBySlug,
  CategoryMiddleware.parentCategoryExistsById,
  CategoryController.createCategory
);

router.delete("/category", 
    Validator.validateQueryParam(CategoryValidator.id),
    CategoryMiddleware.categoryExistsById,
    CategoryController.deleteCategory
);

router.patch("/category",
    Validator.validateBody(CategoryValidator.updateCategoryParent),
    CategoryMiddleware.categoryExistsById,
    CategoryMiddleware.parentCategoryExistsById,
    CategoryController.updateCategoryParent
)

router.get("/subcategories", 
    Validator.validateQueryParam(CategoryValidator.id),
    CategoryMiddleware.categoryExistsById,
    CategoryController.getSubcategories
)