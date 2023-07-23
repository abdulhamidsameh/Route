let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productDescription = document.getElementById("productDescription");
let updateIndex = -1;
let products = [];
if (localStorage.getItem("products")) {
  products = JSON.parse(localStorage.getItem("products"));
  showProducts();
}
function showProducts() {
  let str = ``;
  for (let i = 0; i < products.length; i++) {
    str += `
    <tr>
    <td>${i + 1}</td>
    <td>${products[i].name}</td>
    <td>${products[i].price}</td>
    <td>${products[i].description}</td>
    <td>
      <button onclick="setUpdate(${i})" class="btn btn-outline-warning my-3 btn-sm">
        Update Product
      </button>
      <button onclick="deleteProducts(${i})" class="btn btn-outline-danger my-3 btn-sm">
        Delete Product
      </button>
    </td>
  </tr>
    `;
  }
  document.getElementById("adding").innerHTML = str;
}
function addProduct() {
  if (validateProductName()) {
    if (validateProductPrice()) {
      if (validateProductDescription()) {
        let product = {
          name: productName.value,
          price: productPrice.value,
          description: productDescription.value,
        };
        products.push(product);
        showProducts();
        localStorage.setItem("products", JSON.stringify(products));
        clear();
      } else {
        alert("Product description Is InValid");
      }
    } else {
      alert("Product Price Is InValid");
    }
  } else {
    alert("Product Name Is InValid");
  }
}
function deleteProducts(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  showProducts();
}
function clear() {
  productName.value = "";
  productPrice.value = "";
  productDescription.value = "";
}
function search(search) {
  let str = ``;
  for (let i = 0; i < products.length; i++) {
    if (
      products[i].name.toUpperCase().includes(search.toUpperCase()) ||
      products[i].description.toUpperCase().includes(search.toUpperCase()) ||
      products[i].price.includes(search)
    ) {
      str += `
      <tr>
      <td>${i + 1}</td>
      <td>${products[i].name.replace(search, `<span>${search}</span>`)}</td>
      <td>${products[i].price.replace(search, `<span>${search}</span>`)}</td>
      <td>${products[i].description.replace(
        search,
        `<span>${search}</span>`
      )}</td>
      <td>
        <button onclick=setUpdate(${i})" class="btn btn-outline-warning my-3 btn-sm">
          Update Product
        </button>
        <button onclick="deleteProducts(${i})" class="btn btn-outline-danger my-3 btn-sm">
          Delete Product
        </button>
      </td>
    </tr>
      `;
    }
  }
  document.getElementById("adding").innerHTML = str;
}
function setUpdate(index) {
  updateIndex = index;
  addButton.classList.replace("d-block", "d-none");
  updateButton.classList.replace("d-none", "d-block");
  productName.value = products[updateIndex].name;
  productPrice.value = products[updateIndex].price;
  productDescription.value = products[updateIndex].description;
}
function updateProduct() {
  let product = {
    name: productName.value,
    price: productPrice.value,
    description: productDescription.value,
  };
  products.splice(updateIndex, 1, product);
  showProducts();
  localStorage.setItem("products", JSON.stringify(products));
  clear();
  addButton.classList.replace("d-none", "d-block");
  updateButton.classList.replace("d-block", "d-none");
}
function validateProductName() {
  let regex = /[A-Z][a-zA-Z0-9]{3,}/;
  return regex.test(productName.value);
}
function validateProductPrice() {
  let regex = /^\d{0,8}[.]?\d{1,4}$/;
  return regex.test(productPrice.value);
}
function validateProductDescription() {
  let regex = /^(.|\s)*[a-zA-Z]+(.|\s)*$/;
  return regex.test(productDescription.value);
}
