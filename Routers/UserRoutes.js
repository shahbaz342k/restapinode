const express = require("express");
const { register, login, deleteUser, getusers, deleteAll } = require("../Controllers/UserController");
const UserRoutes = express.Router();

UserRoutes.get('/users/:id?',getusers);
UserRoutes.post('/user/register',register);
UserRoutes.post('/user/login', login);
UserRoutes.delete('/users/:id', deleteUser);
UserRoutes.delete('/users/delete-all', deleteAll);
module.exports = UserRoutes;
