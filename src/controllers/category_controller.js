const CategoryModel = require("../models/category_model");
const { responseJson } = require("../utils/http");

const categoryController = {};

categoryController.insert = async (req, res, next) => {
    try {
        // 1 get data dari body
        const { name } = req.body;
        // 2 validate input
        if (!name) {
            throw ("bad_request");
        }
        // 3 create cate
        const newCategory = new CategoryModel({ name });
        const result = await newCategory.save();  // Simpan penulis ke database

        return responseJson(res, result, "Category created", 201);
        // 4 return response
        responseJson(res, { category: result }, "created", 201);
    } catch (error) {
        if (error.code === 11000) {
            return responseJson(res, null, "Duplicate entry", 409);
        }
        next(error);
    } 
};

categoryController.getAll = async (req, res, next) => {
    try {
        const result = await CategoryModel.find({isDeleted: false}); // Contoh pengambilan data
        if (!result) {
            return responseJson(res, null, "No categorys found", 404);
}
responseJson(res, result, "Category retrieved", 200);
    } catch (error) {
        next(error);
    } 
};

categoryController.update = async (req, res, next) => {
    try {
          // 1 get data dari body
          const { name } = req.body;
          const { id } = req.params;
          // 2 validate input
          if (!name || !id) {
              throw new Error("bad_request");
          }
          // 3 find and update
          const result = await CategoryModel.findByIdAndUpdate(id, {
            name,
          });
              
  
          //3.a if result undifine throw not found
          if (!result) {
              throw { name: "not_found" };
          }
  
          result.name= name;
          // 4 return response
          responseJson(res, { category: result }, "name updated successfully", 200);
    } catch (error) {
        next(error);
    } 
};

categoryController.delete = async (req, res, next) => {
    try {
          // 1 get data dari body
          const { id } = req.params;
          // 2 validate input
          if (!id) {
              throw new Error("bad_request");
          }
          // 3 find and update
          const result = await CategoryModel.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true } // Mengembalikan dokumen yang telah diperbarui
         );
  
          //3.a if result undifine throw not found
          if (!result) {
              throw { name: "not_found" };
          }
  
          result.isDeleted = true;
          // 4 return response
          responseJson(res, { category: result }, "delete successfully", 200);
    } catch (error) {
        next(error);
    } 
};

module.exports = categoryController;