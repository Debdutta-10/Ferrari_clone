let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.onclick = () => {
  cart.classList.add("active");
}

closeCart.onclick = () => {
  cart.classList.remove("active");
}

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  var removecartbuttons = document.getElementsByClassName('cart-remove');
  for (var i = 0; i < removecartbuttons.length; i++) {
    var button = removecartbuttons[i];
    button.addEventListener("click", removecartitem);
  }
  var quantityinputs = document.getElementsByClassName('cart-quantity');
  for (var i = 0; i < quantityinputs.length; i++) {
    var input = quantityinputs[i];
    input.addEventListener("change", quantitychanged);
  }
  var addcart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addcart.length; i++) {
    var button = addcart[i];
    button.addEventListener("click", addcartclicked);
  }
  document.getElementsByClassName('btn-buy')[0].addEventListener('click', buybuttonclicked);
}

function buybuttonclicked() {
  window.open("index6.html", "_blank"); 
  var cartcontent = document.getElementsByClassName('cart-content')[0];
  while (cartcontent.hasChildNodes()) {
    cartcontent.removeChild(cartcontent.firstChild);
  }
  updatetotal();
}

function removecartitem(event) {
  var buttonclicked = event.target;
  buttonclicked.parentElement.remove();
  updatetotal();
}

function quantitychanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}
function addcartclicked(event){
    var button = event.target;
    var shopproducts = button.parentElement;
    var title = shopproducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopproducts.getElementsByClassName("price")[0].innerText;
    var productimg = shopproducts.getElementsByClassName("product-img")[0].src;
    console.log(title,price,productimg);
    addproducttocart(title,price,productimg);
    updatetotal();
}
function addproducttocart(title, price, productimg) {
    var cartitems = document.getElementsByClassName('cart-content')[0];
    var cartitemsnames = cartitems.getElementsByClassName('cart-product-title');
    var count = 1;
    for (var i = 0; i < cartitemsnames.length; i++) {
      if (cartitemsnames[i].innerText === title) {
        alert("You have already added this item to cart.");
        return;
      }
      else{
        count++;
      }
    }

    if(count>4){
      alert("Only 4 items can be added to cart at a time.");
      return;
    }
  
    var cartbox = document.createElement('div');
    cartbox.classList.add('cart-box');
  
    var cartboxcontent = `
      <img src="${productimg}" alt="" class="cart-img">
      <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
      </div>
      <i class="bx bxs-trash-alt cart-remove"></i>
    `;
  
    cartbox.innerHTML = cartboxcontent;
  
    var removeButton = cartbox.getElementsByClassName('cart-remove')[0];
    removeButton.addEventListener('click', removecartitem);
  
    var quantityInput = cartbox.getElementsByClassName('cart-quantity')[0];
    quantityInput.addEventListener('change', quantitychanged);
  
    cartitems.appendChild(cartbox);
    updatetotal();
  }
  
  
  
function updatetotal() {
  var cartboxes = document.getElementsByClassName("cart-box");
  var total = 0;

  for (var i = 0; i < cartboxes.length; i++) {
    var cartbox = cartboxes[i];
    var priceElement = cartbox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartbox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("₹", ""));
    var quantity = parseInt(quantityElement.value);

    if (isNaN(quantity) || quantity <= 0) {
      quantity = 1;
      quantityElement.value = 1;
    }

    var subtotal = price * quantity;
    total += subtotal;
  }

  document.getElementsByClassName("total-price")[0].textContent = "₹" + total.toFixed(2);
}

