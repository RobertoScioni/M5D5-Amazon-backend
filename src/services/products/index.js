/**
 *  Every product in your marketplace is shaped in this way:
 *    {
 *       "_id": "5d318e1a8541744830bef139", //SERVER GENERATED
 *       "name": "app test 1",  //REQUIRED
 *       "description": "somthing longer", //REQUIRED
 *       "brand": "nokia", //REQUIRED
 *       "imageUrl": "https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80",
 *       "price": 100, //REQUIRED
 *       "category": "smartphones"
 *       "createdAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
 *       "updatedAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
 *   }
 *
 *  CRUD for Products ( /products GET, POST, DELETE, PUT)
 */

/**
 * basic imports
 */
const { response } = require("express")
const express = require("express")
const {
	openTable,
	insert,
	checkId,
	selectByField,
	del,
	linkFile,
} = require("../dbms")
const { join } = require("path")
const fs = require("fs-extra") //friendship ended with fs, fs extra is my new best friend
const multer = require("multer")
const { writeFile } = require("fs")

//initialization
const router = express.router()
const upload = multer({})

//routes
router.get("/", async (req, res, next) => {
	try {
		openTable("products.json")
	} catch (error) {
		console.error(error)
		error.httpStatusCode = 500
		next(error)
	}
})

router.post("/", async (req, res, next) => {
	try {
		insert("product.json", req.body, null)
	} catch (error) {
		console.error(error)
		error.httpStatusCode = 500
		next(error)
	}
})

router.delete("/:id", async (req, res, next) => {
	try {
		del("product.json", req.body)
	} catch (error) {
		console.error(error)
		error.httpStatusCode = 500
		next(error)
	}
})

router.put("/:id", async (req, res, next) => {
	try {
		insert("product.json", req.body, id)
	} catch (error) {
		console.error(error)
		error.httpStatusCode = 500
		next(error)
	}
})

router.post("/:id/image", upload.single("picture"), async (req, res, next) => {
	try {
		const dest = join(
			__dirname,
			"../../../public/img/products",
			req.file.originalname
		)
		await writeFile(dest, req.file.buffer)
		linkFile(
			"products.json",
			id,
			"image",
			"http://localhost:3000/img/products/" + req.file.originalname
		)
	} catch (error) {
		console.error(error)
		error.httpStatusCode = 500
		next(error)
	}
})
