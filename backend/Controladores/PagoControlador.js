const pdf = require('html-pdf')
const path = require('path')
const nodemailer = require('nodemailer')
const fs = require('fs')
const pdfTemplate = require("../documents/recibo")
const env = require('dotenv').config() 
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

exports.createPdf = (req,res)=>{

    //var image = path.join(__dirname , 'logo.png')
    pdf.create(pdfTemplate(req.body) ,{}).toFile('./controladores/recibo.pdf',(err)=>{
        if(err){
            console.log(err);
        }
        res.send('pdf generado')
    })
}

exports.fetchPdf = (req,res)=>{
    res.sendFile(path.join(__dirname , 'recibo.pdf'))
}

const oauth2Client = new OAuth2( 
    process.env.CLIENT_ID,  
    process.env.CLIENT_SECRET);

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });

 

exports.sendPdf = (req,res)=>{

    const { email } = req.body;
   
    console.log("email " + req.body.email)
    
    const accessToken = oauth2Client.getAccessToken();
    pathToAttachment = path.join(__dirname , 'recibo.pdf')
    attachment = fs.readFileSync(pathToAttachment).toString("base64")
  
    let smtpTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      }
    })

    smtpTransport.sendMail({
        from:process.env.EMAIL,
        to: req.body.email,
        subject:'Recibo',
        html: pdfTemplate(req.body)
       /*  html:`
        Recibo de pago adjuntado. Gracias`,
        attachments:[
            {
                content:attachment,
                filename:'recibo.pdf',
                contentType: 'application/pdf',
                path:pathToAttachment
            }
        ] */
    },function(error,info){
        if(error){
            console.log(error);
        }
        else{
            res.send("El mail ha sido enviado a la cuenta detallada")
        }    
    }) 
    
}