import { menuArray } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


const menu = document.getElementById("menu")
const checkoutMenu = document.getElementById('checkout')
const orderItems = document.getElementById('ordered-items')
const paymentPage = document.getElementById('payment-page')
const completeOrderBtn = document.getElementById('complete-order-btn')
let orderedItemsArr = []

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
    }else if(e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
    }


})


completeOrderBtn.addEventListener('click', completeOrder)
document.getElementById('pay-btn').addEventListener('click',paying)
function completeOrder() {
    paymentPage.classList.remove('hidden')
}

function handleAddClick(itemId){
    orderedItemsArr.push(menuArray.filter(item => item.id == itemId).map(item => ({...item,id : uuidv4()}))[0])
    
    render()
    
}

function handleRemoveClick(itemId){
    orderedItemsArr = orderedItemsArr.filter(item => item.id != itemId)
    render()
}  

function paying(){
    const inputName = document.getElementById('input-name')
const inputCardNumber = document.getElementById('input-card-number')
    const inputCardCvv = document.getElementById('input-cvv')
    const thanksMessage = document.getElementById('thanks-message')
    if(
        inputName.value &&
        inputCardNumber.value &&
        inputCardCvv.value
    ){
        thanksMessage.innerHTML =
         `
         <h2 class="thanks-message">Thanks,${inputName.value}!Your order is on its way!</h2>
        `
        checkoutMenu.classList.add('hidden')
        paymentPage.classList.add('hidden')
    }
    
}

function render() {
    let menuHtml = ``
    let orderedItemsHtml = ``
menuArray.forEach(item => {
    
    menuHtml += `
    <div class="menu-item">
        
        <h1 class="emoji">${item.emoji}</h1>
        <div class='item-details'>
            <h2>${item.name}</h2>
            <p>${item.ingredients}</p>
            <h2>$${item.price}</h2>
        </div>
        <div class="add-btn"><button id='add-btn' data-add="${item.id}">+</button></div>
        </div>
        
    </div>
    
    `
  
})

if(orderedItemsArr.length >0){
    checkoutMenu.classList.remove('hidden')
    orderedItemsArr.forEach(item => {
        orderedItemsHtml+= `
            <div class="ordered-item">
                <h2 class='item-name'>${item.name}</h2>
                <h4 class='remove' data-remove="${item.id}">remove</h4>
                <h2>$${item.price}</h2>
            </div>
        `
        
    })

}else if(orderedItemsArr.length == 0){
    checkoutMenu.classList.add('hidden')
}
menu.innerHTML = menuHtml  
orderItems.innerHTML = orderedItemsHtml
document.getElementById('total-price').innerHTML = `$${orderedItemsArr.map(item => item.price).reduce((a,b) => a+b)}`

}

render()
