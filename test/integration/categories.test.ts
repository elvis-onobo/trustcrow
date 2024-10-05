import {describe, expect, it, afterAll} from '@jest/globals';
import request from "supertest";
import app from "../../src/app"
import db from "../../src/config/db"

const baseUrl = "/v1"

const category1 = "Men"
const category2 = "Women"
const subcategy1 = "Boys"
const subcategy2 = "Girls"

describe("Category", () => {
    afterAll(() => {
        db.$pool.end()
    })

    it("POST /category should create a new category", async () => {
        const response = await request(app)
           .post(`${baseUrl}/category`)
           .send({ name: category1 })
        const { success, status, message, data } = response.body;
        process.env.MEN_CATEGORY_ID = data.id
        expect(success).toBeTruthy()
        expect(status).toBe(201);
        expect(message).toBe("Category created successfully");
        expect(data.slug).toBe("men");
        expect(data).toHaveProperty("id")
    })
    
    it("POST /category should return a message if a category already exists", async () => {
        const response = await request(app)
           .post(`${baseUrl}/category`)
           .send({ name: category1 })
        const { success, status, message, data } = response.body;
        expect(success).toBeFalsy();
        expect(status).toBe(422);
        expect(message).toBe("Category already exists");
    })

    it("POST /category should return a message if non-existent parentId is used", async () => {
        const response = await request(app)
           .post(`${baseUrl}/category`)
           .send({ name: category2, parentId: 24 })
        const { success, status, message, data } = response.body;
        expect(success).toBeFalsy();
        expect(status).toBe(422);
        expect(message).toBe("Parent category does not exist");
    })

    it("POST /category should create a new category for women category", async () => {
        const response = await request(app)
           .post(`${baseUrl}/category`)
           .send({ name: category2 })
        const { success, status, message, data } = response.body;
        process.env.WOMEN_CATEGORY_ID = data.id
        expect(success).toBeTruthy()
        expect(status).toBe(201);
        expect(message).toBe("Category created successfully");
        expect(data.slug).toBe("women");
        expect(data).toHaveProperty("id")
    })

    it("POST /category should create a subcategory for an existing parent Id", async () => {
        const response = await request(app)
           .post(`${baseUrl}/category`)
           .send({ name: subcategy1, parentId: process.env.MEN_CATEGORY_ID })
        const { success, status, message, data } = response.body;
        process.env.BOYS_SUBCATEGORY_ID = data.id
        expect(success).toBeTruthy();
        expect(status).toBe(201);
        expect(message).toBe("Category created successfully");
    })

    it("PATCH /category should return a response if category is not passed in the body", async () => {
        const response = await request(app)
           .patch(`${baseUrl}/category`)
           .send({
            "parentId": process.env.WOMEN_CATEGORY_ID
          })
        const { success, status, message, data } = response.body;
        expect(success).toBeFalsy()
        expect(status).toBe(400);
        expect(message).toBe("\"categoryId\" is required");
    })

    it("PATCH /category should update the parent of a subcategory", async () => {
        const response = await request(app)
           .patch(`${baseUrl}/category`)
           .send({
            "categoryId": process.env.BOYS_SUBCATEGORY_ID,
            "parentId": process.env.WOMEN_CATEGORY_ID
          })
        const { success, status, message, data } = response.body;
        expect(success).toBeTruthy()
        expect(status).toBe(200);
        expect(message).toBe("Category parent updated successfully");
        expect(data).toMatchObject({
            "id": Number(process.env.BOYS_SUBCATEGORY_ID),
            "category_name": subcategy1,
            "slug": subcategy1.toLowerCase(),
            "parent_id": Number(process.env.WOMEN_CATEGORY_ID)
          })
    })

    it("GET /category should list the subcategories under a parent category", async () => {
        const response = await request(app)
           .get(`${baseUrl}/subcategories?id=${process.env.WOMEN_CATEGORY_ID}`)
        const { success, status, message } = response.body;
        expect(success).toBeTruthy();
        expect(status).toBe(200);
        expect(message).toBe("Subcategories retrieved successfully");
    })

    it("GET /category should return a message if the submitted category does not exist", async () => {
        const response = await request(app)
           .get(`${baseUrl}/subcategories?id=22`)
        const { success, status, message } = response.body;
        expect(success).toBeFalsy();
        expect(status).toBe(422);
        expect(message).toBe("Category does not exist");
    })

    it("DELETE /category should return a message if the category to be deleted does not exist", async () => {
        const response = await request(app)
           .delete(`${baseUrl}/category?id=24`)
        const { success, status, message } = response.body;
        expect(success).toBeFalsy();
        expect(status).toBe(422);
        expect(message).toBe("Category does not exist");
    })

    it("DELETE /category should delete a category", async () => {
        const response = await request(app)
           .delete(`${baseUrl}/category?id=${process.env.MEN_CATEGORY_ID}`)
        const { success, status, message } = response.body;
        expect(success).toBeTruthy();
        expect(status).toBe(200);
        expect(message).toBe("Category deleted successfully");
    })
})