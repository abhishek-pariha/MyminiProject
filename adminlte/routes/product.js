var express = require('express');
var router = express.Router();

var ProductModel = require('../models/product-details');
var CategoryModel = require('../models/category-details');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/Insert',function(req, res, next){
    CategoryModel.find(function(err,data){
        if(err){
            console.log('Error in fetch data'+err);
        }else{
            console.log(data)
            res.render('product/Insert',{mydata : data});
        }
    }).lean();
})

router.post('/Insert',function(req, res, next){
   
    var fileobject = req.files.file123;
    var filename = req.files.file123.name;
    
    const mybodydata = {
        
        product_name : req.body.name,
        product_detail : req.body.detail,
        product_price : req.body.price,
        product_photo : filename,
        _category : req.body._category,
    }

    var data = ProductModel(mybodydata);
    data.save(function(err){
        if(err){
            console.log("Error in Insert"+err);
        }else{
            console.log("INsert Successfully");
            fileobject.mv('public/upload/'+filename,function(err){
                if(err) throw err;
                res.redirect('Insert');    
            });
            
        }
    })
})

//display
router.get('/display',function(req, res, next){
    ProductModel.find(function(err, data){
        console.log(data);
        
        ProductModel.find({})
        .populate('_category')
        .exec(function(err, data){
                console.log("Successfully display"+data);
                res.render('product/display',{mydata : data});
        })
    }).lean();
})

//delete
router.get('/delete/:id',function(req, res, next){
    var deleteid = req.params.id;
    ProductModel.findByIdAndDelete(deleteid,function(err,data){
        if(err){
            console.log("Error is data"+err);
        }else{
            console.log("Succesfully Data Deleted"+data);
            res.redirect('/product/display');
        }
    })
});

//Edit
router.get('/edit/:id',function(req, res, next){
    var editid = req.params.id;
    ProductModel.findById(editid,function(err, data){
        if(err){
            console.log("Error in data"+err)
        }else{
            console.log("Sucessfully Data Edited"+data);
            res.render('product/edit',{mydata:data});
        }
    }).lean();
});

router.post('/edit/:id',function(req, res, next){
    var editid = req.params.id;
    var fileobject = req.files.file123;
    var filename = req.files.file123.name;
    
    const mybodydata = {
        product_name : req.body.name,
        product_detail : req.body.detail,
        product_price : req.body.price,
        product_photo : filename,
        _category : req.body._category,
    }

    ProductModel.findByIdAndUpdate(editid,mybodydata,function(err, data){
        if(err){
            console.log("Error in thi"+err);
            res.redirect('/product/display');
        }else{
            console.log("Edit Sucessfully"+data);
            res.redirect("/product/display",{mydata : data});
        }
    });
});

module.exports = router;
