//imports
import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './visualizer.js';
import * as json from './load-json.js';

//params object
const drawParams = {
  showLine: false,
  showBars: true,
  showCircles: false,
  showInvert: false,
  showFireworks: true,
  showTriangles: true,
  highshelf: false,
  lowshelf: false,
  distortion: false,
  toggleWave: false,

  //set intial distortion
  distortionAmount: 20
}

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
  sound1: "media/music/Nocturne.mp3"
});

const init = () => {
  audio.setupWebaudio(DEFAULTS.sound1);
  console.log("init called");
  //console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
  let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
  setupUI(canvasElement);

  canvas.setupCanvas(canvasElement, audio.analyserNode);

  json.loadJson();

  loop();
}

const setupUI = (canvasElement) => {
  // A - hookup fullscreen button
  const fsButton = document.querySelector("#btn-fs");
  const playButton = document.querySelector("#btn-play");

  // add .onclick event to button
  fsButton.onclick = e => {
    console.log("goFullscreen() called");
    utils.goFullscreen(canvasElement);
  };

  //PLAY BUTTON
  playButton.onclick = e => {
    console.log(`audioCtx.state before = ${audio.audioCtx.state}`)


    //check if in suspend state (autoplay)
    if (audio.audioCtx.state == "suspended") {
      audio.audioCtx.resume();
    }
    console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
    if (e.target.dataset.playing == "no") {
      //if currently paused, play it
      audio.playCurrentSound();
      e.target.dataset.playing = "yes";

    } else {
      audio.pauseCurrentSound();
      e.target.dataset.playing = "no";
    }

  };

  //VOLUME SLIDER
  //get references to them
  let volumeSlider = document.querySelector("#slider-volume");
  let volumeLabel = document.querySelector("#label-volume");

  //change on input
  volumeSlider.oninput = e => {
    //set gain
    audio.setVolume(e.target.value);
    //update value on label
    volumeLabel.innerHTML = Math.round((e.target.value / 2 * 100));
  };

  //set initial
  volumeSlider.dispatchEvent(new Event("input"));

  //TRACK SELECT
  let trackSelect = document.querySelector("#select-track");
  //onchange event
  trackSelect.onchange = e => {
    audio.loadSoundFile(e.target.value);
    //pause current if playing
    if (playButton.dataset.playing == "yes") {
      playButton.dispatchEvent(new MouseEvent("click"));
    }
  };

  //CHECKBOX EVENTS
  //reference from html
  let lineCheck = document.querySelector("#cb-lines")
  let fireCheck = document.querySelector("#cb-fireworks")
  let triCheck = document.querySelector("#cb-triangles")
  let barCheck = document.querySelector("#cb-bars")
  let circleCheck = document.querySelector("#cb-circles")
  let invCheck = document.querySelector("#cb-invert")

  //start them checked
  barCheck.checked = true;
  fireCheck.checked = true;
  triCheck.checked = true;

  //line
  lineCheck.onclick = () => {
    if (lineCheck.checked) {
      drawParams.showLine = true;
    } else {
      drawParams.showLine = false;
    }
  }

  //bars
  barCheck.onclick = () => {
    if (barCheck.checked) {
      drawParams.showBars = true;
    } else {
      drawParams.showBars = false;
    }
  }

  //circles
  circleCheck.onclick = () => {
    if (circleCheck.checked) {
      drawParams.showCircles = true;
    } else {
      drawParams.showCircles = false;
    }

  }

  //invert
  invCheck.onclick = () => {
    if (invCheck.checked) {
      drawParams.showInvert = true;
    } else {
      drawParams.showInvert = false;
    }

  }

  //fireworks
  fireCheck.onclick = () => {
    if (fireCheck.checked) {
      drawParams.showFireworks = true;
    } else {
      drawParams.showFireworks = false;
    }

  }

  //triangles
  triCheck.onclick = () => {
    if (triCheck.checked) {
      drawParams.showTriangles = true;
    } else {
      drawParams.showTriangles = false;
    }

  }


  //SOUND FILTERS
  document.querySelector('#cb-highshelf').checked = drawParams.highshelf;
  document.querySelector('#cb-lowshelf').checked = drawParams.lowshelf;
  document.querySelector('#cb-distortion').checked = drawParams.distortion;

  document.querySelector('#cb-highshelf').onchange = e => {
    drawParams.highshelf = e.target.checked;
    audio.toggleHighshelf(drawParams);
  };

  document.querySelector('#cb-lowshelf').onchange = e => {
    drawParams.lowshelf = e.target.checked;
    audio.toggleLowshelf(drawParams);
  };

  document.querySelector('#cb-distortion').onchange = e => {
    drawParams.distortion = e.target.checked;
    audio.toggleDistortion(drawParams);
  };

  document.querySelector('#slider-distortion').value = drawParams.distortionAmount;
  document.querySelector('#slider-distortion').onchange = e => {
    drawParams.distortionAmount = Number(e.target.value);
    audio.toggleDistortion(drawParams);
  };

  //TOGGLE VISUALIZATION
  document.querySelector('#select-visualizer').onchange = e => {
    if (e.target.value == "frequency") {
      drawParams.toggleWave = false;
    } else {
      drawParams.toggleWave = true;
    }
  }

} // end setupUI

//DATA VISULIZER
const loop = () => {
  let fps = 60;
  canvas.draw(drawParams, fps);
  setTimeout(loop);

}

export { init };