var express = require('express');
var router = express.Router();

var StateModel = require('../models/state-model');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/addstate',function(req, res, next){
    console.log("Hello Here")
    res.render('Admin/state/addstate');
    //res.render('User/Accounts/signup');
})

router.post('/addstate',function(req, res, next){

    const mybodydata ={
        state_name : req.body.statename
    }

    var data = StateModel(mybodydata);
    data.save(function(err){
        if(err){
            console.log('Error in saving a data'+err);
        }else{
            console.log("Successfully data saved");
            res.render('Admin/state/addstate');
        }
    })
})

router.get('/display',function(req, res, next){
    StateModel.find(function(err, data){
        if(err){
                console.log('Error in display'+err);
            }else{
                console.log('Successfully Displayed'+data)
                res.render('Admin/state/displaystate',{mydata : data});
            }
    }).lean();
});

router.get('/delete/:id',function(req, res, next){
    
    var deletid = req.params.id;
    StateModel.findByIdAndDelete(deletid,function(err, data){
        if(err){
            console.log('error in delete'+err);
        }else{
            console.log('Successfully deleted'+data);
            res.redirect('/admin/state/display');
        }
    });
});

router.get('/editstate/:id',function(req, res, next){
    var editid = req.params.id;
    StateModel.findById(editid,function(err, data){
    
        if(err){
            console.log('Error in data fetching for edit'+err);
        }else{
                res.render('Admin/state/editstate',{mydata : data});

        }
    
    }).lean();
})

router.post('/editstate/:id',function(req, res, next){
    var editid = req.params.id;
    const mybodydata = {
        state_name : req.body.statename
    }
    StateModel.findByIdAndUpdate(editid,mybodydata,function(err){
        if(err){
            console.log("Error in update whene we want to edit"+err);
        }else{
            console.log("Successfully Edit");
            res.redirect('/admin/state/display');
        }
    })
})
module.exports = router;
