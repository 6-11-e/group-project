var express     = require('express'),
    config      = require('../../conf/config'),
    Products    = require('../../models/store/product'),
    ObjectId    = require('mongoose').Types.ObjectId,
    router      = express.Router();

router.get('/', (req, res) => {
    let msg = {
        status: 'ok',
        data: {
            message: 'Store Controller is available!'
        }
    }

    res.status(200).json(msg);
});

router.get('/products/:perPage?/:offset?', (req, res) => {
    // var string = "/products";
    // if(req.params.perPage){
    //     string += '/' + req.params.perPage;
    // }
    // if(req.params.offset) {
    //     string+= '/' + req.params.offset;
    // }
    // res.status(200).json(string)
    
    //Ensure that any and all params are numbers or not set.
    if(req.params){
        for( param in req.params ){
            let regex = /^[0-9]+$/;
            if(regex.test(req.params[param]) || req.params[param] === undefined){
                //Param not set, bypass.
                if(req.params[param] === undefined) continue;
                //Param is a number, force type.
                req.params[param] = parseInt(req.params[param]);
            } else {
                //param is not a number. cancel request and return error
                return res.status(404).json({status: "error", message: "404 - Resource not found."});
                
            }
        }
    }

    //Set number of products perPage and offSet for search.
    var qty = parseInt(req.params.perPage) || config.store.defaultQtyPerPage;
    var offset = (req.params.offset <= 0 ? 0 : req.params.offset-1) * qty;
    console.log(offset);
    //Get products from db
    Products.find({}).skip(offset).limit(qty).exec( (err, products) => {
        if(err) console.log(err)
        res.status(200).json(products)
    })
    //return result.
    
});

router.get('/product/:id?', (req, res) => {
    //If no productID available, redirect and return /products
    if(!req.params.id) {
        //redirect to route
        res.redirect('products')
    } else {
        //get field and value strings
        var field = req.params.id.match(/.*?(?==|$)/i)[0];
        var value = req.params.id.match(/[^=]*$/)[0];
        var query = {};
      
        if(field == "id"){
            //if field is id, set query to search by ObjectId
            query['_id'] = new ObjectId(value);
        } else if( field == "name"){
            //if field is name, parse name to remove html entities
            try{
                value = decodeURIComponent(value);
            } catch(err){
                console.log(err)
                res.status(404).json({status: "error", message: "404 - Resource not found."});
            }
            query['name'] = value;
        } else {
            //Unhandled parameter to search by!
            return res.status(404).json({status: "error", message: "No product was found."});
        }
        console.log('field: ', field, '\nvalue: ', value);
        //Perform database search
        Products.find({})
        .where(query)
        .exec( (err, products) => {
            if (err) {
                return res.status(404).json({status: "error", message: "No product was found"});
            }
            // console.log(products)
            if(products.length > 1){
                // let errorProducts = [...products].shift();
                console.warn('ERROR: Duplicate results found for function that returns single result!\n', products, '\nReturning only first item!')
            }
            let msg = {
                status: "ok",
                data: {
                    product: products[0]
                }
            }
            res.status(200).json(msg);
        })
    }   
    
})

router.post('/product/:id?', (req, res) => {
    //need validator class!
    var editedProduct = {
        name: req.body.name, //Should be validator.product.name(...) or validator.string(...)
        price: req.body.price,
        categories: (req.body.categories?JSON.parse(req.body.categories):[]),
        description: req.body.description,
        inStock: (req.body.inStock ? parseInt(req.body.inStock):0)
    };

    if(req.params.id){
        // Editing existing product
        Products.findByIdAndUpdate( req.params.id, editedProduct, (err) => {
            if (err) return res.json({status: "error", message: "Unable to save data for product! Try again\n", err})
            res.status(200).json({status: 'ok', message: 'Successfully edited ' + req.body.name});
        })
    } else {
        //New product
        var newProduct = new Products(editedProduct);

        newProduct.save( (err) => {
            if (err) return res.json({status: "error", message: "Unable to save new product!\n",err})
            res.status(200).json({status: "ok", message: "Successfully added new product " + req.body.name});
        });
    }
    
})

//Add all /store/* routes to controllers/index.js
module.exports = router;