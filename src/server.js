/**
 * external module
 */
const express = require("express")
const cors = require("cors")
const { join } = require("path")
/**
 * internal modules
 */
const { initialize } = require("./services/dbms")

/**
 * initializations
 */
const server = express()
const port = process.env.PORT || 2001
initialize()

//server initialization process
server.use(cors())
server.use(express.json())
server.use(express.static(process.env.PUBLIC || join(__dirname, "../public"))) //overkill, i know

/**
 * start
 */
server.listen(port, () => {
	//console.clear()
	console.log("server running on port: ", port)
})
