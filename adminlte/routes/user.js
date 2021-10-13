var express = require('express');
var router = express.Router(); 

//User DB Model
var UserModel = require('../models/user_details');
var AreaModel = require('../models/area-model');
const { get } = require('mongoose');

router.get('/add',function(req, res, next){
  AreaModel.find(function(err, data){
    if(err){
      console.log("Error in data fetching"+err);
    }else{
      console.log("Successfully fetched"+data);
      res.render('Admin/user/add',{mydata : data});
    }
  })
}) 

router.post('/add',function(req, res, next){
  var fileobject = req.files.userimage;
  var filename = req.files.userimage.name;
  console.log(req.body);
  const mybodydata = {
    user_name : req.body.username,
    user_email :req.body.useremail,
    user_password : req.body.userpassword,
    user_address :req.body.useraddress,
    user_gender : req.body.usergender,
    user_photo : filename,
    _area :req.body._area
  }

  var data = UserModel(mybodydata);
  data.save(function(err,data){
    if(err){
      console.log('error in data storage '+err);
    }else
    console.log("Successfully data stored"+data);
    fileobject.mv('public/upload/'+filename,function(err){
      if(err) throw err;
      res.redirect('/Admin/user/add');
    })

  })
})

router.get('/display',function(req,res,next){
  UserModel.find(function(err,data){
    UserModel.find({}).populate('_area').exec(function(err,data){
      if(err){
        console.log("Error in display"+err);
      }else{
        console.log('Successfully display');
        res.render('Admin/user/display',{mydata : data});
      }
    })
  })
})

router.get('/delete/:id',function(req, res, next){
  UserModel.findByIdAndDelete(req.params.id,function(err, data){
    if(err){
      console.log('Error in delete'+err);
    }else{
      console.log('Successfully delete'+data);
      res.redirect('/Admin/user/display');
    }
  })
})

router.get('/edit/:id',function(req, res, next){

  var editid = req.params.id;
  UserModel.findById(editid,function(err, udata){
    if(err){
      console.log('Error in edit');
    }else{
      AreaModel.find({},function(err, adata){
        if(err){
          console.log("Error in fetching data"+err);
        }else{
          console.log("Data fetch Successfully"+adata);
          res.render('Admin/user/edit',{myudata : udata,myadata : adata});
        }
      })
    }
  })
}) 
  
module.exports = router;
