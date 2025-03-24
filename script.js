// DOM Elements
const canvas = document.getElementById("canvas");
const bgColorInput = document.getElementById("bgColorCodeInput");
const bgColorPicker = document.getElementById("bgColorPicker");
const elementTypeSelector = document.getElementById("elementSelector");
const textColorInput = document.getElementById("textColorCodeInput");
const textColorpicker = document.getElementById("textColorPicker");
const textBox = document.getElementById("textBox");
const addBtn = document.getElementById("addElBtn");

// Variables
let bgColor = "#ffffff";
let textColor = "#000000";
let selectedElement = null;

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  canvas.style.backgroundColor = bgColorInput.value;
  canvas.style.color = textColorInput.value;
});

// Background Color Handlers
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

// Text Color Handlers
textColorpicker.addEventListener("change", () => {
  textColor = textColorpicker.value;
  textColorInput.value = textColor;
  if (selectedElement) {
    selectedElement.style.color = textColor;
  }
});

textColorInput.addEventListener("input", () => {
  textColor = textColorInput.value;
  textColorpicker.value = textColor;
  if (selectedElement) {
    selectedElement.style.color = textColor;
  }
});

// Utility Functions
function rgbToHex(rgb) {
  const result = rgb.match(/\d+/g);
  return result
    ? `#${(
        (1 << 24) +
        (parseInt(result[0]) << 16) +
        (parseInt(result[1]) << 8) +
        parseInt(result[2])
      )
        .toString(16)
        .slice(1)}`
    : rgb;
}

// Element Creation
function createElement() {
  const element = document.createElement(elementTypeSelector.value);
  const elementContent = textBox.value;
  element.textContent = elementContent;
  element.style.color = textColor;
  element.classList.add("element");
  element.contentEditable = true;

  // Handle List Creation
  if (elementTypeSelector.value === "ul") {
    const items = elementContent.split(",");
    element.innerHTML = items.map((item) => `<li>${item.trim()}</li>`).join("");
  }

  // Add Click Event for Selection
  element.addEventListener("click", (e) => {
    e.stopPropagation();
    selectElement(element);
  });

  canvas.appendChild(element);
  textBox.value = "";
}

// Element Selection
function selectElement(element) {
  if (selectedElement) {
    selectedElement.classList.remove("selected");
  }
  selectedElement = element;
  selectedElement.classList.add("selected");

  textColor = rgbToHex(selectedElement.style.color);
  textColorInput.value = textColor;
  textColorpicker.value = textColor;

  selectedElement.addEventListener("dblclick", removeElement);
}

// Change Element Type
function changeElementType(newType) {
  if (!selectedElement || selectedElement.tagName.toLowerCase() === newType) {
    return;
  }

  // Create a new element with the desired type
  const newElement = document.createElement(newType);
  newElement.textContent = selectedElement.textContent;
  newElement.style.cssText = selectedElement.style.cssText; // Copy styles
  newElement.className = selectedElement.className; // Copy classes
  newElement.contentEditable = true;

  // Add click event to select the new element
  newElement.addEventListener("click", (e) => {
    e.stopPropagation();
    selectElement(newElement);
  });

  newElement.addEventListener("dblclick", removeElement);

  // Replace the old element with the new one
  canvas.replaceChild(newElement, selectedElement);
  selectElement(newElement);
}
elementTypeSelector.addEventListener("change", () => {
  if (selectedElement) {
    changeElementType(elementTypeSelector.value);
  }
});

// Remove Element
function removeElement(e) {
  e.stopPropagation();
  if (selectedElement) {
    selectedElement.classList.add("fade-out");
    setTimeout(() => {
      selectedElement.remove();
      selectedElement = null;
    }, 300);
  }
}

// Deselect Element on Outside Click
document.addEventListener("click", (e) => {
  if (
    selectedElement &&
    e.target !== textColorInput &&
    e.target !== textColorpicker &&
    e.target !== elementTypeSelector
  ) {
    selectedElement.classList.remove("selected");
    selectedElement = null;
  }
});

// Prevent Deselect on Input Focus
textColorInput.addEventListener("focus", (e) => e.stopPropagation());
textColorpicker.addEventListener("focus", (e) => e.stopPropagation());

// Add Element Button
addBtn.addEventListener("click", () => {
  if (
    (elementTypeSelector.value !== "br" && textBox.value === "") ||
    elementTypeSelector.value === ""
  ) {
    return;
  }

  createElement();
});
