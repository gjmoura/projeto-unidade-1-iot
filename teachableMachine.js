// Global variables
let valuePredict;
let classPredict;

// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/7S_azivTz/";

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
    const botao = document.getElementById("botao");
    const texto = document.getElementById("texto").innerHTML = "Faça uma tesoura com os dedos para acender e uma mão fechada para apagar";
    botao.remove();
    console.log(botao)
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
  // predict can take in an image, video or canvas html element
  const prediction = await model.predict(webcam.canvas);
  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    labelContainer.childNodes[i].innerHTML = classPrediction;
    valuePredict = prediction[i].probability.toFixed(2);
    classPredict = prediction[i].className;
    turnLight(classPredict, valuePredict);
  }
}

function turnLight(type, value) {
  if(type === "Mão fechada" && parseFloat(value) > 0.5) {
    document.getElementById("lamp").src = "images/off.jpg"
  } else if(type === "Mão tesoura" && parseFloat(value) > 0.5) {
    document.getElementById("lamp").src = "images/on.jpg"
  } else {
    console.log("none")
  }
}

function sendToThing(luxG){
  let KEY = "LURD8BNYPTYYFYLK";
  const http = new XMLHttpRequest()
  http.open("GET", `https://api.thingspeak.com/update?api_key=${KEY}&field1=0${luxG}`)
  http.send()
  http.onload = setLuxText(http.responseText, luxG)
}


setInterval(sendToThing, 20000, valuePredict);
