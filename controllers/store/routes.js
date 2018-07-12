var express     = require('express'),
    config      = require('../../conf/config'),
    Products    = require('../../models/store/product'),
    Users       = require('../../models/auth/user'),
    Orders      = require('../../models/store/order'),
    Categories  = require('../../models/store/category'),
    stripe      = require('stripe')(config.payments.processors.stripe.secret),
    ObjectId    = require('mongoose').Types.ObjectId,
    passport    = require('passport'),
    roleCheck   = require('../../helpers/auth/roles'),
    router      = express.Router();
require('../../conf/passport')(passport);
let protectRoute = passport.authenticate('jwt', {session: false});

router.get('/', protectRoute, roleCheck('Admin'), (req, res) => {
    let msg = {
        status: 'ok',
        data: {
            message: 'Store Controller is available!'
        }
    }

    res.status(200).json(msg);
});

router.get('/products/deleted', protectRoute, roleCheck('Admin'), (req, res) => {
    Products.find({deleted: true}, (err, products) => {
        if(err) console.log(err);
        
        let msg = {
            status: "ok",
            products: products
        }
        if(products.length == 0){
            msg.products = null;
            msg.message = 'No products returned'
        }

        res.status(200).json(msg);
        
    })
})

router.get('/products/:perPage?/:offset?', (req, res) => {
        
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
        let msg = {
            status: 'ok',
            data: products
        }
        res.status(200).json(msg)
    })
    //return result.
    
});

router.get('/categories/:fpOnly?', (req, res) => {
    var qry = {}
    if(req.params.fpOnly == 'public') {
        qry = {showFP: true};
    } else if(req.params.fpOnly == 'hidden') {
        qry = {showFP: false}
    }
    Categories.find(qry).lean().exec( (err, cats) => {
        if(err) console.log(err);
        let msg = {
            status: 'ok',
            data: {
                categories: cats
            }
        }
        res.status(200).json(msg);
    })
})

router.get('/category/:id', (req, res) => {
    var field = req.params.id.match(/.*?(?==|$)/i)[0];
    var value = req.params.id.match(/[^=]*$/)[0];
    var qry = {};

    if(field == "id"){
        qry['_id'] = new ObjectId(value)
    } else if (field == "name"){
        try {
            value = decodeURIComponent(value);
        } catch(err) {
            console.log('Cannot decode name: ' + value)
            let msg = {
                status: 'error',
                message: 'Unable to parse name. May not be encoded properly'
            }
            return res.status(409).json(msg);
        }
        qry['name'] = value;
    } else {
        //param is neither 'id' or 'name'
        let msg = {
            status: 'error',
            message: 'You need to supply a valid identifier. If using product\'s ID, api string should end in /id=[product.id]. For name, instead use /name=[product.name] **Make sure the name is encoded via encodeURIComponent()'
        }
        return res.status(409).json(msg)
    }
    Categories.findOne({})
    .where(qry)
    .lean()
    .exec( (err, cat) => {
        if(err) console.log(err);
        let msg = {
            status: 'ok',
            data: {
                category: cat
            }
        }
        return res.status(200).json(msg);
    })
})
router.post('/category/edit/:id', (req, res) => {
    if(!req.params.id){
        let msg = {
            status: 'error',
            message: 'No ID was supplied with request'
        }
        return res.status(409).json(msg)
    }
    //Category should be validated from validator middleware
    let data = req.body;
    if(data.showFP == "on"){
        data.showFP = true;
    } else if (data.showFP === "off"){
        data.showFP = false;
    }
    Categories.findByIdAndUpdate(req.params.id, data).exec( (err) => {
        if(err){
            console.log(err);
            let msg = {
                status: 'error',
                message: 'Error updating category',
                data: {
                    error: 'Error: ' + err
                }
            }
            return res.status(500).json(msg);
        }
        let msg = {
            status: 'ok',
            message: 'Category updated!'
        }
        return res.status(200).json(msg)
    })
})
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

