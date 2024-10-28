const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let cors = require('cors');
app.use(cors());

// sample data 
let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];

// endpoint 1 - /cart/add?productId=3&name=Tablet&price=15000&quantity=1
function addProductToCart(productId, name, price, quantity) {
  let newProduct = { productId: productId, name: name, price: price, quantity: quantity }
   cart.push(newProduct);
   return cart;
}
app.get("/cart/add",(req,res)=>{
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let cartItems = addProductToCart(productId, name, price, quantity);
  res.json({cartItems});
});

// endpoint 2 - /cart/edit?productId=2&quantity=3
function editProductQuantity(cart , productId , quantity){
  for (i = 0 ; i < cart.length ; i++){
    if (cart[i].productId === productId){
      cart[i].quantity = quantity;
      break;
    }
  }
  return cart;
}
app.get("/cart/edit",(req,res)=>{
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let cartItems = editProductQuantity(cart , productId , quantity);
  res.json({cartItems});
});

// endpoint 3 - /cart/delete?productId=1
function deleteProductById(ele , productId){
  return ele.productId !== productId;
}
app.get("/cart/delete",(req,res)=>{
  let productId = parseInt(req.query.productId);
  let result = cart.filter(ele => deleteProductById(ele , productId));
  cart = result;
  res.json(cart);
});

// endpoint 4 - /cart
app.get("/cart",(req,res)=>{
  let cartItems = cart;
  res.json({cartItems});
});

// endpoint 5 - /cart/total-quantity
function calculateTheTotalQuantityInTheCart(cart){
  let totalQuantity = 0 ;
  for (i =0 ; i< cart.length ; i++){
    totalQuantity = totalQuantity + cart[i].quantity;
  }
  return totalQuantity;
}
app.get("/cart/total-quantity",(req,res)=>{
  let totalQuantity = calculateTheTotalQuantityInTheCart(cart);
  res.json({totalQuantity});
});

// endpoint 6 - /cart/total-price
function calculateTotalPriceOfCart(cart){
  let totalPrice = 0;
  for(i = 0 ; i < cart.length ; i++){
    totalPrice = totalPrice + (cart[i].price * cart[i].quantity) ;
  }
  return totalPrice;
}
app.get("/cart/total-price",(req,res)=>{
  let totalPrice = calculateTotalPriceOfCart(cart);
  res.json({totalPrice});
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
