let form = document.querySelector("form");
let alert = document.querySelector(".alert");
let inputValue = document.querySelector(".inputValue");
let lists = document.querySelector(".lists");
let clearBtn = document.querySelector(".clear-btn");
let CItems = document.querySelector(".CItems");
let submitBtn = document.querySelector(".submit-btn");

// form
form.addEventListener("submit",addItem);
clearBtn.addEventListener("click",clearItems);

// Edit elements
let editElement;
let editFlag = false;
let editId   = "";

// Function add item
function addItem(e) {
    e.preventDefault();
    let value = inputValue.value;
    let id = new Date().getMilliseconds().toString();
    if(value !== "" && !editFlag) {
        // console.log("Add item to the list");
        let element = document.createElement("ul");
        element.classList.add("list-group");
        let attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        lists.classList.add("show-list");
        element.innerHTML = `<li class="list-group-item"><span>${value}</span> <button class="btn btn-danger btn-sm"><i class="fa-solid fa-trash-can delete-btn"></i></button><button class="btn btn-warning btn-sm edit-btn"><i class="fa-solid fa-pencil"></i></button> </li>`;
        let deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click",deleteItem);
        let editBtn     = element.querySelector(".edit-btn");
        editBtn.addEventListener("click",editItem);

        lists.appendChild(element);
        CItems.classList.add("clear-items-show");
        displayAlert("You have successfully added a product","success");
        setToDefaultValue();
    } else if(value !== "" && editFlag) {
        // console.log("Edited");
        editElement.innerHTML = value;
        displayAlert("Edited","success");
        setToDefaultValue();
    } else {
        // console.log("Empty value");
        displayAlert("Enter your product!","danger");
    }
}

// Delete item
function deleteItem(e) {
    let element = e.currentTarget.parentElement.parentElement.parentElement;
    let id = element.dataset.id;
    lists.removeChild(element);
    if(lists.children.length === 0) {
        lists.classList.remove("show-list");
    }
    displayAlert("Delete item","danger");
    setToDefaultValue();
}

// Clear items
function clearItems() {
    let items = document.querySelectorAll(".list-group");
    if(items.length > 0) {
        items.forEach((item) => {
            lists.removeChild(item);
        });
    }
    CItems.classList.remove("clear-items-show");
    displayAlert("Clear items","danger");
    setToDefaultValue();
}

// Edit item
function editItem(e) {
    let element = e.currentTarget.parentElement.parentElement.parentElement;
    editElement = e.currentTarget.previousElementSibling.previousElementSibling;
    inputValue.value = editElement.innerHTML;
    editFlag = true;
    editId = element.dataset.id;
    submitBtn.textContent = "Edit";
}

// display alert
function displayAlert(text,action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    // Timeout alert message
    setTimeout(() => {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    },1500);
}

function setToDefaultValue() {
    inputValue.value = "";
    let editFlag = false;
    let editId   = "";
    submitBtn.textContent = "Submit";
}
