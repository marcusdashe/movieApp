const mongoose = require("mongoose")
const shortid = require("shortid")
const { User } = require("../models/userModels")





module.exports = {


    // User's Controllers

    createUser: (req, res)=>{
        if(!req.body){
            res.status(400).send({ message: "Content can not be empty"})
            return
        }

        let user = User({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            referralCode: shortid.generate(),
            referrerCode: req.body.referrercode
        })
        user._id = new mongoose.Types.ObjectId
        user.setPassword(req.body.password)

        user.save().then( result => {
            res.json({"message": "Successfully created a new user account", "data": result})
        }).catch(err => {
            if(err){
                res.status(500).send({
                    "message": err.message || "Error occured while trying to create a user",
                    "referal code": user.referralCode
                })
            }
        })

    },


    // Retrive all users

    getAllUsers: (req, res)=> {
        User.find({}).then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                "message": err.message || "Error occured while trying to retrieve all users"
            })
        })
    },


    // Retrive user by ID

    getUserByID: (req, res)=> {
        User.findById(req.params.id).then(data => {
            if(!data){
                res.status(404).send({message: `Not found user with ID ${req.params.id}`})
            }
            else 
                res.send(data)
        }).catch(err => {
            res.status(500).send({ message: `Error occured while retrieving user with ID: ${req.params.id} `})
        })
    },


    // Retrive user by Email

    getUserByEmail: (req, res)=> {
        User.find({email: req.params.email}).then(data => {
            if(!data){
                res.status(404).send({message: `Not found user with email: ${res.params.email}`})
            }
            else
                res.send(data)
        }).catch(err => {
            res.status(500).send({ message: `Error occured while retrieving user with email: ${req.params.email} `})
        })
    },


    // Update User by ID

    updateUserByID: (req, res)=> {
        let id = req.body.id
        if(!req.body){
            return res.status(400).send({ message: "Data to update can not be empty"})
        }

        User.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(data => {
            if(!data){
                res.status(404).send({message: `Can not update User with ID: ${id}. Perhaps User is not found}`})
            }
            else
                res.send({message: "User was updated successfully"})
        }).catch(err => {
            res.status(500).send({message: `Error occured while updating user with id ${id}`})
        })
    },


     // Update User by Email

     updateUserByEmail: (req, res)=> {
        let email = req.body.email
        

        User.findByIdAndUpdate({email: email}, req.body).then(data => {
            if(!data){
                res.status(404).send({message: `Can not update User with email: ${email}. Perhaps User is not found}`})
            }
            else
                res.send({message: "User was updated successfully"})
        }).catch(err => {
            res.status(500).send({message: `Error occured while updating user with email ${email}`})
        })
    },


     // Delete User by ID

     deleteUserByID: (req, res)=> {
        let id = req.body.id
        User.findByIdAndRemove(id).then(data => {
            if(!data){
                res.status(404).send({message: `Can not delete User with id: ${id}. Perhaps User is not found`})
            }
            else
                res.send({message: "User was Deleted successfully"})
        }).catch(err => {
            res.status(500).send({message: `Error occured while deleting user with id ${id}`})
        })
    },


    // Delete All Users

    deleteAllUsers: (req, res)=> {
        User.deleteMany().then(data => {
                res.send({message: `${data.deletedCount} Users were deleted successful`})
        }).catch(err => {
            res.status(500).send({message: err.message || `Error occured while removing all user`})
        })
    }
}