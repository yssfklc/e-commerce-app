# e-commerce-app full-stack PERN app
Creating a backend project for an e-commerce app. 
  - Express.js is used to create api paths and requests.
  - For login passport.js and bcrypt library is used.
  - PostgreSQL(relational database) database is used to store data and sql is used to retrieve and write datas.
  - Frontend login-products-orders pages are developed and added picture below(Pictures from the app are at the bottom.)
  - Currently, React-redux is developing to provide global state management
    

## Capability
 1. Create, read, update, and delete  users, orders, products, carts.
 2. Precautions for SQL injections are made.
 3. Passwords are hashed before writing to the Database
 4. Register/Login via passport.js.
 5. Check and search products and check your own orders.

### API Documentation is created by Swagger Editor
  - A picture is added from the swagger editor and ui
![Screenshot 2023-08-15 172702](https://github.com/yssfklc/e-commerce-app/assets/121329421/d1a59ce8-17ae-4eb3-818e-91a4cc3af8c0)

### Tests
  - API endpoints are tested by using Postman
  - Next version react frontend unit-tests will be developed via Jest

### Next Version Updates
  - Fix XXS, CSRF vulnarabilitys by sanitization.
  - Add authentication based access.
  - Design and develop frontend react project.
#### Frontend Pictures
  1. Register/Login
![image](https://github.com/yssfklc/e-commerce-app/assets/121329421/f28d296d-be3b-409e-ab27-e657630fca94)
  2. Products/Home Page
![image](https://github.com/yssfklc/e-commerce-app/assets/121329421/db0045aa-d696-4d72-baef-bc4be59e707b)
  3. Orders Page
![image](https://github.com/yssfklc/e-commerce-app/assets/121329421/42e6e301-96a5-4522-9afd-7e40f6b2731b)



