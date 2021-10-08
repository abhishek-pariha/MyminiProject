var express = require('express');
var router = express.Router();

var CountryModule = require('../models/country-model');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respose with resourse')
});

router.get('/add', function(req, res, next){
    res.render('country/add');
})

router.post('/add',function(req, res, next){
    console.log(req.body);
    const mybodydata = {
        country_name : req.body.name
    }

    var data = CountryModule(mybodydata);
    data.save(function(err,data){
        if(err){
            console.log('Error in Post Methos'+err)
        }else{
            res.render('country/add');
        }
    })
})

router.get('/display',function(req, res, next){
    CountryModule.find(function(err,data){
        if(err){
            console.log("Error in Display")
        }
        else{
            console.log("Successfully Displayed");
            res.render('country/display',{mydata : data});
        }
    }).lean();
})

router.get('/delete/:id',function(req, res, next){
    var deletid = req.params.id;
    CountryModule.findByIdAndDelete(deletid,function(err){
        if(err){
            console.log("Error in delete"+err);
            res.redirect('/country/display');
        }else{
            console.log("Successfully Deleted");
            res.redirect('/country/display');
        }
    }).lean();
})

router.get('/edit/:id',function(req, res, next){
    var editid = req.params.id;
    CountryModule.findById(editid,function(err, data){
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
    CountryModule.findByIdAndUpdate(editid,mybodydata,function(err, data){

        if(err){
            console.log("Error in Edit when we want to udata"+err);
        }else{
            console.log("Successfully Updataed"+data);
            res.redirect('/country/display');
        }
    })
})


module.exports = router;
