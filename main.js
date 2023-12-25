let inputGroup = document.getElementsByClassName("top__input-group")
let inputs = document.querySelectorAll(".top__input-group input")
let errormessage = document.getElementsByClassName("errormessage")
let tipBtns = document.querySelectorAll(".top__input-can input")
let total = document.querySelectorAll(".bottom__row__col2 p")
let resetBtn = document.querySelector(".bottom__resetbtn")

let bill = null
let tip = null
let numPple = null
let tipAmount
let totalAmount

inputs[0].addEventListener("change", () => {
    if (inputs[0].value.trim() != 0) {
        bill = inputs[0].value.trim()
    } else {
        bill = null
    }
    execute()
})

let span
span = document.createElement("span")
span.setAttribute("class", "errormessage")
span.innerHTML = "Can't be zero"
span.style.color = "red"

inputs[1].addEventListener("change", () => {
    if (inputs[1].value.trim() == 0) {
        inputs[1].style.outline = "2px solid red"
        inputGroup[1].appendChild(span)
        numPple = null
    } else if (inputs[1].value.trim() != 0 && inputGroup[1].childElementCount == 3) {
        inputs[1].style.outline = ""
        inputGroup[1].removeChild(span)
        numPple = inputs[1].value.trim()
    } else {
        numPple = inputs[1].value.trim()
    }
    execute()
})
for (let i = 0; i < tipBtns.length - 1; i++) {
    tipBtns[i].addEventListener("click", () => {
        tip = tipBtns[i].value.replace("%", "")
        execute()
    })
}

tipBtns[5].addEventListener("change", () => {
    tip = tipBtns[5].value.trim()
    execute()
})

execute = () => {
    if (bill && tip && numPple) {
        tipAmount = eval(bill.toString() * (tip.toString() / 100) / numPple.toString())
        totalAmount = eval((bill.toString() / numPple.toString()) + tipAmount)
    }
    if (tipAmount && totalAmount && tipAmount != Infinity) {
        total[0].innerHTML = `$${tipAmount.toFixed(2)}`
        total[1].innerHTML = `$${totalAmount.toFixed(2)}`
    }
}

resetBtn.addEventListener("click", () => {
    bill = null
    numPple = null
    tip = null
    tipAmount = null
    totalAmount = null
    tipBtns[5].value = ""
    inputs[0].value = ""
    inputs[1].value = ""
    if (inputGroup[1].childElementCount == 3) {
        inputGroup[1].removeChild(span)
        inputs[1].style.outline = ""
    }
    total[0].innerHTML = "$0.00"
    total[1].innerHTML = "$0.00"
})