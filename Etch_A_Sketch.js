const DEFAULT_COLOR = "#333333";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;
let isToggle = false;

const colorPicker = document.querySelector("input[type='color']");
colorPicker.addEventListener("input", getColor);

const colorBtn = document.querySelector("#color");
const rainbowBtn = document.querySelector("#rainbow");
const shadingBtn = document.querySelector("#shading");
const eraserBtn = document.querySelector("#eraser");
const clearBtn = document.querySelector("#clear");
const grid = document.querySelector(".game_grid");
let prevButton = colorBtn;
let curButton = null;

const buttons = document.querySelectorAll("button:not(#clear");
buttons.forEach((el) => {
  el.addEventListener("click", selectButton);
});
clearBtn.onclick = clearGrid;

function selectButton(e) {
  if (prevButton) {
    prevButton.classList.toggle("active");
  }
  curButton = e.target;
  curButton.classList.toggle("active");
  currentMode = curButton.id;
  prevButton = curButton;
}

const slider = document.querySelector(".rs-range");
const sliderValue = document.querySelector(".rs-value");
slider.addEventListener("input", (event) => {
  const tempSliderValue = event.target.value;
  currentSize = tempSliderValue;
  sliderValue.textContent = `${tempSliderValue} x ${tempSliderValue}`;
  buildGrid();
});

function buildGrid() {
  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${currentSize}, 1fr)`;
  for (let i = 0; i < currentSize ** 2; i++) {
    const block = document.createElement("div");
    block.className = "block";
    block.addEventListener("mouseover", changeColor);
    block.addEventListener("mousedown", changeColor);
    grid.append(block);
  }
}

document.addEventListener("mousedown", toggle);
document.addEventListener("mouseup", toggle);
grid.addEventListener("dragstart", (event) => {
  event.preventDefault();
  return false;
});

function clearGrid() {
  const blocks = document.querySelectorAll(".block");
  blocks.forEach((el) => {
    el.style.backgroundColor = "#FFFFFF";
  });
}

function toggle(e) {
  if (e.type == "mouseup") {
    isToggle = false;
  } else if (e.type == "mousedown") {
    isToggle = true;
  }
}

function getColor() {
  currentColor = this.value;
}

function changeColor(e) {
  if (e.type === "mouseover" && !isToggle) return;
  else if (currentMode == "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode == "rainbow") {
    let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    e.target.style.backgroundColor = color;
  } else if (currentMode == "eraser") {
    e.target.style.backgroundColor = "#FFFFFF";
  } else if (currentMode == "shading") {
    let tmpColor = e.target.style.backgroundColor.slice(4, -1).split(",");
    if (tmpColor[0] === "" && tmpColor.length == 1) {
      tmpColor = [255, 255, 255];
    }
    let res = tmpColor.map((el) => {
      let part = (10 * el) / 100;
      return Math.floor(el - part);
    });
    // console.log(`rgb(${res.join(",")})`);
    e.target.style.backgroundColor = `rgb(${res.join(",")})`;
  }
}

window.onload = () => {
  buildGrid();
  sliderValue.textContent = `${slider.value} x ${slider.value}`;
  colorPicker.value = DEFAULT_COLOR;
  prevButton.classList.toggle("active");
};
