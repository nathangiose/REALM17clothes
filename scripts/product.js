let cart = []
let items = []

fetch('https://serene-hamlet-94464.herokuapp.com/get-products/')
.then(res => res.json())
.then(data =>{
    items = data
    console.log(data)


let productContainer = document.querySelector('#product-container')
productContainer.innerHTML = "";
data['data'].forEach(product => {
productContainer.innerHTML += `<div class = 'product'>
                                 <img src="${product[6]}" class="product_image">
                                 <h4 class="product_title">${product[1]}</h4> 
                                 <h6 class="product_title">${product[0]}</h6> 
                                 <p class="product_description">${product[2]}<p>
                                 <p class="product_price"> ${product[4]}<p>
                                 <button class="btn-cart" onclick="addToCart(${product[0]})">Add to cart</button>
                                 
                                 </div>`
})

})

function addToCart(id){
    let product = items.find(item =>{
        return item[0] == id
    })
    console.log(product)
    cart.push(product)
    console.log(cart)

}

function searchForProducts() {
    let searchTerm = document.querySelector("#search-bar").value;
    console.log(searchTerm);

    let searchedProducts = products.filter(product => product.product_name.toLowerCase().includes(searchTerm.toLowerCase()));
    console.log(searchedProducts);

    if(searchedProducts.length == 0) {
        document.querySelector("#product-container").innerHTML =
        "<h2>Sorry, we do not have the item you are looking for.</h2>";
    } else
    renderProducts(searchedProducts)
}


