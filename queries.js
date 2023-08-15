const express = require('express');
const db= require('./clientdb.js');




// Users Queries
const getUsers = (request, response)=>{
    db.pool.query('SELECT * FROM users ORDER BY id ASC', (error, results)=>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
        
    })
};



const createUser = (request, response)=>{
    const {name, email, password}=request.body
    let lastProductid=null;
    db.pool.query('SELECT id FROM users ORDER BY id DESC LIMIT 1', (error, results)=>{
        if(error){
            throw error;
        }
        lastProductid = results.rows[0].id + 1;
        db.pool.query('INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING *', [lastProductid, name, email, password], (error, results)=>{
            if(error){
                throw error
            }
            response.status(201).send(`User added with ID: ${results.rows[0].id}`)
        })
        
    });
}


// Orders Queries
const getOrders = (request, response)=>{
    db.pool.query('SELECT * FROM orders ORDER BY id ASC', (error, results)=>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
        
    })
};

const createOrders = (request, response)=>{
    const {user_id} = request.body
    let lastOrderid=null
    db.pool.query('SELECT id FROM orders ORDER BY id DESC LIMIT 1', (error, results)=>{
        if(error){
            throw error
        }
        lastOrderid = results.rows[0].id + 1;
        db.pool.query('INSERT INTO orders VALUES ($1, $2) RETURNING *', [lastOrderid, user_id], (error, results)=>{
            if(error){
                throw error
            }
            response.status(201).json(results.rows);
        });
    });
}
const deleteOrder = (request, response)=>{
    console.log(request.params)
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
    createUser,
    getOrders,
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    createOrders,
    deleteOrder,
    updateOrder,
    getCarts,
    createCarts
};