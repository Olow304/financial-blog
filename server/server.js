// Libraries
import bp from 'body-parser'
import express from 'express'
import passport from 'passport'
import mongoose from 'mongoose'
import cors from 'cors'

// my modules
import config from './database/mongodb'
import users from './api/Users'

/*
    setup node.js server 
    if you need know how to setup the server, check the link below
    ref: https://bit.ly/2tKi2fE
*/

// Set the port if no environment port is set
const PORT = process.env.PORT || 5000

const server = express()
const path = require('path')

// User the body-parser middleware
server.use(bp.urlencoded({extended: true}))
server.use(bp.json())
server.use(cors())

server.use(express.static(path.join(__dirname, "client/build")))

// connect to DB
mongoose.connect(config.DB, {useNewUrlParser: true}).then(() => {
    console.log("MongoDB Connected.")
}, err => {
    console.log(err)
})

server.use(passport.initialize())
require("./config/passport").default(passport)

// Assign routes!
server.use("/api/users", users)
//server.use("/api/posts", posts)
//server.use("/api/news", news)
//server.use("/api/userStock", userStock)

// Start the server
server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))

