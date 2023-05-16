export const isValid = (value) => value.length >= 10;

export const cleanForm = (input, button) => {
  input.value = "";
  input.className = "";
  button.disabled = false;
};
