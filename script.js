
const liga = (id) => {
  document.getElementById(id).setAttribute("src", "images/Lon.png");
  document.getElementById("result").innerHTML= "Lâmpada Acesa!";
}

const desliga = (id) => {
  document.getElementById(id).setAttribute("src", "images/Loff.png");
  document.getElementById("result").innerHTML= "Lâmpada Apagada!";
}

const mudar = () => {
  for(let i = 0; i < 10; i++) {
    console.log("Mudou!");
  }
}
