
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
