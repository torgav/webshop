function toggleCart() {
    const cartElement = document.getElementById('cart');
    cartElement.classList.toggle('open');
    const backdrop = document.getElementById('cartBackgroundBlur');
    backdrop.classList.toggle('is-visible');
  }
  
  const removeCartItemButtons = document.getElementsByClassName('productRemoveButton');
  console.log(removeCartItemButtons);
  
  for (let i = 0; i < removeCartItemButtons.length; i++) {
    const button = removeCartItemButtons[i];
    button.addEventListener('click', (event) => {
      const buttonClicked = event.target;
      buttonClicked.parentElement.parentElement.remove();
    });
  }

  const cartItemContainer = document.querySelector('.cartItemContainer');
const cartAmount = document.querySelector('.cart-amount');
const addToCartButtons = document.querySelectorAll('.addToCartButton');
const checkoutButton = document.querySelector('.checkoutButton');
let totalPrice = 0;

// Add event listener for add to cart buttons
for (let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener('click', () => {
    const name = addToCartButtons[i].dataset.name;
    const price = addToCartButtons[i].dataset.price;

    // Check if item is already in cart
    const cartItems = cartItemContainer ? Array.from(cartItemContainer.children) : [];
    const existingCartItem = cartItems.find(item => item.dataset.name === name);

    if (existingCartItem) {
      // Update quantity and price of existing cart item
      const quantityText = existingCartItem.querySelector('.quantityText');
      const quantity = parseInt(quantityText.textContent) + 1;
      quantityText.textContent = `${quantity}x`;

      const productPrice = existingCartItem.querySelector('.productPrice');
      const existingPrice = parseInt(productPrice.textContent.replace('$', ''));
      const newPrice = existingPrice + parseInt(price);
      productPrice.textContent = `$${newPrice}`;

      // Update total price
      totalPrice += parseInt(price);
      if (cartAmount) {
        cartAmount.textContent = `$${totalPrice}`;
      }
    } else {
      // Create new cart item
      const cartItem = document.createElement('li');
      cartItem.classList.add('cartItems');
      cartItem.dataset.name = name;

      const productDetails = document.createElement('div');
      productDetails.classList.add('productDetails');

      const productQuantity = document.createElement('span');
      productQuantity.classList.add('productQuantity', 'textStyleOdibee');

      const quantityText = document.createElement('span');
      quantityText.classList.add('quantityText', 'textStyleOdibee');
      quantityText.textContent = '1x';

      const productName = document.createElement('span');
      productName.textContent = name;

      productQuantity.appendChild(quantityText);
      productQuantity.appendChild(productName);

      const productPrice = document.createElement('div');
      productPrice.classList.add('productPrice', 'textStyleOdibee');
      productPrice.textContent = `$${price}`;

      const productRemoveButton = document.createElement('div');
      productRemoveButton.classList.add('productRemoveButton');

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

      // Update total price
      totalPrice += parseInt(price);
      if (cartAmount) {
        cartAmount.textContent = `$${totalPrice}`;
      }

      // Set up event listener for product remove button
      const removeButtonElement = cartItem.querySelector('.productRemoveButton');
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

// Add event listener for checkout button
checkoutButton.addEventListener('click', () => {
  alert('Purchase complete!');
});