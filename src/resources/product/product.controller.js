import logger from "../../logger.js";
import ProductModel from "../product/product.model.js";
import validator from "validator";

export default class ProductController {
  //-----------
  getAllProducts(req, res) {
    try {
      let products = ProductModel.getAllProducts();
      return res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      console.log("error :", error);
      return res.status(500).json({
        success: true,
        message: "Internal Server Error",
      });
    }
  }
  //-----------
  getProductWithId(req, res) {
    try {
      let { id } = req.params;
      id = Number(id);
      if (Number.isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Product Id",
        });
      }
      let product = ProductModel.getProductWithId(id);
      if (!product) {
        return res.status(400).json({
          success: false,
          message: "Product not Valid",
        });
      }
      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      console.log("error :", error);
      return res.status(500).json({
        success: true,
        message: "Internal Server Error",
      });
    }
  }
  //-----------

  addProduct(req, res) {
   try {
    console.log("body", req.body);
    const { name, describtion, category, price, imageUrl, sizes } = req.body;

      //validate the data

      // if (!name || !describtion || !category || !imageUrl || !sizes) {
      //   console.log(name);
      //   return res.status(400).json({
      //     success: false,
      //     message: "Invalid Input",
      //   });
      // }
    if (!validator.isAlpha(name)) {
      return res.status(400).json({
        success: false,
        message: "Product Name Should Be String",
      });
    }
    if (name.length < 4) {
      errorMssg = `Name Should Have min 3 character you have given ${name.length}`;
      return res.status(400).json({
        success: false,
        message: errorMssg,
      });
    }
    let priceToInsert = Number(price);
    if (Number.isNaN(priceToInsert) || price <= 0) {
      errorMssg = `Price Should Be Greater Than 0`;
      return res.status(400).json({
        success: false,
        message: errorMssg,
      });
    }
    if (!ProductModel.isCatgeoryValid(category)) {
      return res.status(400).json({
        success: false,
        message: `Category ${category} Is Not Valid`,
      });
    }
    if (!Array.isArray(sizes)) {
      return res.status(400).json({
        success: false,
        message: "Sizes should be an Array",
      });
    }
    for (let i = 0; i < sizes.length; i++) {
      if (!ProductModel.isSizeValid(sizes[i])) {
        return res.status(400).json({
          success: false,
          message: `Size ${sizes[i]} is not valid `,
        });
      }
    }

    let obj = {
      name: name,
      describtion: describtion,
      category: category,
      price: price,
      imageUrl: imageUrl,
      sizes: sizes,
    };
    let newProduct = ProductModel.addNewProduct(obj);
    return res.status(200).json({
      succss: true,
      data: newProduct,
    });
   } catch (error) {
    console.log("error :", error);
      return res.status(500).json({
        success: true,
        message: "Internal Server Error",
      });
   }
  }
  filterProduct(req, res) {
    try {
      let { minPrice, maxPrice, category } = req.query;

      //validate

      minPrice = Number(minPrice);
      if (Number.isNaN(minPrice) || minPrice <= 0) {
        return res.status(400).json({
          success: false,
          message: "Price Should be Number greater than zero",
        });
      }
      maxPrice = Number(maxPrice);
      if (Number.isNaN(maxPrice) || maxPrice <= 0) {
        return res.status(400).json({
          success: false,
          message: "Price Should be Number greater than zero",
        });
      }
      if (minPrice > maxPrice) {
        return res.status(400).json({
          success: false,
          message: "Min Price Should Be Greater Than Max Price",
        });
      }

      if (!category || !ProductModel.isCatgeoryValid(category)) {
        return res.status(400).json({
          success: false,
          message: "Category Is Not Valid",
        });
      }

      let products = ProductModel.productFilter(minPrice, maxPrice, category);

      return res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
  rateproduct(req,res){
    try {
      let {userId,productId,rating}=req.body;
      if(!userId){
        return res.status(401).json({
          success : false,
          message : "User Not Found"
        });
      }
      rating = Number(rating);
      if(Number.isNaN(rating) && rating >=0){
        return res.status(401).json({
          success : false,
          message:"Rating is not valid"
        })
      };
      let resp =ProductModel.rateProduct(userId,productId,rating);
      if (!resp["success"]) {
        return res.status(401).json({
          success: false,
          message: resp.message,
        });
      }
      return res.status(200).json({
        success : true,
        data : resp.data
      })
      
    } catch (error) {
      console.log("error", error);
      logger.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }

  }
  rateproductWithAuthenticate(req,res){
    try {
      let {productId,rating}=req.body;
      let userId = req.user.id;
      
      if(!userId){
        return res.status(401).json({
          success : false,
          message : "User Not Found"
        });
      }
      rating = Number(rating);
      if(Number.isNaN(rating) && rating >=0){
        return res.status(401).json({
          success : false,
          message:"Rating is not valid"
        })
      };
      let resp =ProductModel.rateProduct(userId,productId,rating);
      if (!resp["success"]) {
        return res.status(401).json({
          success: false,
          message: resp.message,
        });
      }
      return res.status(200).json({
        success : true,
        data : resp.data
      })
      
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }

  }
}
