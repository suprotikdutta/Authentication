const userRepository = require('../repositories/user.repository');
const tokenRepository = require('../repositories/token.repository');
const express = require('express');
const loginServices = require('../services/login.services');
const userServices = require('../services/services.user');
var app = express();


module.exports.createUser = async (req, res) => {
    if (req.body.name && req.body.email && req.body.password) {
        const hashedPassword = await userServices.hashPassword(req.body.password);
        try {
            await userRepository.createUser({ name: req.body.name, email: req.body.email, password: hashedPassword });
            res.status(200);
            res.send({ Message: "User Created Succesfully" });
        } catch (e) {
            res.status(403);
            res.send("Email already in use");
        }
    } else {
        res.status(400);
        res.send("Give proper credentials");
    }
    
    
    
    
};

module.exports.loginUser = async (req, res) => {
    const emailId = req.body.email;
    const password = req.body.password;
    if (emailId && password) {
        const user = await userRepository.findByEmail({email: emailId});
        const returnValue = await loginServices.loginUser(user, password);
        if (returnValue.details) {
            res.status(200);
            res.send({ message : returnValue.Message , token:returnValue.details.token });
        } else {
            res.status(401);
        res.send(returnValue.Message);
        }
    } else {
        res.status(400);
        res.send("Give proper credentials");
    }
    
}

module.exports.logoutUser = async (req, res) => {
    const token = req.body.token;
    try {
        const tokenData = await tokenRepository.findUserByToken(token);
        await tokenRepository.deleteTokenById(tokenData.id);
        res.status(200);
        res.send("Logout Successful");
    } catch (e) {
        console.log(e);
    }
}
  

module.exports.updateUserById = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    if (name || email || password) {
        await userRepository.updateById(req);
        res.status(200);
        res.send({ Message: "User Updated Succesfully" });
        return { message: "User updated successfully" };
    } else {
        res.status(400);
        res.send("Give proper credentials");
    }
    
};
  
module.exports.findUserById = async (req, res) => {
    const user = await userRepository.findById({ id: req.params.id });
    res.send({ name: user.name, email: user.email });
    return { name: user.name, email: user.email };
};
  
module.exports.deleteUserById = async (req, res) => {
    const token = req.body.token;
    const tokenData = await tokenRepository.findUserByToken(token);
    const user = await userRepository.findById({ id: tokenData.userId });
    await tokenRepository.deleteTokenById(tokenData.id);
    await userRepository.deleteById({ id: tokenData.userId });
    res.status(200);
    res.send(`User deleted succesully whose name is ${user.name}`);
}