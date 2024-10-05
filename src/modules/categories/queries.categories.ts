
export const createCategory = `INSERT INTO categories (category_name, parent_id, slug) VALUES ($1, $2, $3) RETURNING *;`

export const getCategoryBySlug = `SELECT slug FROM categories WHERE slug = $1;`

export const getCategoryById = `SELECT id, category_name FROM categories WHERE id = $1;`

export const deleteCategory = `DELETE FROM categories WHERE id = $1;`

export const updateCategoryParent = `UPDATE categories SET parent_id = $2 WHERE id = $1 RETURNING *;`

export const getSubcategories = `SELECT * FROM categories WHERE parent_id = $1 ORDER BY category_name ASC;`