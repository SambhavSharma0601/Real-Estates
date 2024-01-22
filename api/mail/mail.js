// var nodemailer = require('nodemailer');
import nodemailer from 'nodemailer';



function sendMail(i) {
    var mailOptions = {
        from: 'spotifyuse143@gmail.com',
        to: 'lakshay.ynr@gmail.com',
        subject: 'Hi dear lakshay - ' + i,
        text: 'Offering you a job in Zomato (delivery boy)'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

var i = 0;
var intervalId = setInterval(function () {
    sendMail(i);
    i++;

    if (i >= 50) {
        clearInterval(intervalId);
    }
}, 3000); 
