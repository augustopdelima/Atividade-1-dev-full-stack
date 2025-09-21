const express = require("express");
const router = express.Router();
const { hasNoAttributesToUpdate, isAValidNumber, productHasAttributes, updateProductFields} = require("../utils/products");


let products = [
  { id: 1, name: "Product A", price: 100, amount: 10 },
  { id: 2, name: "Product B", price: 150, amount: 20 },
];

let nextId = 3; 

router.get("/", (req, res) => {
  return res.json(products);
});

router.get("/:id", (req, res) => {
  const product = products.find((p)  => {
    return p.id ===  Number(req.params.id);
  })

  if(!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  return res.json(product);
});

router.post("/", (req, res) => {
  let { name, price, amount } = req.body;

  if (!productHasAttributes({ name, price, amount })) {
    return res
      .status(400)
      .json({ error: "Name, price, and amount are  required." });
  }

  price = parseFloat(price);

  if (!isAValidNumber(price)) {
    return res.status(400).json({ error: "Price must be a valid number." });
  }

  amount = parseInt(amount);

  if (!isAValidNumber(amount)) {
    return res.status(400).json({ error: "Amount must be a valid number." });
  }

  const newProduct = {
    id: nextId++,
    name,
    price,
    amount,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: "Product not found!" });
  }

  const { name, price, amount } = req.body;

  if (hasNoAttributesToUpdate({ name, price, amount })) {
    return res.status(400).json({ error: "No attributes to update!" });
  }

  const result = updateProductFields(product, { name, price, amount });

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  return res.status(200).json({
    message: "Product has been updated",
    product: result.product,
  });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: "Product not found!" });
  }

  products = products.filter(p => p.id !== id);

  return res.status(200).json({message:"The product has been deleted!"});
});

module.exports = router;
