import validator from "validator";
import UserModel from "../user/user.model.js";
import dotenv from 'dotenv';
//import jwt from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

// dotenv.config();

export default class UserController {
  registerNow(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!validator.isEmail(email)) {
        return res.status(400).json({
          success: false,
          message: "Email Is Not Valid",
        });
      }
      if (UserModel.getUserFromEmail(email)) {
        return res.status(400).json({
          succes: false,
          message: "Error: Email allready exist in system",
        });
      }

      let user = {
        name: name,
        email: email,
        password: password,
      };
      let newUser = UserModel.createUser(user);
      let newUser1 = { ...newUser };
      delete newUser1.password;
      return res.status(200).json({
        success: true,
        data: newUser1,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
  login(req, res) {
    try {
      const { email, password } = req.body;
      console.log("email:", email);
      console.log("password:", password);
      if (!email || !validator.isEmail(email)) {
        return res.status(400).json({
          success: false,
          message: "Email Is Not Valid",
        });
      }

      let user = UserModel.getUserFromEmail(email);
      console.log("usdr :", user);

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Email/Password Is Not Valid",
        });
      }

      console.log("user", user);

      if (user.password !== password) {
        return res.status(400).json({
          success: false,
          message: "Email/Password Is Not Valid",
        });
      }
      //headers
      //payload
      //secret key="askdjcni";
      //let token =
      // process.env.SECRET_KEY

      let payloadData= {
        email:user.email,
        name:user.name
      }
      // Error : secretOrPrivateKey must have a value
      // console.log("secret key :", process.env.SECRET_KEY);
      //  let token = jwt.sign(payloadData,process.env.SECRET_KEY);

      let secretKey = "sgdjhsdghsd##$";
      console.log("secret key :",secretKey );
      
      let token = jwt.sign(payloadData,secretKey,{expiresIn:500});

      return res.status(200).json({
        success: true,
        token: token
      });
    
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
}
