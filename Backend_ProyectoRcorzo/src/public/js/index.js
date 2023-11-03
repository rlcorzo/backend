const socketClient = io();

const form = document.getElementById('form');
const inputName = document.getElementById('name');
const inputPrice = document.getElementById('price');
const divMessage = document.getElementById('message');


form.onsubmit = (e) => {
    e.preventDefault()
    const userName = inputName.value;
    const price = inputPrice.value;
    socketClient.emit("firstEvent", userName);
    socketClient.emit("firstEvent", price);
};

socketClient.on("secondEvent", info => {
    console.log(`Info sent: ${info}`);
    console.log(`New price: ${info}`);
});


Swal.fire({

    title: 'Welcome!',
    text: 'Product',
    input: "text",
    inputValidator: value=>{
        if(!value){
            return 'Product is required'
        }
    },
    confirmButtonText: 'Enter'

}).then((input)=>{
    product = input.value;
    divMessage.innerText = `Name product: ${product}`;
});