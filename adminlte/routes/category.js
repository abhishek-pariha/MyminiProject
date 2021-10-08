var express = require('express');
var router = express.Router();

var CategoryModel = require('../models/category-details');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('Welcome'); 
});
router.get('/index', function(req, res, next) {
  res.render('index');
});

router.get('/addcategory', function(req, res, next) {
  res.render('Admin/Category/addcategory');
})


 
router.post('/add', function(req, res, next) {
  console.log(req.body);
 
    const mybodydata = {
    category_name: req.body.name  
  }
  var data = CategoryModel(mybodydata);
 
  data.save(function(err) {
    if (err) {
       console.log("Error in Insert Record");
    } else {
        res.render('Admin/Category/addcategory');
    }
})

});

router.get('/display', function(req, res, next) {

    CategoryModel.find(function(err, data) {
    if (err) {
        console.log("Error in Fetch Data " + err);
      } else {
        //Print Data in Console
        console.log(data);
        //Render User Array in HTML Table
        res.render('Admin/Category/display-category', { user_array : data });
        
      }
  }).lean();
 
});

// router.get('/show/:id', function(req, res) {
//   console.log(req.params.id);
//   CategoryModel.findById(req.params.id, function(err, db_categor_array) {
//       if (err) {
//           console.log("Error in Single Record Fetch" + err);
//       } else {
//           console.log(db_categor_array);

//           res.render('category/single-category-record', { category_array: db_categor_array });
//       }
//   }).lean();
// });

router.get('/delete/:id', function(req, res) {
    CategoryModel.findOneAndDelete(req.params.id, function(err, project) {
      if (err) {

        console.log("Error in Record Delete " + err);
      } else {

        console.log(" Record Deleted ");
          res.redirect('/Admin/Category/display-category');
      }
  });
}); 

router.get('/edit1/:id', function(req, res) {

  console.log(req.params.id);
  
  CategoryModel.findById(req.params.id, function(err, db_category_array) {
      if (err) {
          console.log("Edit Fetch Error " + err);
      } else {
          console.log(db_category_array);

          res.render('Admin/Category/editcategory', { category_array: db_category_array });
      }
  }).lean();
});

router.post('/edit1/:id', function(req, res) {
  const edit1 = 
  console.log("Edit ID is"+ req.params.id);

  const mybodydata = {
    category_name: req.body.name  
  }

  CategoryModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
      if (err) {
          console.log("Error in Record Update"+err);
          
      } else {
        console.log("Edit Succesfully")
          res.redirect('/Category/display-category');
      }
  });
});

module.exports = router;
