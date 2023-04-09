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

for (let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener('click', () => {
    const name = addToCartButtons[i].dataset.name;
    const price = addToCartButtons[i].dataset.price;

    const cartItems = cartItemContainer ? Array.from(cartItemContainer.children) : [];
    const existingCartItem = cartItems.find(item => item.dataset.name === name);

    if (existingCartItem) {
      const quantityText = existingCartItem.querySelector('.item-information');
      const quantity = parseInt(quantityText.textContent) + 1;
      quantityText.textContent = `${quantity}x`;

      const productPrice = existingCartItem.querySelector('.product-price');
      const existingPrice = parseInt(productPrice.textContent.replace('$', ''));
      const newPrice = existingPrice + parseInt(price);
      productPrice.textContent = `$${newPrice}`;

      totalPrice += parseInt(price);
      if (cartAmount) {
        cartAmount.textContent = `$${totalPrice}`;
      }
    } else {
      const cartItem = document.createElement('li');
      cartItem.classList.add('cart-items');
      cartItem.dataset.name = name;

      const productDetails = document.createElement('div');
      productDetails.classList.add('item-information');

      const productQuantity = document.createElement('span');
      productQuantity.classList.add('productQuantity', 'text-style-odibee');

      const quantityText = document.createElement('span');
      quantityText.classList.add('item-information', 'text-style-odibee');
      quantityText.textContent = '1x';

      const productName = document.createElement('span');
      productName.textContent = name;

      productQuantity.appendChild(quantityText);
      productQuantity.appendChild(productName);

      const productPrice = document.createElement('div');
      productPrice.classList.add('product-price', 'text-style-odibee');
      productPrice.textContent = `$${price}`;

      const productRemoveButton = document.createElement('div');
      productRemoveButton.classList.add('remove-item-button');

      const removeButton = document.createElement('span');
      removeButton.innerHTML = '&#10005;';

      productRemoveButton.appendChild(removeButton);

      productDetails.appendChild(productQuantity);
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
        console.log('Product remove button clicked');
        cartItem.remove();
        totalPrice -= parseInt(price);
        if (cartAmount) {
          cartAmount.textContent = `$${totalPrice}`;
        }
      });
    }
  });
}

checkoutButton.addEventListener('click', () => {
  alert('Purchase complete!');
});

const removeCartItemButtons = document.getElementsByClassName('remove-item-button');
for (let i = 0; i < removeCartItemButtons.length; i++) {
  const button = removeCartItemButtons[i];
  button.addEventListener('click', (event) => {
    const cartItem = event.target.parentElement.parentElement;
    const name = cartItem.dataset.name;
    const price = parseInt(cartItem.querySelector('.product-price').textContent.replace('$', ''));
    const quantityElement = cartItem.querySelector('.item-information');
    let quantity = parseInt(quantityElement.textContent);
    const cartItems = Array.from(cartItemContainer.children);
    const existingCartItem = cartItems.find(item => item.dataset.name === name);
    if (quantity > 1) {
      quantity--;
      quantityElement.textContent = `${quantity}x`;
      existingCartItem.querySelector('.item-information').textContent = `${quantity}x`;
      existingCartItem.querySelector('.product-price').textContent = `$${quantity * price}`;
    } else {
      cartItemContainer.removeChild(cartItem);
    }
    totalPrice -= price;
    if (cartAmount) {
      cartAmount.textContent = `$${totalPrice}`;
    }
  });
}