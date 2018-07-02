var express     = require('express'),
    config      = require('../../conf/config'),
    Products    = require('../../models/store/product'),
    Users       = require('../../models/auth/user'),
    Orders      = require('../../models/store/order'),
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

// router.post('/product/:id?', (req, res) => {
//     //need validator class!
//     var editedProduct = {
//         name: req.body.name, //Should be validator.product.name(...) or validator.string(...)
//         price: req.body.price,
//         categories: (req.body.categories?JSON.parse(req.body.categories):[]),
//         description: req.body.description,
//         inStock: (req.body.inStock ? parseInt(req.body.inStock):0)
//     };

//     //Stripe Product info
//     let stripeData = {
//         name: editedProduct.name,
//         type: 'good',
//         //Other data as needed.
//     }
    
//     if(req.params.id){
//         // Editing existing product
//         Products.findById(req.params.id, (err, product) => {
//             if (err) console.log(err);
//             stripe.products.update(product.stripeData.id, stripeData).then(updatedStripe => {
//                 product.stripeData = updatedStripe;

//                 Products.findByIdAndUpdate( req.params.id, editedProduct, (err) => {
//                     if (err) return res.json({status: "error", message: "Unable to save data for product! Try again\n", err})
//                     res.status(200).json({status: 'ok', message: 'Successfully edited ' + req.body.name});
//                 })
//             })
//         })
        
//     } else {
//         //New product
//         stripe.products.create(stripeData).then( result => {
//             editedProduct.stripeDat = result;
//         })
//         var newProduct = new Products(editedProduct);

//         newProduct.save( (err) => {
//             if (err) return res.json({status: "error", message: "Unable to save new product!\n",err})
//             res.status(200).json({status: "ok", message: "Successfully added new product " + req.body.name});
//         });
//     }
    
// })
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

// router.delete('/product/:id/:hard?', (req, res) => {
//     if (!req.params.id) {
//         //return error, no id specified
//     } else {
//         try {
//             var productID = new ObjectId(req.params.id);
//         } catch(error) {
//             //Invalid string, return error
//         }

//         if(req.params.hard === "true") {
//             //hard delete, remove from DB
//             console.log('Hard delete for product ' + productID + ' requested. Check permission to allow hard deletes and continue');
//             Products.findByIdAndRemove(productID, (err, product) => {
//                 if(err) console.log(error);
//                 if(product == null) {
//                     let msg = {
//                         status: "error",
//                         message: `No product found with ID: ${req.params.id}`
//                     }
//                     return res.status(409).json(msg);
//                 }
//                 let msg = {
//                     status: "ok",
//                     message: `Product "${product.name}" (${product._id}) successfully deleted (hard delete)`
//                 }
//                 res.status(200).json(msg);
//             })
//         } else {
//             console.log('Deleting product: ' + productID + ' (soft delete)');
//             Products.findByIdAndUpdate(productID, {$set: {deleted: true}}, (err, product) => {
//                 if (err) {
//                     console.log('Error: When deleting product: ' + productID + '.\n'+err);
//                     let msg = {
//                         status: "error",
//                         message: `Product unable to be deleted. Error: ${err}`
//                     }
//                     res.status(409).json(msg)
//                 }
//                 console.log('Deleted product ' + product.name + '. (Soft Deleted)');
//                 let msg = {
//                     status: "ok",
//                     message: `Product "${product.name}" (${product._id}) successfully deleted (soft delete).`
//                 }
//                 res.status(200).json(msg);
//             })
//         }
//     }

// })

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

// router.post('/checkout', (req, res) => {
//     //Ensure all required fields are present
//     var data = req.body;
//     //Need cart object, user object, addresses object, payment object
//     let reqFields = [
//         'cart',
//         'user',
//         'addresses',
//         'payment'
//     ];
//     let missingFields = {
//         message: 'Missing Fields: ',
//         fields: []
//     }
//     let orderErrors = [];
//     for (field in reqFields) {
//         if( !data.hasOwnProperty(field)) {
//             missingFields.fields.push(reqFields[field])
//         }
//     }

//     if(missingFields.fields.length != 0){
//         //Missing data, return error
//         let msg = {
//             status: "error",
//             message: 'Unable to proceed with checkout due to:',
//             data: {
//                 error: missingFields
//             }
//         }
//         return res.status(200).json(msg);
//     } else {
//         //All data is accounted for. Should process additional validation

