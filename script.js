const canvas = document.getElementById("canvas");
const bgColorInput = document.getElementById("bgColorCodeInput");
const bgColorPicker = document.getElementById("bgColorPicker");
const elementTypeSelector = document.getElementById("elementSelector");
const textColorInput = document.getElementById("textColorCodeInput");
const textColorpicker = document.getElementById("textColorPicker");
const textBox = document.getElementById("textBox");
const addBtn = document.getElementById("addElBtn");

let bgColor;
let textColor;

document.addEventListener("DOMContentLoaded", () => {
  canvas.style.backgroundColor = bgColorInput.value;
  canvas.style.color = textColorInput.value;
});

bgColorPicker.addEventListener("change", () => {
  bgColor = bgColorPicker.value;
  bgColorInput.value = bgColor;
  canvas.style.backgroundColor = bgColor;
});

bgColorInput.addEventListener("input", () => {
  bgColor = bgColorInput.value;
  bgColorPicker.value = bgColor;
  canvas.style.backgroundColor = bgColor;
});

textColorpicker.addEventListener("change", () => {
  textColor = textColorpicker.value;
  textColorInput.value = textColor;
});

textColorInput.addEventListener("input", () => {
  textColor = textColorInput.value;
  textColorpicker.value = textColor;
});

function createElement() {
  const element = document.createElement(elementTypeSelector.value);
  const elementContent = textBox.value;
  element.textContent = elementContent;
  element.style.color = textColor;
  element.classList.add("element");
  
  const deleteBtn = document.createElement("button")
  deleteBtn.textContent = "Slett";
  deleteBtn.classList.add("delete-btn");
  element.appendChild(deleteBtn);

  

  //If user wants to make a list split on comma
  if (elementTypeSelector.value === "ul") {
    const items = elementContent.split(",");
    element.innerHTML = items.map((item) => `<li>${item.trim()}</li>`).join("");
  }

  canvas.appendChild(element);
}

addBtn.addEventListener("click", () => {
  if (
    (elementTypeSelector.value !== "br" && textBox.value === "") ||
    elementTypeSelector.value === ""
  ) {
    return;
  }

  createElement();
});


