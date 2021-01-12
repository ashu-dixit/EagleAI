const route = require('express').Router()
const connection = require('../sqldb').connection

route.post('/', (req, res) => {
    const query1 = `SELECT qty_dozen from products where Product_ID = ?`
    product_qty = 0;
    connection.query(
        query1,
        [req.body.Product_ID],
        function (err, results) {
            // console.log(results[0].qty_dozen);
            product_qty = parseInt(results[0].Product_ID)
        }
    )
    if (req.body.action == 'add') {
        const query = 'INSERT INTO `carts` (`Vendor_ID`, `Product_ID`, `product_qty`) values (?,?,?)'
        if (product_qty < req.body.product_qty && req.body.isforced == 0) {
            res.send("The quantity is not available at moment are you sure you want to continue")
        } else {
            connection.query(
                query,
                [req.body.Vendor_ID, req.body.Product_ID, req.body.product_qty],
                function (err, results) {
                    res.send(results)
                    console.log(results);
                }
            )
        }
    } else if (req.body.action == 'delete') {
        const query = 'DELETE FROM `carts` WHERE Vendor_ID = ? AND Product_ID = ?'
        connection.query(
            query,
            [req.body.Vendor_ID, req.body.Product_ID],
            function (err, results, fields) {
                res.send(results)
            }
        )
    }else if(req.body.action == 'update'){
        const query = `UPDATE carts set product_qty = ? WHERE Vendor_ID = ? AND Product_ID = ?`
        console.log(product_qty);
        if (product_qty < req.body.product_qty && req.body.isforced == 0) {
            res.send("The quantity is not available at moment are you sure you want to continue")
        } else {
            connection.query(
                query,
                [req.body.product_qty, req.body.Vendor_ID, req.body.Product_ID],
                function (err, results) {
                    res.send(results)
                    console.log(results);
                }
            )
        }
    }
})

route.get('/', (req, res) => {
    const query1 = `
    DROP PROCEDURE IF EXISTS getCart;
    delimiter |
    CREATE PROCEDURE getCart(Vendor_ID INT)
    BEGIN
    DECLARE Product_List_isdone BOOLEAN DEFAULT FALSE;
    DECLARE cur_Product_ID INT;
    
    DECLARE product_List CURSOR FOR
        SELECT Product_ID from Carts where Vendor_ID = @Vendor_ID;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET Product_List_isdone = TRUE;
    
    OPEN product_List;
    
    loop_List: LOOP
        FETCH NEXT FROM product_List INTO cur_Product_ID;
        IF Product_List_isdone THEN
            LEAVE loop_List;
        END IF;
        SELECT * FROM products WHERE products.Product_ID = cur_Product_ID;
    END LOOP loop_List;
    CLOSE product_List;
    END
    // DELIMITER ;
    `
    const query = 'SELECT * FROM carts WHERE  Vendor_ID = ?'
    connection.query(
        query,
        [req.body.Vendor_ID],
        function (err, results, fields) {
            res.send(results);
        }
    )
})

exports = module.exports = { route }