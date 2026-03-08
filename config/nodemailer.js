const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');
const { relative } = require('path');
const config = require('./app-config');

let transporter=nodemailer.createTransport(config.smtp);

let renderTemplate=(data, relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err, template){
            if(err){console.log(err);return;}
            mailHTML=template;
        }
    )
    return mailHTML;
}
module.exports={
    transporter: transporter,
    renderTemplate: renderTemplate
}
