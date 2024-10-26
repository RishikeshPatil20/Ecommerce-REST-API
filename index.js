import express from "express";
import productRouter from "../REST API/src/resources/product/product.route.js";
import userRouter from "./src/resources/user/user.router.js";
import cartRouter from "./src/resources/cart/cart.router.js";

import basicauthorization from "./src/middlewares/basicAuthorization.js";
import jwtAuth from "./src/middlewares/jwtTokenAuthorization.js";
import { writeLog } from "./src/utils.js";

const PORT = 8000;
const server = express();

// Use express.urlencoded and express.json correctly as middleware
server.use(express.urlencoded({ extended: true }));
server.use(express.json()); // <-- Add parentheses here
//server.use('/',basicauthorization);

server.use("/api/product", productRouter);
server.use("/api/user", userRouter);
server.use("/api/cart", jwtAuth, cartRouter);

//using basic authorization
server.get("/api/test", (req, res) => {
  writeLog("request make to api/test")
  return res.status(200).json({
    success: true,
    data: "all Good",
  });
});
// server.get("/api/test", basicauthorization, (req, res) => {
//   return res.status(200).json({
//     success: true,
//     data: "all Good",
//   });
// });
// server.get('/api/test',jwtAuth, (req, res) => {
//     return res.status(200).json({
//         success: true,
//         data: "all Good"
//     });
// });

server.use("/", (req, res) => {
  return res.status(404).json({
    success: false,
    data: "Page not found",
  });
});

server.listen(PORT, (err) => {
  if (err) {
    console.log("error", err);
    return;
  }
  console.log("server started at port", PORT);
});
