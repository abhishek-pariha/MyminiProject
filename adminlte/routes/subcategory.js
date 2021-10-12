var express = require('express');
var router = express.Router();
 
var SubcategoryModel = require('../models/subcategory-model');
var CategoryModel = require('../models/category-details');

router.get('/',function(req, res, next){
    res.send("Hello")
})
router.get('/add',function(req,res,next){
    CategoryModel.find(function(err,data){
        
        if(err){
            console.log('Error in fetch'+err);
        }else{
            console.log("Successfully fetched"+data);
            res.render("Admin/subcategory/add",{mydata : data});
        }
    })

})

router.post('/add',function(req, res, next){

    console.log(req.body);

    var mybodydata ={
        subcategory_name : req.body.subcategoryname,
        _category : req.body._category
    }

    var data = SubcategoryModel(mybodydata);
    data.save(function(err,data){
        if(err){
            console.log("Error in data post"+err);
        }else{
            console.log("Data Store Successfully"+data);
            res.redirect('/admin/subcategory/add');
        }
    })
})

router.get("/display",function(req, res, next){
    SubcategoryModel.find(function(err,data){
        SubcategoryModel.find({}).populate('_category').exec(function(err,data){
            if(err){
                console.log("Error in Displat"+err);
            }else{
                console.log("Subcategory Display Successfully"+data);
                res.render('Admin/subcategory/display',{mydata : data});
            }    
        })
        
    })
})

router.get('/delete/:id',function(req, res, next){
    var deletid = req.params.id;
    SubcategoryModel.findByIdAndDelete(deletid,function(err,data){
        if(err){
            console.log('Error in delete'+err);
        }else{
            console.log('Successfully deleted'+data);
            res.redirect('/Admin/subcategory/display');
        }
    })
})

router.get('/edit/:id',function(req, res, next){
    var editid = req.params.id;
    SubcategoryModel.findById(editid,function(err, sdata){
    
        if(err){
            console.log('Error in data fetching for edit'+err);
        }else{
            CategoryModel.find({},function(err,cdata){
                res.render('Admin/subcategory/edit',{mysdata : sdata,mycdata : cdata});
            }).lean()

        }
    
    }).lean();
})

router.post('/edit1/:id',function(req, res, next){
    var editid = req.params.id;
    console.log(req.body)
    const mybodydata = {
        subcategory_name : req.body.subcategoryname,
        _category : req.body._category
    }
    console.log(mybodydata);
    SubcategoryModel.findByIdAndUpdate(editid,mybodydata,function(err){
        if(err){
            console.log("Error in update whene we want to edit"+err);
        }else{
            console.log("Successfully Edit");
            res.redirect('/Admin/subcategory/display');
        }
    })
})
module.exports = router; 