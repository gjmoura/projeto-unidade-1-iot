
const liga = (id) => {
  document.getElementById(id).setAttribute("src", "images/on.jpg");
  document.getElementById("result").innerHTML= "Lâmpada Acesa!";
}

const desliga = (id) => {
  document.getElementById(id).setAttribute("src", "images/off.jpg");
  document.getElementById("result").innerHTML= "Lâmpada Apagada!";
}

const mudar = () => {
  for(let i = 0; i < 10; i++) {
    console.log("Mudou!");
  }
}

function sendToServer() {
  let state = Math.random() * 100;
  let KEY = "3FRETIHT52FB1D9G";
  //criar um objeto capaz de enviar dados via requisição HTTP GET
  const http = new XMLHttpRequest();
  //prepara um GET passando a váriavel lux como ultimo paramentro do link
  http.open("GET",`https://api.thingspeak.com/update?api_key=${KEY}&field1=0${state}`);
  //envia um GET
  http.send();
  //quando a requisição retornar ele chama o console e imprime o valor gerado
  http.onload = console.log(http.responseText+" "+state)
}