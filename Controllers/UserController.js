const express = require('express')
const UserModel = require('../Models/User')
const app = express()
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');


    const register = asyncHandler( async (req, res, next) => {
        const {username, email, password} = req.body;
        const userExist = await UserModel.findOne( { email });
        if( userExist ){
            res.status(400)
            throw new Error("User Already Exist")
        }

        const user = await UserModel.create({
            username,email,password
        });
        if( user ){
            res.status(201).json( {
                result: user,
                success:true,
                token: generateToken( user._id )
            })
        }
    });

    const login = asyncHandler ( async (req, res, next) => {
        const { email, password } = req.body;
        const user = await UserModel.findOne({email});
        if( user && ( await user.matchPassword(password) ) ){
            data = {
                _id : user._id,
                email : user.email,
            }
            res.status(200).json( {
                result: data,
                success:true,
                token: generateToken( user._id )
            })
        }else{
            res.status(400);
            throw new Error( 'Email or Password Invlid ');
        }
        
    });

    const deleteUser = asyncHandler ( async (req, res, next) => {
        const _id = req.params.id;
        const user = await UserModel.findById({_id});
        if( user ){
            const deleteUser = await UserModel.deleteOne({_id});
            if( deleteUser.acknowledged === true ){
                res.status(200).json( {
                    result: 'user deleted',
                    success:true,
                })
            }
        }else{
            res.status(400);
            throw new Error( 'user ID Invlid ');
        }

    })

    const getusers = asyncHandler ( async (req, res, next) => {
        const _id = req.params.id;
        if( _id ){
            const getusers = await UserModel.find({_id}); // select * from users where id = id
            if( getusers ){
                res.status(200).json( {
                    result: getusers,
                    success:true,
                })
            }else{
                res.status(400);
                throw new Error( 'no data');
            }
        }else{
            const getusers = await UserModel.find().sort({_id:-1}); // select * from users order by id = 'desc'
            if( getusers ){
                res.status(200).json( {
                    result: getusers,
                    success:true,
                })
            }else{
                res.status(400);
                throw new Error( 'no data');
            }
        }  
    })

    const deleteAll = asyncHandler ( async (req, res, next) => {
        const deleteAll = await UserModel.deleteMany();
        if( deleteAll.acknowledged === true ){
            res.status(200).json( {
                result: deleteAll, //'all user deleted',
                success:true,
            })
        }
    })

module.exports = { register,login, deleteUser,getusers,deleteAll }