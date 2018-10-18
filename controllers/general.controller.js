const express = require("express");
var product = require("../models/Product");
var Cart = require("../models/cart.model");

// Adding product to the cart
exports.addToCart = (req, res ,next) => {
  var productId = req.params.id;
  var quantity = parseInt(req.body.qoqo,10);
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect("/singleProduct/"+productId);
    }
    cart.add(product, productId, quantity);
    req.session.cart = cart;

    res.redirect("/singleProduct/"+productId);
  });
};

exports.reduceFromCart = (req, res) => {
  var productId = req.params._id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect("/cartView");
    }

    cart.reduce(product, productId);

    req.session.cart = cart;

    res.redirect("/cartView");
  });
};

exports.increaseCart = (req, res) =>{
  var productId = req.params._id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect("/cartView");
    }

    cart.increase(product, productId);

    req.session.cart = cart;

    res.redirect("/cartView");
  });
};

exports.removeAll = (req, res) =>{
  var productId = req.params._id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect("/cartView");
    }
    cart.removeAll(product, productId);
    req.session.cart = cart;
    res.redirect("/cartView");
  });
};

exports.cartView = (req, res) => {
  if (!req.session.cart) {
    return res.render("shoppingCart", { products: null });
  }
  var cart = new Cart(req.session.cart);
  res.render("shoppingCart", {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice
  });
};

