import mongoose from 'mongoose'
/*
    Set up user database
    @ Username, Email, Password, Date created
*/

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("User", UserSchema)