const express = require('express');
const tokenRepository = require('../repositories/token.repository');
var app = express();

module.exports.isLoggedin = async (req, res, next) => {
    const token = req.body.token;
    if (!token) {
        res.status(400);
        res.send({ message: "Give proper token" });
    } else {
        const value = await tokenRepository.findUserByToken(token);
        if (!value) {
            res.status(401);
        res.send({ message: "You must be logged in" });
    } else {
        req.params.id = value.userId;
        next();
    }
    }
    
    
}