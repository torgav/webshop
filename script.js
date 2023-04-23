const cartItemContainer = document.querySelector('.cart-item-container');
const addToCartButtons = document.querySelectorAll('.add-cart-button');
const cartAmount = document.querySelector('.cart-amount');
const checkoutButton = document.querySelector('.check-out-button');
let totalPrice = 0;

function toggleCart() {
  const cartElement = document.getElementById('cart');
  cartElement.classList.toggle('open');
  const backdrop = document.getElementById('cart-background-blur');
  backdrop.classList.toggle('is-visible');
}

function removeCartItem(cartItem, name, price) {
  console.log('Product remove button clicked');
  cartItem.remove();
  totalPrice -= parseInt(price);
  if (cartAmount) {
    cartAmount.textContent = `$${totalPrice}`;
  }

  const items = JSON.parse(localStorage.getItem('cartItems'));
  const index = items.findIndex(item => item.name === name && item.price === price);
  if (index !== -1) {
    items.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(items));
  }
}

window.addEventListener('load', () => {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  for (let item of cartItems) {
    const name = item.name;
    const price = item.price;

    const cartItem = document.createElement('li');
    cartItem.classList.add('cart-items');
    cartItem.dataset.name = name;
    cartItem.dataset.price = price;

    const productDetails = document.createElement('div');
    productDetails.classList.add('item-information');

    const productText = document.createElement('span');
    productText.classList.add('text-style-odibee');

    const quantityText = document.createElement('span');
    quantityText.classList.add('item-information', 'text-style-odibee');
    quantityText.textContent = '1x';

    const productName = document.createElement('span');
    productName.textContent = name;

    productText.appendChild(quantityText);
    productText.appendChild(productName);

    const productPrice = document.createElement('span');
    productPrice.classList.add('product-price','text-style-odibee');
    productPrice.textContent = `$${price}`;

    const productRemoveButton = document.createElement('div');
    productRemoveButton.classList.add('remove-item-button');

    const removeButton = document.createElement('span');
    removeButton.innerHTML = '&#10005;';

    productRemoveButton.appendChild(removeButton);

    productDetails.appendChild(productText);
    productDetails.appendChild(productPrice);

    cartItem.appendChild(productDetails);
    cartItem.appendChild(productRemoveButton);

    if (cartItemContainer) {
      cartItemContainer.appendChild(cartItem);
    }

    totalPrice += parseInt(price);
    if (cartAmount) {
      cartAmount.textContent = `$${totalPrice}`;
    }

    const removeButtonElement = cartItem.querySelector('.remove-item-button');
    removeButtonElement.addEventListener('click', () => {
      removeCartItem(cartItem, name, price);
    }); 
  }
});

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = button.dataset.price;

    const cartItem = document.createElement('li');
    cartItem.classList.add('cart-items');
    cartItem.dataset.name = name;
    cartItem.dataset.price = price;

    const productDetails = document.createElement('div');
    productDetails.classList.add('item-information');

    const productText = document.createElement('span');
    productText.classList.add('text-style-odibee');

    const quantityText = document.createElement('span');
    quantityText.classList.add('item-information', 'text-style-odibee');
    quantityText.textContent = '1x';

    const productName = document.createElement('span');
    productName.textContent = name;

    productText.appendChild(quantityText);
    productText.appendChild(productName);

    const productPrice = document.createElement('span');
    productPrice.classList.add('product-price','text-style-odibee');
    productPrice.textContent = `$${price}`;

    const productRemoveButton = document.createElement('div');
    productRemoveButton.classList.add('remove-item-button');

    const removeButton = document.createElement('span');
    removeButton.innerHTML = '&#10005;';

    productRemoveButton.appendChild(removeButton);

    productDetails.appendChild(productText);
    productDetails.appendChild(productPrice);

    cartItem.appendChild(productDetails);
    cartItem.appendChild(productRemoveButton);

    if (cartItemContainer) {
      cartItemContainer.appendChild(cartItem);
    }

    totalPrice += parseInt(price);
    if (cartAmount) {
      cartAmount.textContent = `$${totalPrice}`;
    }

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const newItem = { name: name, price: price };
    cartItems.push(newItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    const removeButtonElement = cartItem.querySelector('.remove-item-button');
    removeButtonElement.addEventListener('click', () => {
      removeCartItem(cartItem, name, price);
    });
  });
});

checkoutButton.addEventListener('click', () => {
  localStorage.removeItem('cartItems');
  alert('Purchase complete!');
});