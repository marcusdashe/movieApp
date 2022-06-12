const mongoose = require("mongoose")
// const User = mongoose.model('User');
const User = require('../models/user')

module.exports = {
    // Retrive all users
    getAllUsers: async (req, res)=> {
        try{
           const users = await User.find({});
           res.status(200).json({ message: "successfull", users})
        }
        catch(err){
            res.status(500).json({ message: "Error occured while trying to retrieve all users"})
        }
    },

    // Retrive user
    getUser: async (req, res)=> {
       try{
        const {id, email} = req.body;

        const user = await User.find({$or: [{_id: id}, {email}]});
        if(!user)
            res.status(404).json({message: `User not found!`});
        res.status(200).json({message: 'successfull', user});
       }

       catch(err){
            res.status(500).send({ message: `Error occured while retrieving user with email: ${req.params.email} `})
       }
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