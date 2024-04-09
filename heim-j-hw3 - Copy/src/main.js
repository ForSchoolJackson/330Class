//imports
import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './visualizer.js';
import * as json from './load-json.js';
import * as burger from './burger.js';

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

  burger.makeBurger();

  loop();
}

const setupUI = (canvasElement) => {
  // A - hookup fullscreen button
  const fsButton = document.querySelector("#btn-fs");
  const playButton = document.querySelector("#btn-play");

  // add .onclick event to button
  if (fsButton) {
    fsButton.onclick = e => {
      console.log("goFullscreen() called");
      utils.goFullscreen(canvasElement);
    };
  }

  //PLAY BUTTON
  if (playButton) {
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
  }

  //VOLUME SLIDER
  //get references to them
  let volumeSlider = document.querySelector("#slider-volume");
  let volumeLabel = document.querySelector("#label-volume");

  //change on input
  if (volumeSlider) {
    volumeSlider.oninput = e => {
      //set gain
      audio.setVolume(e.target.value);
      //update value on label
      volumeLabel.innerHTML = Math.round((e.target.value / 2 * 100));
    };


    //set initial
    volumeSlider.dispatchEvent(new Event("input"));

  }

  //TRACK SELECT
  let trackSelect = document.querySelector("#select-track");
  //onchange event
  if (trackSelect) {
    trackSelect.onchange = e => {
      audio.loadSoundFile(e.target.value);
      //pause current if playing
      if (playButton.dataset.playing == "yes") {
        playButton.dispatchEvent(new MouseEvent("click"));
      }
    };
  }

  //CHECKBOX EVENTS
  //reference from html
  let lineCheck = document.querySelector("#cb-lines")
  let fireCheck = document.querySelector("#cb-fireworks")
  let triCheck = document.querySelector("#cb-triangles")
  let barCheck = document.querySelector("#cb-bars")
  let circleCheck = document.querySelector("#cb-circles")
  let invCheck = document.querySelector("#cb-invert")

  //start them checked
  if (barCheck) {
    barCheck.checked = true;
  }

  if (fireCheck) {
    fireCheck.checked = true;
  }

  if (triCheck) {
    triCheck.checked = true;
  }
  //line
  if (lineCheck) {
    lineCheck.onclick = () => {
      if (lineCheck.checked) {
        drawParams.showLine = true;
      } else {
        drawParams.showLine = false;
      }
    }
  }

  //bars
  if (barCheck) {
    barCheck.onclick = () => {
      if (barCheck.checked) {
        drawParams.showBars = true;
      } else {
        drawParams.showBars = false;
      }
    }
  }

  //circles
  if (circleCheck) {
    circleCheck.onclick = () => {
      if (circleCheck.checked) {
        drawParams.showCircles = true;
      } else {
        drawParams.showCircles = false;
      }

    }
  }

  //invert
  if (invCheck) {
    invCheck.onclick = () => {
      if (invCheck.checked) {
        drawParams.showInvert = true;
      } else {
        drawParams.showInvert = false;
      }

    }
  }

  //fireworks
  if (fireCheck) {
    fireCheck.onclick = () => {
      if (fireCheck.checked) {
        drawParams.showFireworks = true;
      } else {
        drawParams.showFireworks = false;
      }

    }
  }

  //triangles
  if (triCheck) {
    triCheck.onclick = () => {
      if (triCheck.checked) {
        drawParams.showTriangles = true;
      } else {
        drawParams.showTriangles = false;
      }

    }
  }


  //SOUND FILTERS
  let highCheck = document.querySelector('#cb-highshelf');
  let lowsCheck = document.querySelector('#cb-lowshelf');
  let distCheck = document.querySelector('#cb-distortion');
  let sliderDist = document.querySelector('#slider-distortion');
  let selectVis = document.querySelector('#select-visualizer');

  if (highCheck) {
    highCheck.checked = drawParams.highshelf;

    highCheck.onchange = e => {
      drawParams.highshelf = e.target.checked;
      audio.toggleHighshelf(drawParams);
    };
  }

  if (lowsCheck) {
    lowsCheck.checked = drawParams.lowshelf;

    lowsCheck.onchange = e => {
      drawParams.lowshelf = e.target.checked;
      audio.toggleLowshelf(drawParams);
    };
  }

  if (distCheck) {
    distCheck.checked = drawParams.distortion;

    distCheck.onchange = e => {
      drawParams.distortion = e.target.checked;
      audio.toggleDistortion(drawParams);
    };
  }

  if (sliderDist) {
    sliderDist.value = drawParams.distortionAmount;
    sliderDist.onchange = e => {
      drawParams.distortionAmount = Number(e.target.value);
      audio.toggleDistortion(drawParams);
    };

  }

  //TOGGLE VISUALIZATION
  if (selectVis) {
    selectVis.onchange = e => {
      if (e.target.value == "frequency") {
        drawParams.toggleWave = false;
      } else {
        drawParams.toggleWave = true;
      }
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