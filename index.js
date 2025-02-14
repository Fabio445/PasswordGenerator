// Elements
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const lengthRange = document.getElementById("length-range");
const lengthNumber = document.getElementById("length-number");
const textArea = document.getElementById("password");
const message = document.getElementById("warning-message");

// Character sets
const charsSets = {
  upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowerCase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+",
};

// Get selected characters
function defineChars() {
  let chars = "";
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) chars += charsSets[checkbox.id];
  });
  if (!chars) alert("Please select at least one character set.");
  return chars;
}

// Ensure at least one checkbox is selected
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    if (!Array.from(checkboxes).some((cb) => cb.checked)) {
      checkbox.checked = true;
      message.textContent = "At least one character set must be selected!";
      setTimeout(() => (message.textContent = ""), 3000);
    } else {
      message.textContent = "";
    }
  });
});

// Generate password
function generatePassword() {
  const chars = defineChars();
  const passwordLength = lengthRange.value;
  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  textArea.value = password;
}

// Copy password to clipboard
function copyPassword() {
  textArea.select();
  navigator.clipboard
    .writeText(textArea.value)
    .then(() => console.log("Text copied to clipboard"))
    .catch((err) => console.error("Failed to copy text: ", err));
}

// Update password on checkbox change
function updateChars() {
  generatePassword();
}

// Event listeners
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", updateChars);
});

lengthNumber.addEventListener("input", () => {
  lengthRange.value = lengthNumber.value;
});

lengthNumber.addEventListener("change", () => {
  let value = parseInt(lengthNumber.value, 10);
  if (isNaN(value) || value < lengthRange.min) value = lengthRange.min;
  else if (value > lengthRange.max) value = lengthRange.max;
  lengthNumber.value = value;
  lengthRange.value = value;
  generatePassword();
});

lengthRange.addEventListener("input", () => {
  lengthNumber.value = lengthRange.value;
  generatePassword();
});

// Initial password generation
generatePassword();
