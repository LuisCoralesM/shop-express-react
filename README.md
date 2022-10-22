[![CI](https://github.com/LuisCoralesM/shop-express-react/actions/workflows/node.js.yml/badge.svg)](https://github.com/LuisCoralesM/shop-express-react/actions/workflows/node.js.yml)

# Trendy Cloth - A Clothing Store

A completely functional clothing store for users to create their account and order some cool shirts!

Heroku deployment [HERE!](https://clothingstore-lc.herokuapp.com/)

Made in React, Express and PostgreSQL

## Core project

The project consists of two apps, the backend API and the frontend. The backend is made as a MVC structure, which can be accessed by its endpoints so the data provided by the client can be stored, modified or deleted in the database. The frontend makes requests to this backend API.

The basic user (which can be created by signing up) can do the following:

- Check the products.
- Add products to the cart (by clicking the product and then the `Add to Cart` button).
- Order the products in the cart by adding an address.

The admin user can do all the previous stuff and check the core, which consists in the stats of sales by product and orders filtering them by dates, countries and many more. Also, the admin could add new products, check orders, modify existing users and manage the whole project.

## Development

Commands to start the backend side:

```
$ cd server
$ npm install
$ npm run dev
```

And to run the frontend using another terminal:

```
$ cd ../client
$ npm install
$ npm start
```