//         //For brevity, validator not present. Proceeding with test
//         let order = {
//             cart: verifyCart(data.cart),
//             userInfo: verifyUser(data.user),
//             addresses: verifyAddresses(data.addresses),
//             payment: verifyPaymentDetails(data.payment)
//         }
//         //Check for errors
//         for (field in reqFields) {
//             if(order[field].errors.length != 0){
//                 orderErrors.push({type: field, errors: order[field].errors})
//             }
//         }

//         //Ensure total supplied from cart is equal to verified cart total
//         if (data.cart.total != order.cart.total){
//             //Price changed somewhere. 
//             orderErrors.push({type: 'Order Total Mismatch', errors: [{error: 'Total order amount is different from expected value', details: `Expected total $${data.cart.total}, got $${order.cart.total}. Please verify cart using API endpoint.`}]});
//         }

//         if(orderErrors.length != 0){
//             let msg = {
//                 status: "error",
//                 message: 'Unable to proceed with checkout due to errors.',
//                 data: {
//                     errors: orderErrors
//                 }
//             }
//             return res.status(200).json(msg)
//         }
        
//         //Process Payment
//         let charge = {
//             amount: order.cart.total * 100,
//             currency: config.payments.options.currency,
//             source: order.payment,
//             receipt_email: order.userInfo.email,
//             statement_descriptor: config.payments.options.statementInfo,
//             customer: order.userInfo.customerData
//         }

//         let result = processPayment(charge);

//         //result should be an object

//         //check if result is success or fail

//         //On success, create order info, save, return success with info

//         //On error, return error with info


//     }
    

// })

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

// function verifyCart(cartData) {
//     //Searches cart data and ensures all products are available and valid
//     let cart = {
//         products: [],
//         errors: [],
//         total: 0
//     };

//     for (product in cartData.products) {
//         try {
//             var productID = new ObjectId(product.id);
//         } catch(err) {
//             console.log('Error: ', err);
//             cart.errors.push({message: 'Invalid product ID: '+ product.id, details: err});
//         }
//         Products.findById(productID, (err, productData) => {
//             if(err) {
//                 console.log(err);
//                 cart.errors.push({
//                     message: 'Unable to get product data for id: ' + productID,
//                     details: err
//                 });
//             } else {
//                 if(parseInt(product.qty) <= productData.inStock) {
//                     let newProd = {
//                         id: productData._id,
//                         name: productData.name,
//                         qty: product.qty
//                     };
//                     cart.products.push(newProd);
//                 } else {
//                     //Invalid amount
//                     cart.errors.push({
//                         message: 'Invalid qty for product id: ' + productID,
//                         details: 'The maximum available qty is ' + productData.inStock
//                     })
//                 }
                
//             }
//         })
//     }
//     //Return cart
//     return cart;
// }

function verifyUser(userData) {

    //Perform check to see if userData.customerID set, else set it!
    Users.findById(userData._id).then( (user) => {
        // console.log("USER FROM DB",user)
        // console.log(user.customerID)
        // console.log(user.hasOwnProperty('customerID'))
        if(user && user.customerID && user.customerID !== ''){
            // console.log(user.customerID)
            stripe.customers.retrieve(user.customerID, (err, customer) => {
                console.log('Got customer Data!');
                if(err) console.log(err);
                return customer;
            })
        } else {
            // console.log(user.customerID)
            stripe.customers.create({
                email: user.email
            }).then( (customer) => {
                // if(err) console.log(err);
                Users.findByIdAndUpdate(user._id, {customerID: customer.id}).then( (result) => {
                    // if(err) console.log('error', err)
                    // console.log(result)
                    console.log('Creating customer data.')
                    return customer;
                })          
            })
        }
    })
    
}

function verifyAddresses(addressData) {
    //Validate correct format, maybe even use address service to determine validity
    return addressData;
}

function verifyPaymentDetails(paymentData) {
    //Validate payment information to ensure everything looks good prior to processing payment.

    //To ensure PCI Compliance, we want this to only accept and verify a token, meaning the card data is
    // never saved to session, memory, or database.

    //Later in checkout process, token will be sent to payment processor api to auth charge.
}

function processPayment(charge){
     return stripe.charges.create(charge)
}
//Add all /store/* routes to controllers/index.js
module.exports = router;