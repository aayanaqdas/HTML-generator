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
let selectedElement = null;

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



function createElement() {
  const element = document.createElement(elementTypeSelector.value);
  const elementContent = textBox.value;
  element.textContent = elementContent;
  element.style.color = textColor;
  element.classList.add("element");
  element.contentEditable = true;

  // If user wants to make a list split on comma
  if (elementTypeSelector.value === "ul") {
    const items = elementContent.split(",");
    element.innerHTML = items.map((item) => `<li>${item.trim()}</li>`).join("");
  }

  // Add click event to select the element
  element.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent deselecting when clicking on the element
    selectElement(element);
  });

  canvas.appendChild(element);
}

// Add event listener to the element type selector to change the type of the selected element
elementTypeSelector.addEventListener("change", () => {
  if (selectedElement) {
    changeElementType(elementTypeSelector.value);
  }
});

function selectElement(element) {
  if (selectedElement) {
    selectedElement.classList.remove("selected");
  }
  selectedElement = element;
  selectedElement.classList.add("selected");

  selectedElement.addEventListener("dblclick", removeElement);
}

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

function removeElement(e) {
  e.stopPropagation(); // Prevent triggering other click events
  if (selectedElement) {
    // Add a fade-out effect before removing
    selectedElement.classList.add("fade-out");
    setTimeout(() => {
      selectedElement.remove();
      selectedElement = null;
    }, 300);
  }
}

// Deselect the element when clicking outside
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

// Prevent deselection when focusing on the textColor inputs
textColorInput.addEventListener("focus", (e) => {
  e.stopPropagation();
});

textColorpicker.addEventListener("focus", (e) => {
  e.stopPropagation();
});

addBtn.addEventListener("click", () => {
  if (
    (elementTypeSelector.value !== "br" && textBox.value === "") ||
    elementTypeSelector.value === ""
  ) {
    return;
  }

  createElement();
});
