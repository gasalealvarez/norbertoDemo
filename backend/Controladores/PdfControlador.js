const pdf = require('html-pdf')
const path = require('path')
const nodemailer = require('nodemailer')
const fs = require('fs')
const pdfTemplate = require("../documents/document")
const env = require('dotenv').config() 
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


exports.createPdf = (req,res)=>{

    var image = path.join(__dirname , 'logo.png')
    pdf.create(pdfTemplate(req.body, image) ,{}).toFile('./controladores/invoice.pdf',(err)=>{
        if(err){
            console.log(err);
        }
        res.send('pdf generated')
    })
}

exports.fetchPdf = (req,res)=>{
    res.sendFile(path.join(__dirname , 'invoice.pdf'))
}

const oauth2Client = new OAuth2( 
    process.env.CLIENT_ID,  
    process.env.CLIENT_SECRET);

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });

 

exports.sendPdf = (req,res)=>{

    const datos = req.body;

    
    const  {nombre,  email, recibo , total, productos} = datos;

   
    console.log("datos " + datos)   
    console.log(nombre,  email, recibo , total, productos)

    const accessToken = oauth2Client.getAccessToken();
    //pathToAttachment = path.join(__dirname , 'invoice.pdf')
    //attachment = fs.readFileSync(pathToAttachment).toString("base64")
  
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
        to: email,
        subject:'Factura de compra',
        html: pdfTemplate(nombre,  email, recibo , total, productos)
    },function(error,info){
        if(error){
            console.log(error);
        }
        else{
            res.send("El mail ha sido enviado a la cuenta detallada")
        }    
    }) 
    
}