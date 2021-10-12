var express = require('express');
var router = express.Router();

var AreaModel = require('../models/area-model');
var CityModel = require('../models/city-model');
var StateModel = require('../models/state-model');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respose with resourse')
});

router.get('/add', function(req, res, next){
    CityModel.find(function(err,city_data){
        if(err){
            console.log("City not fetch"+err);
        }else{
            StateModel.find(function(err,state_data){
                if(err){
                    console.log("state not fetch"+err);
                }else{
                    console.log("Successfully fetch data");
                    res.render('Admin/area/add',{mycity : city_data,mystate : state_data});
                }
            }).lean();
        }
    }).lean();
    
})

router.post('/add',function(req, res, next){
    console.log(req.body);
    const mybodydata = {
        area_name : req.body.areaname,
        _city : req.body._city,
        _state : req.body._state
    }
    console.log("Name is "  + req.body.areaname);
    console.log("ID is "  + req.body._category);
    console.log("City Cat is "  + req.body._states);
    
    var data = AreaModel(mybodydata);
    data.save(function(err, data){
        if(err){
            console.log('Error in adding data'+err);
        }else{
            console.log("Successfully save"+data);
            res.redirect('/admin/area/add');
        }
    })
})


router.get('/display',function(req, res, next){
    AreaModel.find(function(err, data){
        console.log("diplay1"+data);
        if(err) res.json({message: 'There are no posts here.'});

        AreaModel.find({
            mobile : "Samsung"
        }).lean().populate('_state _city').exec(function(err,data){
            if(err){
                console.log("Error in display"+err);
            }else{
                console.log("Successfully display"+data);
                res.render('Admin/area/display',{mydata : data});
            }
        })
    }).lean();
})


router.get('/delete/:id',function(req, res, next){
    var deletid = req.params.id;
    AreaModel.findByIdAndDelete(deletid,function(err,data){
        if(err){
            console.log('error in delete'+err);
        }else{
            console.log('Successfully deleted'+data);
            res.redirect('/Admin/area/display');
        }
    })
})

router.get('/edit/:id',function(req, res, next){
    var editid = req.params.id;
    AreaModel.findById(editid,function(err, data){
        if(err){
            console.log("Error in edit"+err);
        }else{
            console.log("Successfull data fetch"+data);
            res.render('country/edit',{mydata : data});
        }
    }).lean();
})

router.post('/edit/:id',function(req, res, next){
    var editid = req.params.id;
    const mybodydata = {
        country_name : req.body.name
    } 
    AreaModel.findByIdAndUpdate(editid,mybodydata,function(err, data){

        if(err){
            console.log("Error in Edit when we want to udata"+err);
        }else{
            console.log("Successfully Updataed"+data);
            res.redirect('/country/display');
        }
    })
})


module.exports = router;
