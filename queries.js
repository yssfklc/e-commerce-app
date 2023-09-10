const db= require('./clientdb.js');
const session = require("express-session");
const store = require('./index.js')




// Users Queries
const getUsers = (request, response)=>{
    db.pool.query('SELECT * FROM users ORDER BY id ASC', (error, results)=>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
        
    })
};






// Orders Queries
const getOrdersById = (request, response)=>{
    const {id} = request.body;
    db.pool.query('SELECT * FROM orders_products JOIN products ON product_id=id WHERE orders_products.order_id=$1', [id], (error, results)=>{
        if(error){
            throw error
        }
        
        response.status(200).json(results.rows)
        
        
    })
};
const getOrders = (request, response)=>{
    db.pool.query("SELECT orders.id,	orders.user_id,	orders.order_name,	orders.order_date,	orders.total_price FROM orders JOIN users ON orders.user_id=users.id WHERE users.id=$1", [request.user_id], (error, results)=>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
        
    })
};

const createOrders = (request, response)=>{
    const {user_id, product_id, date, price} = request.body;
    let lastOrderid=null
    db.pool.query('SELECT id FROM orders ORDER BY id DESC LIMIT 1', (error, results)=>{
        if(error){
            throw error
        }
        lastOrderid = results.rows[0].id + 1;
        db.pool.query('INSERT INTO orders VALUES ($1, $2, $3, $4, $5) RETURNING *', [lastOrderid, user_id, 'test', date, price], (error, results)=>{
            if(error){
                throw error
            }
            console.log(product_id);
            product_id.map((product)=>{
                db.pool.query('INSERT INTO orders_products VALUES ($1, $2) RETURNING *', [lastOrderid, product], (error, results)=>{
                    if(error){
                        throw error
                    }
                });
            })
            response.status(201).json(results.rows);
        });
    });
}
const deleteOrder = (request, response)=>{
    const id=request.params.id;
    db.pool.query('DELETE FROM orders WHERE id=$1', [id], (error, results)=>{
        if(error){
            throw error
        }
        response.status(204).send('order succesfully deleted');

    })
};

const updateOrder = (request, response)=>{
    const {id, user_id} = request.body;
    db.pool.query('UPDATE orders SET user_id=$2 WHERE id=$1', [id, user_id], (error, results)=>{
        if(error){
            throw error
        }
        response.status(204).send('order successfully updated');
    })
};
// Products Queries
const getProducts = (request, response)=>{
    db.pool.query('SELECT * FROM products ORDER BY id ASC', (error, results)=>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
        
    })
};
const getProductsById = (request, response)=>{
    const {id} = request.body;
    db.pool.query('SELECT * FROM products WHERE id=$1', [id], (error, results)=>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
        
    })
};

const createProduct = (request, response)=>{
    const {name, description, price} = request.body
    let lastProductid=null
    db.pool.query('SELECT id FROM products ORDER BY id DESC LIMIT 1', (error, results)=>{
        if(error){
            throw error
        }
        lastProductid = results.rows[0].id + 1;
        db.pool.query('INSERT INTO products VALUES ($1, $2, $3, $4) RETURNING *', [lastProductid, name, description, price], (error, results)=>{
            if(error){
                throw error
            }
            response.status(201).json(results.rows);
        });
    });
}

const deleteProduct = (request, response)=>{
    console.log(request.params)
    const id=request.params.id;
    db.pool.query('DELETE FROM products WHERE id=$1', [id], (error, results)=>{
        if(error){
            throw error
        }
        response.status(204).json('product succesfully deleted');

    })
};

const updateProduct = (request, response)=>{
    const {id, name, description, price} = request.body;
    db.pool.query('UPDATE products SET name=$2, description=$3, price=$4 WHERE id=$1', [id, name, description, price], (error, results)=>{
        if(error){
            throw error
        }
        response.status(204).json(`Successfully updated : $(results.rows[0])`);
    })
};
//cart

const getCarts = (request, response)=>{
    db.pool.query('SELECT * FROM cart ORDER BY id ASC', (error, results)=>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
        
    })
};

const createCarts = (request, response)=>{
    const {user_id} = request.body
    let lastOrderid=null
    db.pool.query('SELECT id FROM cart ORDER BY id DESC LIMIT 1', (error, results)=>{
        if(error){
            throw error
        }
        lastOrderid = results.rows[0].id + 1;
        db.pool.query('INSERT INTO cart VALUES ($1, $2) RETURNING *', [lastOrderid, user_id], (error, results)=>{
            if(error){
                throw error
            }
            response.status(201).json(results.rows);
        });
    });
}
module.exports={
    getUsers,
    getOrders,
    getOrdersById,
    getProducts,
    getProductsById,
    createProduct,
    deleteProduct,
    updateProduct,
    createOrders,
    deleteOrder,
    updateOrder,
    getCarts,
    createCarts
};