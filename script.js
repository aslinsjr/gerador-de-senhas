const passShow = document.querySelector("#password-generated");
const generateBtn = document.querySelector("#pass-generator-btn");
const copyBtn = document.querySelector("#copy-btn");
const submitBtn = document.querySelector("#submit-btn");
const formContainer = document.querySelector(".form-container");
const formControll = document.querySelector(".form-controll");


function getLowerCase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getUpperCase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getNumber() {
    return Math.floor(Math.random() * 10).toString();
}

function getSymbol() {
    const symbols = "(){}[]=<>/,:.;~^!@#$%&*+_-";

    return symbols[Math.floor(Math.random() * symbols.length)]
}

function generatePassword(generators, passwordLength) {

    let passwordGenerated = ""

    for (let i = 0; i < passwordLength; i = i + generators.length) {
        generators.forEach(() => {

            const randomValue = generators[Math.floor(Math.random() * generators.length)]();

            passwordGenerated += randomValue;
        })
    }

    passwordGenerated = passwordGenerated.slice(0, passwordLength)

    passShow.innerHTML = passwordGenerated
}

generateBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const generators = [];

    const letterOption = document.querySelector("#pass-letters").checked;
    const numberOption = document.querySelector("#pass-number").checked;
    const symbolOption = document.querySelector("#pass-symbols").checked;

    const passwordLength = document.querySelector("#pass-qnt").value;

    if(letterOption){
        generators.push(getUpperCase, getLowerCase)
    }

    if(numberOption){
        generators.push(getNumber)
    }

    if(symbolOption){
        generators.push(getSymbol)
    }

    if(generators.length > 0) {
        generatePassword(generators, passwordLength)
    }
    
})

const copyContent = async () => {
    try {
    await navigator.clipboard.writeText(passShow.innerText);
    copyBtn.innerHTML = "Copiado ✔"
    setTimeout(() => {
        copyBtn.innerHTML = "Copiar"
    }, 1000);
    } catch (err) {
    console.error('Failed to copy: ', err);
    }
}

copyBtn.addEventListener("click", (e) => {
    e.preventDefault()

    copyContent()
})

submitBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const name = document.querySelector("#name").value
    const email = document.querySelector("#e-mail").value

    if(!name || !email) {
        return
    }else {

        const template = `<div class="confirm-container">
        <h1>${name},</h1> <br>
        <h2>seus dados foram cadastrados com sucesso!</h2>
        <p>Enviamos um e-mail de confirmação para <span id="confirmation-email">${email}</span></p>
        </div>`

        const parser = new DOMParser();
        const htmlTemplate = parser.parseFromString(template, "text/html");
        const confirmContainer = htmlTemplate.querySelector(".confirm-container")

        formControll.classList.add("hide")
        formContainer.appendChild(confirmContainer)
    }

    
})
