import { Router } from "express";
import * as CategoryController from "./controller.categories";
import * as CategoryMiddleware from "./middleware.categories";

const router = Router();
export default router;

//add validation
router.post(
  "/category",
  CategoryMiddleware.catgoryExistsBySlug,
  CategoryMiddleware.parentCategoryExistsById,
  CategoryController.createCategory
);

router.delete("/category", 
    CategoryMiddleware.categoryExistsById,
    CategoryController.deleteCategory
);

router.patch("/category",
    CategoryMiddleware.categoryExistsById,
    CategoryMiddleware.parentCategoryExistsById,
    CategoryController.updateCategoryParent
)