router.post('/product/new', (req, res) => {
    //Get formData
    var product = {
        name: req.body.name,
        type: 'good',
        description: req.body.description,
        livemode: congig.payments.options.live

    };

    stripe.products.create(product).then(resultProduct =>{
        var sku = {
            product: resultProduct.id,
            currency: config.payments.options.currency,
            inventory: {
                type: 'finite',
                quantity: parseInt(req.body.stock)
            },
            price: parseFloat(req.body.price) * 100,
            package_dimensions: {
                height: parseInt(req.body.height),
                length: parseInt(req.body.length),
                weight: parseInt(req.body.weight),
                width: parseInt(req.body.width)
            }
        };

        stripe.skus.create(sku).then(resultSKU => {
            var newProduct = {
                productID: resultProduct.id,
                skuID: resultSKU.id,
                name: product.name,
                description: product.description,
                price: sku.price / 100,
                dimensions: sku.package_dimensions,
                inventory: sku.inventory.quantity,
                categories: req.body.categories
            };

            newProduct = new Products(newProduct);

            newProduct.save( (err) => {
                if (err) {
                    let msg = {
                        status: "error",
                        message: "Unable to add new product",
                        data : {
                            name: req.body.name,
                            error: err
                        }
                    };
                    return res.status(200).json(msg);
                }
                let msg = {
                    status: "ok",
                    message: `Successfully added product "${req.body.name}"`
                };
                return res.status(200).json(msg)
            });
        });
    });
});

router.post('/product/edit/:id', (req, res) => {
    //Get product from db
    Products.findById(req.params.id, (err, product) => {
        if (err) {
            let msg = {
                status: 'error',
                message: `Unable to find product ID "${req.body.id}"`
            }
            console.log("Error: ", msg.message);
            return res.status(200).json(msg);
        }

        stripe.products.retrieve(product.productID).then( stripeProduct => {
            stripe.skus.retrieve(product.skuID).then( stripeSku => {
                stripeSku.inventory.quantity = parseInt(req.body.stock);
                stripeSku.price = parseFloat(req.body.price) * 100;
                stripeSku.package_dimensions = {
                    height: parseInt(req.body.height),
                    length: parseInt(req.body.length),
                    weight: parseInt(req.body.weight),
                    width: parseInt(req.body.width)
                };

                stripe.skus.update(stripeSku.id, stripeSku).then( resultSku => {
                    stripeProduct.name = req.body.name
                    stripeProduct.description = req.body.description;

                    stripe.products.update(stripeProduct.id, stripeProduct).then( resultProduct => {
                        product.name = req.body.name;
                        product.price = parseInt(req.body.price);
                        product.description = req.body.description
                        product.dimensions = {
                            height: parseInt(req.body.height),
                            length: parseInt(req.body.length),
                            weight: parseInt(req.body.weight),
                            width: parseInt(req.body.width)

                        }
                        product.inventory = parseInt(req.body.stock);
                        //product.categories = req.body.categories

                        Products.findByIdAndUpdate(product._id, product, (err) => {
                            if (err) {
                                let msg = {
                                    status: 'error',
                                    message: 'Unable to save product data!',
                                    data: {
                                        error: err,
                                        formData: req.body
                                    }
                                };
                                return res.status(200).json(msg);
                            }
                            let msg = {
                                status: 'ok',
                                message: 'Successfully updated "${req.body.name}"'
                            };
                            return res.status(200).json(msg);
                        })
                    })
                })
            })
        })
    })
})

router.delete('/product/:id/:hard?', protectRoute, roleCheck('Admin'), (req, res) => {
    Products.findById(req.params.id, (err, product) => {
        if (req.params.hard && req.params.hard === "true") {
            //Unable to remove from Stripe Products/SKU if order has been placed
            Products.findByIdAndDelete(product._id, (err) => {
                if (err) {
                    let msg = {
                        status: 'error',
                        message: 'Unable to hard delete product!',
                        data: {
                            error: err
                        }
                    }
                    return res.status(402).json(msg)
                }
                let msg = {
                    status: 'ok',
                    message: 'Product was permanently deleted!'
                }
                return res.status(200).json(msg);
            })
        }
        product.deleted = true;
        Products.findByIdAndUpdate(product._id, product, (err) => {
            if (err) {
                let msg = {
                    status: 'error',
                    message: 'Unable to delete product!',
                    data: {
                        error: err
                    }
                }
                return res.status(402).json(msg);
            }
            let msg = {
                status: 'ok',
                message: 'Product successfully removed!'
            }
            return res.status(200).json(msg);
        })
    })
})

//test route. Should just perform same logic in frontend with GET /api/product/:id.
router.get('/cart/add/:id/:qty?', (req, res) => {
    try {
        var productID = new ObjectId(req.params.id);
    } catch (err) {
        console.log('Cannot get product details because /cart/add/:id/:qty? - id not valid product id')
    }
    Products.findById(productID, (err, product) => {
        if (err) console.log(err);
        let qty = req.params.qty ? parseInt(req.params.qty) : 1;
        if (qty <= product.inStock){
            let productData = {
                name: product.name,
                _id: product._id,
                qty: qty
            }
            let msg = {
                status: "ok",
                data: {product: productData}
            }
            res.status(200).json(msg);
        } else {
            let msg = {
                status: "error",
                message: "Unable to add to cart since qty desired in excess of stock level"
            };
            res.status(200).json(msg);
        }
        //

        //Check to make sure params.qty <= product.inStock
        

        //
        
    });
})



