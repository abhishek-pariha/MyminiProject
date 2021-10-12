var express = require('express');
var router = express.Router(); 

//User DB Model
var UserModel = require('../models/user_details');
var AreaModel = require('../models/area-model');

router.get('/add',function(req, res, next){
  AreaModel.find(function(err, data){
    if(err){
      console.log("Error in data fetching"+err);
    }else{
      console.log("Successfully fetched"+data);
      res.render('Admin/user/add');
    }
  })
})
module.exports = router;
