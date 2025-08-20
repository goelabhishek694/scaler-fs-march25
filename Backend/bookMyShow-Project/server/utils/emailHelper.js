// const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../.env" });
const {RESEND_API_KEY}  = process.env;
const axios = require("axios");
const fs = require("fs");
const path = require('path');
const API_URL = "https://api.resend.com/emails";

function replaceContent(content, data){
    const keys = Object.keys(data);
    keys.forEach(key => {
        content = content.replace(`#{${key}}`, data[key]) //#{${key}} -> #{name}
    }) 
    return content;
}

async function emailHelper(templateName, receiverEmail, data){
    try{

        const templatePath = path.join(__dirname, "email_templates", templateName);
        let content = await fs.promises.readFile(templatePath, "utf-8");
        console.log(content);
        content = replaceContent(content, data)
        const emailDetails ={
            from: '"Abhishek" <onboarding@resend.dev>',
            to: "goelabhishek694@gmail.com",
            subject: "Mail from ScalerShows",
            text: "Hello world?", // plain‑text body
            html: content, // HTML body
        }

        // const transportDetails = {
        //     host: "smtp.resend.com",
        //     port: 587,
        //     secure: false, // true for 465, false for other ports
        //     auth: {
        //         user: "resend",
        //         pass: "re_X8r5m9bL_GjHEqFST3FTb3aQdNRKyjAdx",
        //     },
        // }

        // const transporter = nodemailer.createTransport(transportDetails)
        // const info = await transporter.sendMail(emailDetails);
        // console.log(info);

        const response = await axios.post(API_URL, emailDetails, {
            headers: {
                "Authorization": `Bearer ${RESEND_API_KEY}`,
                "Content-Type": "application/json"
            },
        });
        console.log("email sent");
    }catch(err){
        console.log(err);
    }
}

module.exports = emailHelper;
// emailHelper("otp.html", "", {"name":"Arunava", "otp":"398712"});