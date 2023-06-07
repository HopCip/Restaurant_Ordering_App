import { menuArray } from './data.js'

const totalPrice = document.getElementById('total_price')
const orderItems = document.getElementById('order-items')
const xCancelOrder = document.querySelector('.x_cancel_order')
const modal = document.querySelector('.modal')
const outgoingMsg = document.getElementById('outgoing-msg')
const nameInput = document.getElementById('full-name')
const ccnInput = document.getElementById('ccn')
const ccvInput = document.getElementById('ccv')
const payButton = document.getElementById("pay_btn")


/*** Order Logic ***/

document.addEventListener('click', function(e){
     if(e.target.dataset.add) {
        addOrderClick(e.target.dataset.add)
        }
    else if(e.target.dataset.remove){
        removeOrderClick(e.target.dataset.remove)
        }
    else if(e.target.dataset.id == 'complete-btn'){
        modal.style.display = 'flex'
    }
})

payButton.addEventListener("click", function(e){
    e.preventDefault()
    validateInputs()
})

xCancelOrder.addEventListener("click", function(){
    modal.style.display = "none"
})

function addOrderClick(itemId) {
    menuArray[itemId].quantity += 1;
    getOrderHtml()
}

function removeOrderClick(itemId){
    menuArray[itemId].quantity -= 1;
    getOrderHtml()
}


function getItemHtml(){
    let postItem = ""
     menuArray.forEach(function(menu){
        postItem += `
            <div class="item">
                <div id="img_div">
                    <img id="item_image" src="${menu.image}">
                </div>
                <div id="item_info">
                    <h6 id="item_name">${menu.name}</h6>
                    <p id="item_description">${menu.ingredients}</p>
                    <p id="item_cost">${menu.price}<span id="item_price">$</span></p>
                </div>
                <div id="btn_div">
                    <button class="btns" data-add="${menu.id}">+</button>
                </div>
            </div>
            <div class="border_div_item"></div>
        `
        })
   return postItem 
}

function render(){
    document.getElementById('main_div').innerHTML = getItemHtml()
}

render()

/*** GetOrderHtml ***/

function getOrderHtml(){
        orderItems.innerHTML = ``
        let totalCost = 0
         menuArray.forEach(function(item){
                if(item.quantity > 0) {
                totalCost += item.price * item.quantity
                orderItems.innerHTML += `
                    <div class="order_div">
                        <p class="ordered_item">${item.quantity} ${item.name}<span class="remove_item_span" data-remove="${item.id}">remove</span></p>
                        <p class="item_price">$${item.quantity * item.price}</p>
                    </div>
                `
                }
             })
            if(totalCost == 0) {
                document.getElementById("order_container").style.display = 'none'
                /* Removes last border of the element */
                document.querySelector(".border_div_item:last-of-type").style.display = "none"
            } else {
                document.getElementById("order_container").style.display = 'block'
                totalPrice.innerHTML = `$${totalCost}`
                /* Shows last border of the element */
                document.querySelector(".border_div_item:last-of-type").style.display = "block"
            }
}

function validateInputs() {
    /* Checks if there are values in all inputs because form required doesn't work without "submit" in function on line 28 */
    if (!nameInput.value || !ccnInput.value || !ccvInput.value) {
  } 
  else {
    /* After submition */
    document.getElementById("order_container").style.display = 'none'
    modal.style.display = 'none'
    outgoingMsg.style.display = 'inline-block'
    outgoingMsg.innerHTML = `Thank you ${nameInput.value}! Your order is on its way!`
    
    /* Disable buttons after submit */
    document.querySelectorAll(".btns").forEach(function(item){
    item.disabled = true
    })
  } 
}