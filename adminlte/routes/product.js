var express = require('express');
var router = express.Router();

var ProductModel = require('../models/product-details');
var SubcategoryModel = require('../models/subcategory-model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/add',function(req, res, next){
    SubcategoryModel.find(function(err,data){
        if(err){
            console.log('Error in fetch data'+err);
        }else{
            console.log(data)
            res.render('Admin/product/add',{mydata : data});
        }
    }).lean();
})

router.post('/add',function(req, res, next){
   
    var fileobject = req.files.productphoto;
    var filename = req.files.productphoto.name;
    
    const mybodydata = {
        
        product_name : req.body.productname,
        product_detail : req.body.productdetails,
        product_price : req.body.productprice,
        product_photo : filename,
        _subcategory : req.body._subcategory,
    }

    var data = ProductModel(mybodydata);
    data.save(function(err){
        if(err){
            console.log("Error in Insert"+err);
        }else{
            console.log("INsert Successfully");
            fileobject.mv('public/upload/'+filename,function(err){
                if(err) throw err;
                res.redirect('/Admin/product/add');    
            });
            
        }
    })
})

//display
router.get('/display',function(req, res, next){
    ProductModel.find(function(err, data){
        console.log(data);
        
        ProductModel.find({})
        .populate('_subcategory')
        .exec(function(err, data){
                console.log("Successfully display"+data);
                res.render('Admin/product/display',{mydata : data});
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
            res.redirect('/Admin/product/display');
        }
    })
}); 

//Edit
router.get('/edit/:id',function(req, res, next){
    var editid = req.params.id;
    ProductModel.findById(editid,function(err, pdata){
        if(err){
            console.log("Error in data"+err)
        }else{
            SubcategoryModel.find({},function(err,sdata){
            console.log("Sucessfully Data Edited"+sdata);
            res.render('Admin/product/edit',{mypdata:pdata,mysdata:sdata});
        
            }).lean();
        }
    }).lean();
});

router.post('/edit/:id',function(req, res, next){
    var editid = req.params.id;
    var fileobject = req.files.productphoto;
    var filename = req.files.productphoto.name;
    
    const mybodydata = {
        
        product_name : req.body.productname,
        product_detail : req.body.productdetails,
        product_price : req.body.productprice,
        product_photo : filename,
        _subcategory : req.body._subcategory,
    }


    ProductModel.findByIdAndUpdate(editid,mybodydata,function(err, data){
        if(err){
            console.log("Error in thi"+err);
  
        }else{
            console.log("Edit Sucessfully"+data);
            res.redirect("/Admin/product/display",{mydata : data});
        }
    });
});

module.exports = router;
