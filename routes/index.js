var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");


var Data = require('../Data/logindata');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next) {
  res.render('index');
});

router.post('/new_pass', function(req, res, next) {
  res.render('dashbroad');
});


router.post('/otp', function(req, res, next) {

  var first = req.body.new;
  var confiom = req.body.confiom;

  try {

    if(first == confiom)
    {
      res.status(201).render("new_pass");
    }
    else
    {
      res.send("<h1>invilid password....!!")
    }
    
  } catch (error) {
    
  }
});


router.post('/login', async function(req,res,next){

  try {
    
    const email = req.body.email;
    const password = req.body.password;
    const useremail = await Date.findOne({email:email});

    if(useremail.password == password){
      res.status(201).render('dashboard')
    }else{
      res.send("invalid login details...");
    }

  } catch (error) {

      res.status(400).send("invalid login details....");
  }
})

router.get('/register', function(req,res,next) {
  res.render('register');
});


router.post('/register', async function(req,res,next) {
  
    try {
      const reg = await Data.create(req.body);

      res.status(201).json({
        status:"success",
        data:reg
      })

    } catch (error) {
      
    }
});

router.get('/forget',function(req,res,next) {
  res.render('forget');
})
  var otp = Math.random();
  otp = otp * 1000000;
  otp = parseInt(otp);

router.post('/forget', async function(req,res,next) {
  console.log(otp);
  
 
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gunavikas02@gmail.com',
      pass: '##Vikas002'
      
    }
  });

  var mailOptions = {
    from: 'gunavikas02@gmail.com',
    to: req.body.email,
    subject: 'forget password',
    html: "<h1>Don't shere your otp....!!!</h1> <h2>"+otp+"</h2>",
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.render("otp");
});

module.exports = router;
