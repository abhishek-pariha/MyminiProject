var express = require('express');
var router = express.Router();

var AdminModel = require('../models/admin-details');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index'); 
});

router.get('/index', function(req, res, next) {
  res.render('index'); 
});
//Signup Get
router.get('/signup',function(req, res, next){
  res.render('Admin/Accounts/signup');
})

router.post('/signup',function(req, res, next){
  console.log(req.body);
  const mybodydata = {
    admin_name : req.body.adminname,
    admin_email : req.body.adminemail,
    admin_password : req.body.adminpassword
  }

  var data = AdminModel(mybodydata);
  data.save(function(err,data){
    if(err){
      console.log('Err in signup'+err);
    }else{
      console.log("Signup Successfulluy"+data);
      res.redirect('/signup');
    }
  })
})

//Login Get
router.get('/login', function(req, res, next) {
  res.render('Admin/Accounts/login');
});


//Login Fetch Data
router.post('/login',function(req, res, next){
     
    var email = req.body.admin_email;
    var password = req.body.admin_password;
    console.log(req.body);
    AdminModel.findOne({'user_email' : email}, function(err, db_users){
  
      console.log("Find One"+ db_users);
  
      if(db_users){
        var db_email = db_users.admin_email;
        var db_password = db_users.admin_password;
      }
  
      console.log("db_users.email"+db_email);
      console.log("db_users.password"+db_password);
  
      if(db_email == null)
      {  
        console.log("if")
        res.end("Email not found");
      }
      else if(db_email == email && db_password == password){
        req.session.email = db_email;
        res.redirect('/index');
      }
      else{
        console.log("Credentials wrong");
        res.end("Login invalid");
      }
    }).lean();
})
  //Home page
  router.get('/index',function(req, res, next){
    var myemail = req.session.email;
    console.log(myemail);
  
    //Auth
    if(!req.session.email){
      console.log("Email Session in set");
      res.end("Login required to accrss this page");
    }
  
    res.render('admin-view/Home',{myemail : myemail});
  });
  router.get('/change-password',function(req, res, next){
      if(!req.session.email){
      console.log("Email Session is set")
      res.redirect('/Login');
      }
      res.render('Admin/Accounts/change-password');
  })
  //Change Password
  router.post('/change-password',function(req, res, next){
    if(!req.session.email){
      console.log("Email Session is set")
      res.redirect('/Login');
    }
    console.log("Home Called" +req.session.email);
      var myemail = req.session.email;
      var opass = req.session.opass;
      var npass = req.session.npass;
      var cpass = req.session.cpass;
  
      AdminModel.findOne({"user_email" : myemail}, function(err, db_users){
  
        if(err){
          console.log("Error in old password Fetch"+err)
        }else{
          console.log(db_users);
  
            if(opass == db_users.user_password){
              if(opass == npass)
              {
                res.end("New password diffrent from old password");
              }else{
                if(npass == cpass){
                  AdminModel.findOneAndUpdate({"user_email": myemail},{$set: {"user_password": npass}},function(err){
                    if(err){
                      res.end("Error in update"+err);
                    }else{
                      res.end("Password changed")
                    }
                  });
                }else{
                  res.end("new password confirm password not matc");
                }
              }
            }else{
              res.end("old password not match");
            }
        }
      });
  });
  
  //logout page
  
  router.get('/Logout',function(req, res, next){
      req.session.destroy();
      res.redirect('/');
  }) 
  
  //Forgot Password
  
  router.get('/forgott',function(req, res, next){
    res.render('Admin/Accounts/forgotpassword');
  })
  
  router.post('/Forgot-Password',function(req, res, next){
    var email = req.body.email;
    console.log(req.body);
    AdminModel.findOne({"user_email": email}, function(err, db_users){
      console.log("find one"+db_users);
  
      if(db_users){
        var db_email = db_users.user_email;
        var db_password = db_users.user_password;
      }
      console.log("db_user.user_email"+db_email);
      console.log("db_user.user_password"+db_password);
  
      if(db_email == null){
        console.log("if");
        res.end("Email not found");
      }else if(db_email = email){
        "use strict";
        const nodemailer = require('nodemailer');
  
        async function main(){
  
          let account = await nodemailer.createTestAccount();
          let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth:{
              user: 'testcafe.abhi@gmail.com',
              pass: 'Ab@123456'
            }
          });
  
          let mailoption ={
            from: '"Freed Foo "<foo@example.com',
            to: 'abhisparihar3@gmail.com',
            subject: "Forgoot password",
            text: "Hello your password is" + db_password,
            html: "Hello Your password is" + db_password
          };
  
          let info = await transporter.sendMail(mailoption)
          console.log("Message sent : ",info.messageId);
          console.log("Preview url: ", nodemailer.getTestMessageUrl(info));
          res.end("Mail send to your mail id");
        }
        main().catch(console.error);
      }
      else{
        console.log(" Wrong details ");
        res.end("Login Invalid");
      }
    });
  });
  
  //display
router.get('/table',function(req, res, next){
  AdminModel.find(function(err, data){
      if(err){
          console.log("Error in display"+err);
      }else{
          console.log("Successfully display"+data);
          res.render('Admin/table',{mydata : data});
      }
  }).lean();
});




module.exports = router;
