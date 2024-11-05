const AuthorModel = require("../models/author_model");
const { responseJson } = require("../utils/http");

const authorController = {};

authorController.insert = async (req, res, next) => {
    try {
        // 1 get data dari body
        const { name } = req.body;
        // 2 validate input
        if (!name) {
            throw ("bad_request");
        }
        // 3 create author
        const newAuthor = new AuthorModel({ name });
        const result = await newAuthor.save();  // Simpan penulis ke database

        return responseJson(res, result, "Author created", 201);
        // 4 return response
        responseJson(res, { author: result }, "created", 201);
    } catch (error) {
        if (error.code === 11000) {
            return responseJson(res, null, "Duplicate entry", 409);
        }
        next(error);
    } 
};

authorController.getAll = async (req, res, next) => {
    try {
        const result = await AuthorModel.find({isDeleted: false}); // Contoh pengambilan data
        if (!result) {
            return responseJson(res, null, "No authors found", 404);
}
responseJson(res, result, "Authors retrieved", 200);
    } catch (error) {
        next(error);
    } 
};

authorController.upload = async (req, res, next) => {
    try {
        // 1 get data dari body
        const { imageUrl, id } = req.body;
        // 2 validate input
        if (!imageUrl || !id) {
            throw new Error("bad_request");
        }
        // 3 find and update
        const result = await AuthorModel.findByIdAndUpdate(
            { _id: id, isDeleted:false },
            {
                imageUrl,
            },
            { new: true }
        ) ;

        //3.a if result undifine throw not found
        if (!result) {
            throw { name: "not_found" };
        }

        result.imageUrl = imageUrl;
        // 4 return response
        responseJson(res, { author: result }, "Image updated successfully", 200);
    } catch (error) {
        next(error);
    } 
};

authorController.update = async (req, res, next) => {
    try {
          // 1 get data dari body
          const { name } = req.body;
          const { id } = req.params;
          // 2 validate input
          if (!name || !id) {
              throw new Error("bad_request");
          }
          // 3 find and update
          const result = await AuthorModel.findByIdAndUpdate(id, 
              {name}, { new: true, runValidators: true}) ;
  
          //3.a if result undifine throw not found
          if (!result) {
              throw { name: "not_found" };
          }
  
          result.name= name;
          // 4 return response
          responseJson(res, { author: result }, "name updated successfully", 200);
    } catch (error) {
        next(error);
    } 
};

authorController.delete = async (req, res, next) => {
    try {
          // 1 get data dari body
          const { id } = req.params;
          // 2 validate input
          if (!id) {
              throw new Error("bad_request");
          }
          // 3 find and update
          const result = await AuthorModel.findByIdAndUpdate(id, {
            isDeleted: true,
          }) ;
  
          //3.a if result undifine throw not found
          if (!result) {
              throw { name: "not_found" };
          }
  
          // 4 return response
          responseJson(res, { author: result }, "delete successfully", 200);
    } catch (error) {
        next(error);
    } 
};

module.exports = authorController;