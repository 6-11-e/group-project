var express     = require('express'),
    Users       = require('../../models/auth/user'),
    Orders      = require('../../models/store/order'),
    Products    = require('../../models/store/product'),
    router      = express.Router();

router.get('/', (req, res) => {
    let msg = {
        status: 'ok',
        data: {
            message: 'Admin Controller is available!'
        }
    }
})

router.get('/dashboardMetrics', (req, res) => {
    //Get users, sales, products, orders pending
    let infoBars = {}

    getUserCount = () => {
        return new Promise( (resolve, reject) => {
            Users.count({}).lean().exec( (err, count) => {
                if(err) console.log(err)
                resolve(count)
            })
        })
    }

    getSalesCount = () => {
        return new Promise( (resolve, reject) => {
            Orders.count({}, (err, count) => {
                if(err) console.log(err)
                resolve(count)
            })
        })
    }

    getProductsCount = () => {
        return new Promise( (resolve, reject) => {
            Products.count({deleted: false}, (err, count) => {
                if(err) console.log(err)
                resolve(count)
            })
        })
    }

    getPendingOrdersCount = () => {
        return new Promise( (resolve, reject) => {
            Orders.count({status: 'pending'}, (err, count) => {
                if(err) console.log(err)
                resolve(count)
            })
        })
    }
    getUserCount()
    .then( count => {
        console.log('Users',count)
        infoBars.users = {count: count}
    })
    .then(getSalesCount)
    .then(count => {
        infoBars.sales = {count}
    })
    .then(getProductsCount)
    .then( count => {
        infoBars.products = {count}
    })
    .then(getPendingOrdersCount)
    .then( count => {
        infoBars.pendingOrders = {count}
    })
    .then( () => {
        let msg = {
            status: 'ok',
            data: {infoBars}
        }
        console.log(msg.data.infoBars)
        res.status(200).json(msg)
    })
    // Users.count({}, (err, count) => {
    //     if(err) console.log(err);
    //     infoBars.users = {count: count}
    //     return infoBars;
    // })
    // .then( (test) => {
    //     console.log(test)
    //     Orders.count({}, (err, count) => {
    //         if(err) console.log(err);
    //         infoBars.sales = {count}
    //     })
    // })
    // .then( (umm) => {
    //     console.log(umm)
    //     Orders.count({status: 'pending'}, (err, count) => {
    //         if(err) console.log(err);
    //         infoBars.pendingOrders = {count}
    //     })
    // })
    // .then( () => {
    //     Products.count({deleted: false}, (err, count) => {
    //         if(err) console.log(err);
    //         infoBars.products = {count}
    //     })
    // })
    // .then( () => {
    //     resData = {
    //         infoBars: infoBars,
    //     }
    //     let msg = {
    //         status: 'ok',
    //         data: resData
    //     }
    //     res.status(200).json(msg);
    // })


    // res.status(200).json({status: 'ok', message: 'Yup!'});
})

router.get('/users/:perPage?/:offSet?', (req, res) => {
    Users.find({}).lean().exec( (err, users) => {
        if(err) console.log(err);
        let msg = {
            status: "ok",
            data: users
        }
        res.status(200).json(msg);
    })
})

router.get('/user/:id', (req, res) => {
    Users.findOne({_id: req.params.id}).lean().exec( (err, user) => {
        if(err) console.log(err)
        let msg = {
            status: "ok",
            data:  user
        }
        res.status(200).json(msg);
    })
})

//Add all /admin/* routes to controllers/index.js
module.exports = router;