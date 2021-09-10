const idstored = window.localStorage
let modalBtn = document.querySelector('.product-modal')
let modalBg = document.querySelector('.modal-bg')
let modalClose = document.querySelector('.modal-close')

modalBtn.addEventListener('click', function(){
    modalBg.classList.add('bg-active')
})

modalClose.addEventListener('click', function(){
    modalBg.classList.remove('bg-active')
})



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
                        <button class="model-btn" onClick="openModal(${product[0]})">Update product</button>
                        <div class="update-bg">
                        <div class="update-modal">
                            <form method="POST" class="form-model" id="form">
                              <input type="text" id="new_item_name" name="item_name" placeholder="product name">
                              <input type="text" id="new_description" name="description" placeholder="description">
                              <input type="text" id="new_quantity" name="quantity" placeholder="quantity">
                              <input type="text" id="new_price" name="price" placeholder="price">
                              <input type="text" id="new_type" name="type" placeholder="type">
                              <input type="text" id="new_picture" name="picture" placeholder="picture" onchange="convert()">
        
                              
                            </form>
                            <span class="update-modal-close">X</span>
                            <button type="submit" onclick="event.preventDefault(), update(${product[0]})">Update</button>
                        </div>
                    </div>
        </div>
        </div>`
        
        })
  
})

function openModal(id){
    
    let buttons = document.getElementsByClassName('model-btn')
    for(let i = 0; i <  buttons.length; i++){
    let button = buttons[i]
    let updateBg = document.querySelector('.update-bg')
    let updateClose = document.querySelector('.update-modal-close')

    button.addEventListener('click', function(){
    updateBg.classList.add('update-bg-active')
})

   updateClose.addEventListener('click', function(){
       updateBg.classList.remove('update-bg-active')
   })
   
}
fetch(`https://serene-hamlet-94464.herokuapp.com/get-product/${id}/`)
.then(res => res.json())
.then(data =>{
    console.log(data['data'][0][1])
    idstored.setItem('product_id', data['data'][0][0])
    document.getElementById('new_item_name').value= `${data['data'][0][1]}`
    document.getElementById('new_description').value= `${data['data'][0][2]}`
    document.getElementById('new_quantity').value= `${data['data'][0][3]}`
    document.getElementById('new_price').value= `${data['data'][0][4]}`
    document.getElementById('new_type').value= `${data['data'][0][5]}`
    document.getElementById('new_picture').value= `${data['data'][0][6]}`
    
})
}

    function update(){
        fetch(`https://serene-hamlet-94464.herokuapp.com/edit-product/${idstored.getItem('product_id')}/`, {
            method: "PUT",
            body: JSON.stringify({
                'item_name': document.querySelector('#new_item_name').value,
                'description':  document.querySelector('#new_description').value,
                'quantity': document.querySelector('#new_quantity').value,
                'price' : document.querySelector('#new_price').value,
                'type': document.querySelector('#new_type').value,
                'picture': document.getElementsByClassName('shop-item-image').src,
            }),
            headers: {
                'Content-type': 'application/json',
            }
    })
    .then(res => res.json())
        .then(res => {
          console.log(res);
    
    })
    }





function convert(){
    let imageInput = document.getElementById("picture").files[0];
    let image = document.getElementsByClassName("shop-item-image");
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      image.src=reader.result;
    }, false);
  
    if (imageInput)
    reader.readAsDataURL(imageInput);
  
  
  }

  function create(){
    console.log({
        'item_name': document.querySelector('#item_name').value,
            'description':  document.querySelector('#description').value,
            'quantity': document.querySelector('#quantity').value,
            'price' : document.querySelector('#price').value,
            'type': document.querySelector('#type').value,
            'picture': document.getElementsByClassName('shop-item-image').src,
    }
    )
    fetch('https://serene-hamlet-94464.herokuapp.com/products-create/', {
        method: "POST",
        body: JSON.stringify({
            'item_name': document.querySelector('#item_name').value,
            'description':  document.querySelector('#description').value,
            'quantity': document.querySelector('#quantity').value,
            'price' : document.querySelector('#price').value,
            'type': document.querySelector('#type').value,
            'picture': document.getElementsByClassName('shop-item-image').src,
        }),
        headers: {
            'Content-type': 'application/json',
        }
})
.then(res => res.json())
    .then(res => {
      console.log(res);

})
}

