import mongoose from 'mongoose'


const userCollection = 'loginUser'

const userSchema = new mongoose.Schema({
    emailSignup:{
        type:String,
        required:true
    },
    passwordSignup:{
        type:String,
        required:true
    }
})


const UserModel = mongoose.model(userCollection, userSchema)
export default UserModel;