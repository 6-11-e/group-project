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
    // multer      = require('multer'),
    fs          = require('fs-extra'),
    Busboy      = require('busboy'),
    path        = require('path'),
    router      = express.Router();
    
require('../../conf/passport')(passport);
// require('connect-busboy')
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

router.post('/validateCart', (req, res) => {
    // console.log(req.body)
    let data = req.body;
    verifyCart(data.items).then( cart => {
        // console.log('Cart Data: ', cart)
        let msg = {
            status: 'ok',
            data: {
                cart: cart
            }
        }
        return res.status(200).json(msg);
    })
})
router.get('/getFeaturedProducts/:qty?', (req, res) => {
    let qty = 3; //default qty
    if(req.params.qty && Number.isInteger(parseInt(req.params.qty))){
        qty = parseInt(req.params.qty)
    }

    Categories.findOne({featured: true, showFP: true}).lean().exec( (err, category) => {
        if(err) console.log(err)
        let catID = category._id.toString()
        Products.find({categories: {$all: catID}, deleted: false}).limit(qty).lean().exec( (err, products) => {
            if(err) console.log(err)
                    console.log(typeof catID)

            // console.log(products)
            let msg = {
                status: 'ok',
                data: {
                    featuredProducts: products
                }
            }
            // console.log(msg.data)
            return res.status(200).json(msg);
            // console.log('featProducts', products)
        })
        // console.log('featProds', qty)
        // console.log('featCat', category)
    })
})
router.get('/products/category/:catID/:perPage?/:offset?', (req, res) => {
    var qty = parseInt(req.params.perPage) || config.store.defaultQtyPerPage;
    var offset = (req.params.offset <= 0 ? 0 : req.params.offset-1) * qty;
    Products.find({deleted: false, categories: req.params.catID}).skip(offset).limit(qty).exec( (err, products) => {
        if(err) console.log(err)
        let msg = {
            status: 'ok',
            data: {
                products: products,
                count: products.length
            }
        }
        return res.status(200).json(msg);
    })
    
})
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
    // console.log(offset);
    //Get products from db
    Products.find({deleted: false}).skip(offset).limit(qty).lean().exec( (err, products) => {
        if(err) console.log(err)
        Products.count({deleted: false}, (err, count) => {
            if(err)console.log(err)
            let msg = {
                status: 'ok',
                data: {products, count}
            }
            return res.status(200).json(msg)
        })
        
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
router.post('/category/new', (req, res) => {
    let newCategory = req.body;
    newCategory = new Categories(newCategory);
    newCategory.save((err, category) => {
        if(err)console.log(err)
        let msg = {
            status: "ok",
            message: 'Successfully created category!',
            data: {
                name: category.name
            }
        }
        return res.status(200).json(msg);
    } )
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
router.get('/product/:id?/:includeCats?', (req, res) => {
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
        // console.log('field: ', field, '\nvalue: ', value);
        //Perform database search
        Products.find({deleted: false})
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
            if(req.params.includeCats && req.params.includeCats === 'includeCats'){
                Categories.find({}).lean().exec((err, cats) => {
                    if(err) console.log(err)
                    // console.log(cats.length)
                    let msg = {
                        status: 'ok',
                        data: {
                            product: products[0],
                            categories: cats
                        }
                    }
                    return res.status(200).json(msg)
                })
            } else {
                let msg = {
                    status: "ok",
                    data: {
                        product: products[0]
                    }
                }
                return res.status(200).json(msg);
            }
        })
    }   
    
})


router.post('/product/edit/:id', (req, res) =>{
    //SHould validate the productData incoming!

    //Also, save product price history for tracking purposes! Short term, use order.items[] instead.
    var product = req.body;
    Products.findByIdAndUpdate(req.params.id, product).lean().exec( (err, productDB) => {
        if(err) console.log(err)
        if(productDB.images){
            if(product.images !== productDB.images){
            
                let arrObjCompare = (arrayB) => {
                    return (arrayA) => {
                        return arrayB.filter( other => {
                            return other.name == arrayA.name
                        }).length == 0;
                    }
                }
                let imgsDel = productDB.images.filter(arrObjCompare(product.images));
                
                // console.log(imgsDel)
                
                let delCount = 0;
                for(img of imgsDel){
                    let imgPath = path.join(__dirname, `../../images/products/${req.params.id}/${img.name}`);
                    fs.unlink(imgPath, () => {
                        //cb - just incr counter
                        delCount++
                        console.log('Deleted Count: ' + delCount + ' of ' + imgsDel.length)
                        console.log('Deleted image: ' + imgPath)
                    })
                }
                
    
            }
        }
        
        let msg = {
            status: 'ok',
            message: 'Successfully updated product!'
        }
        return res.status(200).json(msg);
    })
})


router.post('/product/new', (req, res) => {
    var product = new Products(req.body);
    product.save( (err, product) => {
        if(err) console.log(err)
        let msg={
            status: 'ok',
            message: 'Successfully created new product',
            data: {id: product._id}
        }
        return res.status(200).json(msg);
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
        
    });
})



// router.get('/testPay', protectRoute, (req, res) => {
//     // let charge = {
//     //     amount: 999,
//     //     currency: 'usd',
//     //     source: 'tok_visa',
//     //     receipt_email: 'xuroth@gmail.com'
//     // };
//     // // console.log('customer,', verifyUser(req.user));
//     // // console.log('ID: ', req.user)
//     // processPayment(charge).then((result) => {
//     //     console.log(result);
//     //     let msg = {
//     //         status: "ok",
//     //         data: {
//     //             paymentConf: result
//     //         }
//     //     }
//     //     res.status(200).json(msg);
//     // })
//     res.status(200).json({user: req.user})

    
// })

// router.get('/testRole', protectRoute, roleCheck('Customer'), (req, res) => {
//     console.log('Success!');
// })

router.post('/checkout', protectRoute, (req, res) => {
    let data = req.body;
    // console.log(Object.keys(data));
    // data.cart = JSON.parse(data.cart);
    // data.user = JSON.parse(data.user);
    verifyCart(data.cart.items).then( cart => {
        if(data.cart.total != cart.total) {
            // console.log('CartTotal: ',data.cart.total, 'ActualTotal: ', cart.total)
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
        // console.log(req.user);
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
                transactionID: '',
                paymentBrand: data.paymentSource.brand,
                paymentLast4: data.paymentSource.last4
            };
            // console.log('Token Type:', typeof data.paymentSource.id)
            let grandTotal = parseFloat(order.subtotal) + parseFloat(order.tax) + parseFloat(order.shippingCost);
            // console.log('Grand Total: $', grandTotal, ' Type: ', typeof grandTotal)
            order.total = parseFloat(grandTotal).toFixed(2);
            //console.log(order)

            stripe.charges.create({
                amount: order.total * 100,
                currency: config.payments.options.currency,
                source: req.body.paymentSource.id,
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
                    order.sourceID = data.paymentSource.id;
                    //SAVE ORDER
                    order = new Orders(order);
                    order.save(order).then( (order) => {
                        let msg = {
                            status: 'ok',
                            message: 'Order placed, charge successful!',
                            data: {orderID: order._id}
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
//define middleware that sets const upload and id
// express.use(busboy())
router.post('/product/:id/uploadImages', (req, res) => {
    Products.findById(req.params.id).limit(1).lean().exec( (err, product) => {
        var busboy = new Busboy({headers: req.headers});
        var images = product.images || [];
        var imgCount = 0;
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            if(filename == ''){
                let msg = {
                    status: 'error',
                    message: 'No file uploaded'
                }
                return res.status(409).json(msg);
            }
            // console.log('Uploading File'+filename);
            let imgDir = path.join(__dirname, `../../images/products/${req.params.id}/`);
            let ensureExists = (path, cb) => {
                let mask = 0777;
                fs.mkdir(path, mask, (err) => {
                    if (err){
                        if (err.code === 'EEXIST') cb(null);
                        else cb(err)
                    } else cb(null)
                });
            }
            ensureExists(imgDir, (err) => {
                if(err){
                    console.log(err)
                    let msg = {
                        status: 'error',
                        message: err
                    }
                    return res.status(500).json(msg)
                }
            })
            var saveTo = path.join(__dirname, `../../images/products/${req.params.id}/${filename}`)
            file.pipe(fs.createWriteStream(saveTo));
            file.on('data', (data) => {
                // console.log(filename + " = " + data.length)
            })
            file.on('end', ()=> {
                // console.log(filename + " done!")
                images.push({name: filename, primary: false});
                imgCount++;
            })
        })
        busboy.on('finish', () => {
            // console.log('DONE!')
            product.images = images;
            Products.findByIdAndUpdate(req.params.id, product).exec( (err) => {
                if(err)console.log(err);
                let msg = {
                    status: 'ok',
                    message: `${imgCount} images successfully uploaded!`
                }
                return res.status(200).json(msg)
            })
        })
        req.pipe(busboy);
        
    })
})

// router.delete('/product/:id/images', (req, res) => {
//     //Should sanitize body
//     let {images} = req.body;
//     Products.findById(req.params.id).limit(1).lean().exec( (err, product) => {
//         if(err) console.log(err)
//         console.log(product)
//     })
// })

function verifyCart(cart) {
    return new Promise((resolve, reject) => {
        let verifiedCart = {
            items: [],
            total: 0
        };
        var itemCount = 0;
        // cart = JSON.parse(cart);
        for(item of cart) {
            // console.log(`Item ${itemCount + 1}`, item)
            itemCount++
            ((item) => {
                Products.findById(item._id).lean().exec( (err, product) => {
                    if (err) console.log(err)
                    // console.log('Product: ', product)
                    // console.log('Cart Item: ', item)
                    itemCount--;
                    product.qty = item.qty;
                    // console.log(item)
                    //Need to trim product?
                    verifiedCart.items.push(product);
                    let total = (product.price * product.qty).toFixed(2)
                    total = parseFloat(total);
                    // console.log('Total for item: ', total, 'type: ', typeof total) 
                    verifiedCart.total += total;
                    
                    
                    if (itemCount == 0) {
                        verifiedCart.total = parseFloat(verifiedCart.total).toFixed(2);
                        resolve(verifiedCart)
                    };
                })
            })(item)
            
            // let product = getCartItem(item.id)
            // console.log(product)
        }

    })
    
}


router.get('/order/admin/:id', (req, res) => {
    Orders.findById(req.params.id).lean().exec( (err, order) => {
        if(err) console.log(err)
        //Get Customer
        Users.findById(order.user).lean().exec( (err, customer) => {
            let msg = {
                status: 'ok',
                data: {order: order, customer: customer}
            }
            return res.status(200).json(msg);
        })
        
    })
})
router.post('/order/admin/:id/refund', (req, res) => {
    Orders.findById(req.params.id).lean().exec( (err, order) => {
        if(err) console.log(err)
        let orderItems = order.items;
        let remItems = req.body;
        let amt = 0.00
        for(let remItem of remItems){
            // console.log('remItem ', remItem.id)
            for(let orderItem of orderItems){
                // console.log(typeof orderItem._id)
                if(orderItem._id == remItem.id){
                    orderItem.qty -= remItem.qty;
                    amt += parseFloat((parseFloat(orderItem.price) * remItem.qty).toFixed(2))
                }
            }
        }
        
        // console.log('orderItems', orderItems)
        let refundAmt = parseFloat((amt * 1.06).toFixed(2))
        
        //set order.amountRefunded = order.amountRefunded + refundAmt
        stripe.refunds.create({
            charge: order.transactionID,
            amount: parseFloat(refundAmt.toFixed(2)) * 100
        }, (err, refund) => {
            if(err) console.log(err)
            let event = {
                date: new Date(),
                message: `Refunded ${refundAmt}`
            }
            order.history.push(event);
            order.items = orderItems;
            order.refundedItems = remItems;
            order.amountReturned = parseFloat(order.amountReturned + refundAmt)
            Orders.findByIdAndUpdate(req.params.id, order).lean().exec( (err) => {
                if(err) console.log(err);
                let msg = {
                    status: 'ok',
                    message: 'Successfully processed refund',
                    data: {
                        amount: refundAmt
                    }
                }
                return res.status(200).json(msg);
            })
        })
        //set order.items = orderItems
        //processRefund
    })
})
router.post('/order/admin/:id', (req, res) => {
    Orders.findByIdAndUpdate(req.params.id, req.body).exec( (err) => {
        if(err) console.log(err)
        let msg = {
            status: 'ok',
            message: 'Updated Order.'
        }
        return res.status(200).json(msg);
    })
})
router.get('/orders/admin/:perPage?/:offset?', (req, res) => {
    // console.log('GET ORDERS-ADMIN with: ',req.params)
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

    Orders.find({}).skip(offset).limit(qty).lean().exec( (err, orders) => {
        if(err) console.log(err)
        let msg = {
            status: 'ok',
            data: {orders: orders}
        }
        return res.status(200).json(msg);
    })
    // console.log(offset);
    // //Get products from db
    // Products.find({}).skip(offset).limit(qty).lean().exec( (err, products) => {
    //     if(err) console.log(err)
    //     let msg = {
    //         status: 'ok',
    //         data: products
    //     }
    //     res.status(200).json(msg)
    // })
    // //return result.
})
router.get('/order/view/:orderID', (req, res) => {
    Orders.findById(req.params.orderID).lean().exec( (err, order) => {
        if(err) console.log(err)
        // if(req.user._id == order.user){
            let msg = {
                status: 'ok',
                data: {
                    order:  order
                }
            }
            res.status(200).json(msg);
        // }
    })
})
router.get('/orders/view', protectRoute, (req, res) => {
    Orders.find({user: req.user._id}).lean().exec( (err, orders) => {
        if(err) console.log(err)
        let msg = {
            status: 'success',
            data: {
                orders: orders
            }
        }
        return res.status(200).json(msg)
    })
})
// var uploadFilter = (data) => {
//     for(let file of data){
//         if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
//             // file = undefined;
//             console.log('filtered', file)
//         }
//     }
//     return data;
// }

//Add all /store/* routes to controllers/index.js
module.exports = router;