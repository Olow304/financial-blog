// outside libraries
import express from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import Bcrypt from 'bcryptjs'

// inside modules
import user from '../models/User'
import ValidLogin from '../testing/login'
import ValidRegister from '../testing/register'
import keys from '../config/keys'

/*
    Storing user data into database
*/

const router = express.Router()

// @route /register
router.post("/register", (req, res) => {
    //send 400 error with validation errors if not valid.
    const {errors, isValid} = ValidRegister(req.body);
    if(!isValid){
        return res.status(400).json(errors)
    }

    // check to see if the email already in the database
    user.findOne({email: req.body.email}).then(user => {
        if(user){
            errors.email = "Email already exists"
            return res.status(400).json(errors)
        }

        // if user is not found, create it
        const newUser = new user({
            username: req.body.username, 
            email: req.body.email,
            passport: req.body.passport
        })

        // for security concern let's encrypt their password
        const saltRounds = 10
        Bcrypt.getSalt(saltRounds, function(err, salt){
            Bcrypt.hash(newUser.passport, salt, function(err, hash){
                if(err){
                    throw err
                }
                newUser.passport = hash
                newUser.save().then(user =>res.json(user)).catch(err)
            })
        })
    })
})

// @route /login
router.post("/login", (req, res) => {
    //send 400 error with validation errors if not valid.
    const {errors, isValid} = ValidLogin(req.body)
    if(!isValid){
        return res.status(400).json(errors)
    }

    const email = req.body.email
    const password = req.body.password

    // check to see if the email already in the database
    user.findOne({email: req.body.email}).then(user => {
        if(!user){
            errors.email = "User is not exists"
            return res.status(400).json(errors)
        }

        // check to see if the input password is that same as hash password
        Bcrypt.compare(password, user.password).then(isVal => {
            if(isVal){
                const payload = {id: user.id, username: user.username}
                // allow the browser to remember the current user - unless they logout
                jwt.sign(
                    payload,
                    keys.ApiKey,
                    {expiresIn: 4000},
                    (token) => {res.json({success: true, token: "Bearer" + token})}
                )
            }else{
                errors.password = "incorrect password"
                return res.status(400).json(errors)
            }
        }) 
    })

})

// Allow user to signup with facebook or google





// @route /users/current - private
router.get("/current", passport.authenticate("jwt", {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username,
        email: req.user.email
    })
})

export default router;