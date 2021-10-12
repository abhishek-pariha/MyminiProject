var express = require('express');
var router = express.Router();
//var CityModel = require('../models/city-model');
var CityModel = require('../models/city-model');
var StateModel = require('../models/state-model');




router.get('/',function(req, res, next){
    res.end("respond with resource");
}) 

router.get('/add',function(req, res, next){
    StateModel.find(function(err, data){
        if(err){
            console.log("error in add");
        }else{
            console.log("data fetch successfully"+data);
            res.render('Admin/city/add',{mydata : data});
        }
    }).lean();
})

router.post('/addcity',function(req, res, next){
    console.log(req.body);
    const mybodydata = {
        city_name : req.body.cityname,
        _state : req.body._state
    }
    console.log("Name is "  + req.body.cty);
    console.log("ID is "  + req.body._category);
    console.log("City Cat is "  + req.body._states);
    
    var data = CityModel(mybodydata);
    data.save(function(err, data){
        if(err){
            console.log('Error in adding data'+err);
        }else{
            console.log("Successfully save"+data);
            res.redirect('/admin/city/add');
        }
    })
})

router.get('/display',function(req, res, next){
    CityModel.find(function(err, data){
        CityModel.find({}).lean().populate('_state').exec(function(err,data){
            if(err){
                console.log("Error in display");
            }else{
                console.log("Successfully display"+data);
                res.render('Admin/city/display',{mydata : data});
            }
        })
    }).lean();
})

router.get('/delete/:id',function(req, res, next){
     var deleteid = req.params.id;
     CityModel.findByIdAndDelete(deleteid,function(err,data){
         if(err){
             console.log('error in delete');
         }else{
             console.log("Successflly deleted");
             res.redirect('/Admin/city/display');
         }
     })
})
router.get('/edit/:id',function(req, res, next){
    var editid = req.params.id;
    CityModel.findById(editid,function(err, data){
    
        if(err){
            console.log('Error in data fetching for edit'+err);
        }else{
            StateModel.find({},function(err,sdata){
                res.render('Admin/city/edit',{mydata : data,mycdata : sdata, selectedCountry:data._country});
            }).lean()

        }
    
    }).lean();
})

module.exports = router;