
export const createCategory = `INSERT INTO categories (category_name, parent_id, slug) VALUES ($1, $2, $3) RETURNING *;`

export const getCategoryBySlug = `SELECT slug FROM categories WHERE slug = $1;`

export const getCategoryById = `SELECT id, category_name FROM categories WHERE id = $1;`