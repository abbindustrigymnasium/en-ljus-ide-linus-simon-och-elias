const express = require("express");
const router = express(); //Jag hade express.Router

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "orders were fetched"
    }) //jag hade ett ;
});

router.post("/", (req, res, next) => {
    const order = {
        prodictId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(200).json({ // jag hade status 201
        message: "Orders were created",
        order: order
    }) // jag hade ett ;
});
/* DETTA ÄR MIN
router.get("/:orderId", (req, res, next) => {
    res.status(200).json({
        message: "order details",
        orderId: req.params.orderId
    });
});
*/
router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    if (id === "special") {
        res.status(200).json({
            message: 'Order details',
            id: id
        })
    }
    else
    {
        res.status(200).json({
            message: 'Order details '+id
        })
    }
});
/* DETTA ÄR MIN
router.delete("/:orderId", (req, res, next) => {
    res.status(200).json({
        message: "order deleted",
        orderId: req.params.orderId
    });
});
*/
router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleteed'
    })
});

module.exports = router;