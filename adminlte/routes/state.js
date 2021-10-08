var express = require('express');
var router = express.Router();

var StateModel = require('../models/state-model');
var CountryModel = require('../models/country-model');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/add',function(req, res, next){
    CountryModel.find(function(err, data){
        if(err){
            console.log("Error in add"+err);
        }else{
            console.log("Successfully addes"+data);
            res.render('state/add',{mydata : data});
        }
    }).lean();
})

router.post('/add',function(req, res, next){

    const mybodydata ={
        state_name : req.body.name,
        _country : req.body._country
    }

    var data = StateModel(mybodydata);
    data.save(function(err){
        if(err){
            console.log('Error in saving a data'+err);
        }else{
            console.log("Successfully data saved");
            res.render('state/add');
        }
    })
})

router.get('/display',function(req, res, next){
    StateModel.find(function(err, data){
        StateModel.find({}).lean().populate('_country').exec(function(err,data){
            if(err){
                console.log('Error in display'+err);
            }else{
                console.log('Successfully Displayed'+data)
                res.render('state/display',{mydata : data});
            }
        });
    }).lean();
});

router.get('/delete/:id',function(req, res, next){
    
    var deletid = req.params.id;
    StateModel.findByIdAndDelete(deletid,function(err, data){
        if(err){
            console.log('error in delete'+err);
        }else{
            console.log('Successfully deleted'+data);
            res.redirect('/state/display');
        }
    });
});

router.get('/edit1/:id',function(req, res, next){
    var editid = req.params.id;
    StateModel.findById(editid,function(err, data){
    
        if(err){
            console.log('Error in data fetching for edit'+err);
        }else{
            CountryModel.find({},function(err,cdata){
                res.render('state/edit1',{mydata : data,mycdata : cdata, selectedCountry:data._country});
            }).lean()

        }
    
    }).lean();
})

router.post('/edit1/:id',function(req, res, next){
    var editid = req.params.id;
    const mybodydata = {
        state_name : req.body.name,
        _country : req.body._country
    }
    StateModel.findByIdAndUpdate(editid,mybodydata,function(err){
        if(err){
            console.log("Error in update whene we want to edit"+err);
        }else{
            console.log("Successfully Edit");
            res.redirect('/state/display');
        }
    })
})
module.exports = router;
