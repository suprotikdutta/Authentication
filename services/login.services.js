const tokenRepository = require('../repositories/token.repository');
const userServices = require('../services/services.user.js');
const randtoken = require('rand-token');
const express = require('express');
var app = express();

const createToken = async (data) => {
    var token1 = randtoken.generate(16);
    await tokenRepository.createToken({ userId: data, token: token1 });
}



module.exports.loginUser = async (user,password) => {
    if (!user) {
        return ({ Message: "Email or password incorrect" });
    } else {
        const match = await userServices.comparePassword(password, user.password);
        if (!match) {
            return ({ Message: "Email or password incorrect" });
        } else {
            let userTokenDetails = await tokenRepository.findToken(user.id);
            if (!userTokenDetails) {
                await createToken(user.id);
                userTokenDetails = await tokenRepository.findToken(user.id)
            }

            // if (!userTokenDetails) {
            //     userTokenDetails = await tokenRepository.findToken(user.id)
            // }

        return ({details:userTokenDetails,Message:"WELCOME"});
        }
    }
}


module.exports.logoutUser = async () => {
    
}