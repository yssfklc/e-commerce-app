# e-commerce-app
Creating a backend project for an e-commerce app. 
  - Express.js is used to create api paths and requests.
  - For login passport.js and bcrypt library is used.
  - PostgreSQL(relational database) database is used to store data and sql is used to retrieve and write datas.
    

## Capability
 1. Create, read, update, and delete  users, orders, products, carts.
 2. Precautions for SQL injections are made.
 3. Passwords are hashed before writing to the Database

### API Documentation is created by Swagger Editor
  - A picture is added from the swagger editor and ui
![Screenshot 2023-08-15 172702](https://github.com/yssfklc/e-commerce-app/assets/121329421/d1a59ce8-17ae-4eb3-818e-91a4cc3af8c0)

### Tests
  - API endpoints are tested by using Postman

### Next Version Updates
  - Fix XXS, CSRF vulnarabilitys by sanitization.
  - Add authentication based access.
  - Design and develop frontend react project.
