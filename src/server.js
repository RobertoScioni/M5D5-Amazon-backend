/**
 * external module
 */
const express = require("express")
const cors = require("cors")
const { join } = require("path")
const productRoutes = require("./services/products")
/**
 * internal modules
 */
const { initialize } = require("./services/dbms")
const { badRequest, funny, catchAllHandler } = require("./services/error")
/**
 * initializations
 */
const server = express()
const port = process.env.PORT || 2001
const publicFolder = process.env.PUBLIC || join(__dirname, "../public")
initialize()

//server initialization process
server.use(cors())
server.use(express.json())
server.use(express.static(publicFolder)) //overkill, i know
server.use("/products", productRoutes)
server.use(badRequest)
server.use(funny)
server.use(catchAllHandler)

/**
 * start
 */
server.listen(port, () => {
	//console.clear()
	console.log("server running on port: ", port)
	console.log("serving files from ", publicFolder)
})
