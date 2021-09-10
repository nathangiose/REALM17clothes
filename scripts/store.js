// let products = []
// let cart = []

const mystorage = window.localStorage
const idStorage = window.localStorage

console.log(mystorage.getItem('username'))

let modalBtn = document.querySelector('.modal-button')
let modalBg = document.querySelector('.modal-bg')
let modalClose = document.querySelector('.modal-close')

modalBtn.addEventListener('click', function(){
    modalBg.classList.add('bg-active')
})

modalClose.addEventListener('click', function(){
    modalBg.classList.remove('bg-active')
})


function Deleteuser(){
    fetch(`https://serene-hamlet-94464.herokuapp.com/show-user/${idStorage.getItem('username')}`,{
        method: "GET",
        body: JSON.stringify(),
        headers: {
            'Content-type': 'application/json',
        }
    })
    .then(res => res.json())
                .then(data => {
                    console.log(data)
            })
        }

fetch('https://serene-hamlet-94464.herokuapp.com/get-products/')
.then(res => res.json())
.then(data =>{
    products = data
    console.log(data)
    let productContainer = document.querySelector('.shop-items')
        productContainer.innerHTML = "";
        data['data'].forEach(product => {
        productContainer.innerHTML += `<div class = 'shop-item'>
        <span class="shop-item-title">${product[1]}</span>
        <img src="${product[6]}" class="shop-item-image">
        <div class="shop-item-details">
                        <span class="shop-item-price">${product[4]}</span>
                        <button class="btn btn-primary shop-item-button" onClick="addClicked(${product[0]})">ADD TO CART</button>
        </div>
        </div>`
        
        })
  
})

fetch(`https://serene-hamlet-94464.herokuapp.com/show-user/${mystorage.getItem('username')}`,{
    method: "GET",
    body: JSON.stringify(),
    headers: {
        'Content-type': 'application/json',
    }
})
.then(res => res.json())
            .then(data => {
                console.log(data)
                console.log(data['data'][1])
                document.querySelector('.first-name').innerHTML = `First Name: ${data['data'][1]}`
                document.querySelector('.surname').innerHTML = `Surname: ${data['data'][2]}`
                document.querySelector('.address').innerHTML = `Address: ${data['data'][3]}`
                document.querySelector('.email').innerHTML = `Email: ${data['data'][4]}`
                document.querySelector('.username').innerHTML = `Username: ${data['data'][5]}`
        })


function addClicked(id){
    fetch(`https://serene-hamlet-94464.herokuapp.com/get-product/${id}/`, {
                method: "GET",
                body: JSON.stringify(),
                headers: {
                    'Content-type': 'application/json',
                }
        })
        .then(res => res.json())
            .then(data => {
                console.log(data)
                console.log(data['data'][0])
                let title = `${data['data'][0][1]}`
                let price = `${data['data'][0][4]}`
                let imageSrc = `${data['data'][0][6]}`
                console.log(title)
                addItemToCart(title, price, imageSrc)
                cartTotal()
        })
        }
   




function addItemToCart(title, price, imageSrc){
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemName = cartItems.getElementsByClassName('cart-item-title')
    for(let i = 0; i <  cartItemName.length; i++){
        if(cartItemName[i].innerText == title){
            alert("This item is already added to the cart")
            return
        }
    }
    let cartRowContent = `<div class="cart-item cart-column">
                          <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                          <span class="cart-item-title">${title}</span>
                          </div>
                          <span class="cart-price cart-column">${price}</span>
                          <div class="cart-quantity cart-column">
                          <input class="cart-quantity-input" type="number" value="1">
                        <button class="btn btn-danger" type="button">REMOVE</button>
                    </div>`
    cartRow.innerHTML = cartRowContent
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeItem )
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChange)
 
}

function quantityChange(){
    let input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    } 
    cartTotal()
}


function removeItem(){
let removeCart = document.getElementsByClassName('btn-danger')
for(let i = 0; i < removeCart.length; i++){
    let button = removeCart[i]
    button.addEventListener('click', function(event){
        let btnClicked = event.target
        btnClicked.parentElement.parentElement.remove()
        cartTotal()
    })
    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for(let i = 0; i < quantityInputs.length; i++){
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChange)
    }
}
}


function cartTotal(){
    let cartContainer = document.getElementsByClassName('cart-items')[0]
    let cartRow = cartContainer.getElementsByClassName('cart-row')
    let total = 0
    for(let i = 0; i < cartRow.length; i++){
        let row = cartRow[i]
        let priceItem = row.getElementsByClassName('cart-price')[0]
        let quantityItem = row.getElementsByClassName('cart-quantity-input')[0]
        let price = parseFloat(priceItem.innerText.replace('R', ''))
        let quantity = quantityItem.value
        total = Math.round(total + (price * quantity))
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerHTML = 'R' + total

}