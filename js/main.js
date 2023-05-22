// Select elements
let alert = document.querySelector(".alert");
let form = document.querySelector("form");
let inputValue = document.querySelector(".inputValue");
let lists = document.querySelector(".lists");
let claerProducts = document.querySelector(".clear-items");
let clearBtn = document.querySelector(".clear-btn");
let submitBtn = document.querySelector(".submit-btn");

// Event listeners
form.addEventListener("submit",addProduct);
clearBtn.addEventListener("click",clearProducts);

// Loaded setup products
window.addEventListener("DOMContentLoaded",setupProducts);


// Edit elements
let editElement;
let editFlag = false;
let editId = "";

// Add product
function addProduct(e) {
    e.preventDefault();
    let value = inputValue.value;
    let id = new Date().getMilliseconds().toString();
    if(value !== "" && !editFlag) {
        // createListProduct(id,value);
        // console.log("Add product to the list");
        let element = document.createElement("li");
        element.classList.add("list-group");
        let attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `<li class="list-group-item"><span>${value}</span> <button class="btn btn-danger btn-sm"><i class="fa-solid fa-trash-can delete-btn"></i></button><button class="btn btn-warning btn-sm edit-btn"><i class="fa-solid fa-pencil"></i></button> </li>`;
        let deleteBtn = element.querySelector(".delete-btn");
        let editBtn     = element.querySelector(".edit-btn");
        editBtn.addEventListener("click",editProduct);
        deleteBtn.addEventListener("click",deleteProduct);
        lists.appendChild(element);
        lists.classList.add("show-list");
        claerProducts.classList.add("clear-items-show");
        displayAlert("Product added successfully","success");
        addToLocalStorage(id,value);
        setToDefaultValue();
    } else if(value !== "" && editFlag) {
        editElement.innerHTML = value;
        displayAlert("Successfully edited product","success");
        editToLocalStorage(editId,value);
        setToDefaultValue();
    } else {
        // console.log("Empty");
        displayAlert("You have not entered a product!","danger");
    }
}

// Delete product
function deleteProduct(e) {
    element = e.currentTarget.parentElement.parentElement.parentElement;
    let id = element.dataset.id;
    lists.removeChild(element);
    displayAlert("Delete item","danger");
    setToDefaultValue();
    removeToLocalStorage(id);
}

// Edit product
function editProduct(e) {
    element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.previousElementSibling.previousElementSibling;
    inputValue.value = editElement.innerHTML;
    editFlag = true;
    editId = element.dataset.id;
    submitBtn.textContent = "Edit";
}

// Clear products
function clearProducts() {
    let products = document.querySelectorAll(".list-group");
    if(products.length > 0) {
        products.forEach((product) => {
            lists.removeChild(product);
        });
    }
    claerProducts.classList.remove("clear-items-show");
    displayAlert("Removed products","danger");
    localStorage.removeItem('product');
}
// function displayAlert message
function displayAlert(text,action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setTimeout(() => {
        alert.textContent  = "";
        alert.classList.remove(`alert-${action}`);
    },1500);
}

// Add to local storage
function addToLocalStorage(id,value) {
    let product = {id,value}
    let products = setFromLocalStorage();
    products.push(product);
    localStorage.setItem('product', JSON.stringify(products));
}

// Remove product to local storage
function removeToLocalStorage(id) {
    products = setFromLocalStorage();
    products = products.filter((product) => {
        if(product.id !== id) {
            return product;
        }
    });
    localStorage.setItem('product', JSON.stringify(products));
}

// Edit product to local storage
function editToLocalStorage(id,value) {
    products = setFromLocalStorage();
    products = products.map((product) => {
        if(product.id === id) {
            product.value = value;
        } 
        return product;
    });
    localStorage.setItem('product', JSON.stringify(products));
}

// Set local storage
function setFromLocalStorage() {
    return localStorage.getItem('product')?JSON.parse(localStorage.getItem('product')):[];
}

function setupProducts() {
    let products = setFromLocalStorage();
    if(products.length > 0) {
        products.forEach((product) => {
            createListProduct(product.id,product.value);
        });
        lists.classList.add('show-list');
    }
}

// Create to the list product
function createListProduct(id,value) {
    let element = document.createElement("li");
    element.classList.add("list-group");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<li class="list-group-item"><span>${value}</span> <button class="btn btn-danger btn-sm"><i class="fa-solid fa-trash-can delete-btn"></i></button><button class="btn btn-warning btn-sm edit-btn"><i class="fa-solid fa-pencil"></i></button> </li>`;
    let deleteBtn = element.querySelector(".delete-btn");
    let editBtn     = element.querySelector(".edit-btn");
    editBtn.addEventListener("click",editProduct);
    deleteBtn.addEventListener("click",deleteProduct);
    lists.appendChild(element);
}

// Default value
function setToDefaultValue() {
    editElement;
    editFlag = false;
    editId = "";
    inputValue.value = "";
    submitBtn.textContent = "Submit";
}
