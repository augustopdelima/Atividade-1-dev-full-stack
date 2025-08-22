function isAValidNumber(number) {
  if (typeof number !== "number" || isNaN(number)) return false;
  if (number < 0) return false;

  return true;
}

function productHasAttributes(product) {
  const { name, price, amount } = product;

  if (name === undefined) return false;
  if (price === undefined) return false;
  if (amount === undefined) return false;

  return true;
}

function hasNoAttributesToUpdate({ name, price, amount }) {
  return name === undefined && price === undefined && amount === undefined;
}

function updateProductFields(product, { name, price, amount }) {
  if (price !== undefined) {
    const parsedPrice = parseFloat(price);
    if (!isAValidNumber(parsedPrice)) {
      return { error: "Price must be a valid number!" };
    }
    product.price = parsedPrice;
  }

  if (amount !== undefined) {
    const parsedAmount = parseInt(amount);
    if (!isAValidNumber(parsedAmount)) {
      return { error: "Amount must be a valid number!" };
    }
    product.amount = parsedAmount;
  }

  if (name !== undefined) {
    product.name = name;
  }

  return { product };
}

module.exports = { isAValidNumber, hasNoAttributesToUpdate, updateProductFields, productHasAttributes}