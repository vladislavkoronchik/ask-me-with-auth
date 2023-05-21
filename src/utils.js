export const isValid = (value) => value.length >= 10;

export const cleanForm = (input, button) => {
  input.value = "";
  input.className = "";
  button.disabled = false;
};

export const createModal = (title, content) => {
  var modalEl = document.createElement("div");
  modalEl.classList.add("modal");

  const html = `
    <h2 class="mui--text-display1 mui--text-center">${title}</h2>
    <div class="mui--text-body1">${content}</div>
  `;

  modalEl.innerHTML = html;
  
  mui.overlay("on", modalEl);
};