router.get('/testPay', protectRoute, (req, res) => {
    // let charge = {
    //     amount: 999,
    //     currency: 'usd',
    //     source: 'tok_visa',
    //     receipt_email: 'xuroth@gmail.com'
    // };
    // // console.log('customer,', verifyUser(req.user));
    // // console.log('ID: ', req.user)
    // processPayment(charge).then((result) => {
    //     console.log(result);
    //     let msg = {
    //         status: "ok",
    //         data: {
    //             paymentConf: result
    //         }
    //     }
    //     res.status(200).json(msg);
    // })
    res.status(200).json({user: req.user})

    
})

router.get('/testRole', protectRoute, roleCheck('Customer'), (req, res) => {
    console.log('Success!');
})

router.post('/checkout', protectRoute, (req, res) => {
    let data = req.body;
    // console.log(Object.keys(data));
    data.cart = JSON.parse(data.cart);
    data.user = JSON.parse(data.user);
    verifyCart(data.cart.items).then( cart => {
        if(data.cart.total != cart.total) {
            let msg = {
                status: 'error',
                message: 'The total of all items in user cart differs from verified total. Means either user manipulated price data in cart, or more likely, took too long to submit and a price change occurred by an admin. Just reshow the cart and advise user changes occurred and to submit again.',
                data: {
                    cart:  cart
                }
            }
            return res.status(200).json(msg);
        }
        //calc tax
        cart.tax = cart.total * 0.06;
        cart.shipping = 12.99;
        //calc shipping
        //calc grandTotal
        console.log(req.user);
        Users.findById(req.user._id, (err, user) => {
            if(err) console.log(err)
            let order = {
                user: user._id,
                customer: user.customerID,
                subtotal: cart.total,
                tax: cart.tax,
                shippingCost: cart.shipping,
                status: 'pending',
                shipping: {
                    carrier: '',
                    tracking: '',
                    name: data.user.shippingName,
                    address: data.user.addresses.shipping
                },
                email: (data.user.email ? data.user.email : user.email),
                phone: data.user.phone,
                created: new Date(),
                updated: null,
                history: [
                    {date: new Date(), description: 'Order placed.'}
                ],
                amountReturned: 0,
                items: cart.items,
                transactionID: ''
            };

            let grandTotal = order.subtotal + order.tax + order.shippingCost;
            order.total = grandTotal.toFixed(2);
            //console.log(order)

            stripe.charges.create({
                amount: order.total * 100,
                currency: config.payments.options.currency,
                source: req.body.paymentSource,
                statement_descriptor: config.payments.options.statementInfo
            }).then( result => {
                //Decline or error
                if (result.status && result.status == 'failed') {
                    let msg = {
                        status: 'error',
                        message: 'payment failed. Could be a variety of factors, check the error object for specific info.',
                        data: {
                            error: result.outcome,
                            cart: cart
                        }
                    }
                    return res.status(409).json(msg);
                //Success-Complete
                } else if (result.status == 'succeeded') {
                    //Create order in db!
                    order.transactionID = result.id;
                    order.sourceID = data.paymentSource;
                    //SAVE ORDER
                    order = new Orders(order);
                    order.save(order).then( () => {
                        let msg = {
                            status: 'ok',
                            message: 'Order placed, charge successful!'
                        }
                        return res.status(200).json(msg);
                    })
                    //UpdateQty
                    
                //Success-Pending
                } else {
                    order.transactionID = result.id;
                    order.status = 'payment_pending';
                    order.sourceID = data.paymentSource;
                    //save ORDER
                    //UpdateQty
                    let msg = {
                        status: 'ok',
                        message: 'Order placed, charge pending'
                    }
                    return res.status(200).json(msg);
                }
            })

            //sources per user saved in users table. when updating user acct (admin panel or by user) if payment change, send src to stripe user.
            //create the charge, in callback check status. if successful, create order, update quantities, send response message.
            
        })
    })


})

function verifyCart(cart) {
    return new Promise((resolve, reject) => {
        let verifiedCart = {
            items: [],
            total: 0
        };
        var itemCount = 0;
        // cart = JSON.parse(cart);
        for(item of cart) {
            itemCount++
            Products.findById(item.id, (err, product) => {
                if (err) console.log(err)
                itemCount--;
                product.qty = item.qty;
                //Need to trim product?
                verifiedCart.items.push(product);
                verifiedCart.total += product.price * product.qty;
                if (itemCount == 0) {
                    resolve(verifiedCart)
                };
            })
        }
    })
    
}

//Add all /store/* routes to controllers/index.js
module.exports = router;