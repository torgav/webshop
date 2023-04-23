//Globala variabler 
const cartItemContainer = document.querySelector('.cart-item-container');
const addToCartButtons = document.querySelectorAll('.add-cart-button');
const cartAmount = document.querySelector('.cart-amount');
const checkoutButton = document.querySelector('.check-out-button');
let totalPrice = 0;

//Denna funktion tar vissar min cart genom att lägga till en class till diven som är hela min varukorg, dessutom la jag till en blur i backgrunden.
function toggleCart() {
  const cartElement = document.getElementById('cart');
  cartElement.classList.toggle('open');
  const backdrop = document.getElementById('cart-background-blur');
  backdrop.classList.toggle('is-visible');
}

/*Vi tar in parameter från de två event listeners, och vi tar in de namn och pris av den produkten man vill ta bort. 
Då måste vi ändra pris och ta bort profukten från våran local storage så att den inte laddas up vid en refresh.
*/
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

//Denna eventlistener laddar upp alla produkter som fanns inne i local storage och sedan ger dem klasserna och regler för hur de ska se ut.
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

    // EN simpel liten delete knapp som anroppar metoden.
    const removeButtonElement = cartItem.querySelector('.remove-item-button');
    removeButtonElement.addEventListener('click', () => {
      removeCartItem(cartItem, name, price);
    }); 
  }
});

/*Här är mon andra event listener som väntar på att jag trykcer på någon add to cart knapp.
  Så när en av prodkterna läggs till tar vi namnet och priset genom deras data set dom har fått.
  Sedan lägger jag till klasserna dom ska ha för hur de ska se ut.
*/
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = button.dataset.price;

    //Allt denna sektion gör är att skapa divar och med deras klasser,
    // Om du kollar i github i början så skpadade jag hur varje produkt skulle se ut i carten,
    // Då jag överförde allt det är i koden som skapar alla divar och span i deras specifika delar som jag hade det.
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

    //Lägger till produkten till local storage
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

//Allt denna gör är att ta bort allting från local storage och sedan skapar en alert som säger vara att du köpte.
checkoutButton.addEventListener('click', () => {
  localStorage.removeItem('cartItems');
  alert('Purchase complete!');
});