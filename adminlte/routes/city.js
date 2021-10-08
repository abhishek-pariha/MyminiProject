var express = require('express');
var router = express.Router();
//var CityModel = require('../models/city-model');
var StateModel = require('../models/state-model');
var CityModel = require('../models/city-model');
var CountryModel = require('../models/country-model');


router.get('/',function(req, res, next){
    res.end("respond with resource");
})

router.get('/add',function(req, res, next){
    StateModel.find(function(err, data_state){
        if(err){
            console.log("Error in showing data"+err);
        }else{
            console.log("Successflly show form"+data_state);
            CountryModel.find(function(err, data_country){
                if(err){
                    console.log("Error in country part"+err);
                }else{
                    console.log("city Successfully show"+data_country)
                    res.render('Admin/Category/add',{mydata : data_state,mycountry : data_country});
                }
            }).lean()
            
        }
    }).lean();
})

router.post('/add',function(req, res, next){
    console.log(req.body);
    const mybodydata = {
        city_name : req.body.name,
        _country : req.body._country,
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
            res.redirect('/city/add');
        }
    })
})

router.get('/display',function(req, res, next){
    CityModel.find(function(err, data){
        console.log("diplay1"+data);
        if(err) res.json({message: 'There are no posts here.'});

        CityModel.find({
            mobile : "Samsung"
        }).lean().populate('_country _state').exec(function(err,data){
            if(err){
                console.log("Error in display");
            }else{
                console.log("Successfully display"+data);
                res.render('city/display',{mydata : data});
            }
        })
    }).lean();
})

router.get('/edit/:id',function(req,res, next){
    var editid = req.params.id;
    CityModel.findById(editid,function(err, data){
        if(err){
            console.log("Error in fata Fetchinf for edit"+err);
        }else{
            StateModel.find({},function(err,sdata){
                if(err){
                    console.log("Error 2");
                }else{
                    CountryModel.find({},function(err,cdata){
                        res.render('city/edit',{mydata :data, mystatedata : sdata,mycountrydata : cdata,selecdata :data._state});
                    }).lean()
                    
                }
                
            }).lean()
        }
    }).lean()
})
module.exports = router;