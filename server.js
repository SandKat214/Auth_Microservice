/** Citation for microservice code
 *  Date: 11/24/2024
 *  Adapted from:
 *  Source URL: https://www.youtube.com/playlist?list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT
 */

require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes")

// express app
const app = express()
const PORT = process.env.PORT

// middleware
app.use(cors({ credentials: true, origin: "*" }))
app.use(express.json())
app.use((req, res, next) => {
	console.log(req.path, req.method)
	next()
})

// routes
app.use("/auth/", userRoutes)

// connect to db
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		// server
		app.listen(PORT, () => {
			console.log(
				`Authorization microservice connected to db and listening on http://localhost:${PORT}....`
			)
		})
	})
	.catch((error) => {
		console.log(error)
	})
