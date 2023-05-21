import { authWithEmailAndPassword, getAuthForm } from "./auth";
import "./index.html";
import { Question } from "./question";
import "./styles.css";
import { cleanForm, createModal, isValid } from "./utils";

const questionForm = document.querySelector("#question-form");
const questionInput = questionForm.querySelector("#question-input");
const questionSubmit = questionForm.querySelector("#question-submit");

const modalBtn = document.querySelector("#modal-btn");

const submitFormHandler = (e) => {
  e.preventDefault();

  if (isValid(questionInput.value)) {
    const question = {
      text: questionInput.value,
      date: new Date().toJSON(),
    };

    questionSubmit.disabled = true;
    console.log("question: ", question);

    Question.push(question).then((response) => {
      console.log("response: ", response);
      cleanForm(questionInput, questionSubmit);
    });
  }
};

const authFormHandler = (e) => {
  e.preventDefault();

  const email = e.target.querySelector("#email").value;
  const password = e.target.querySelector("#password").value;
  const button = e.target.querySelector("button");

  button.disabled = true;
  authWithEmailAndPassword(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(() => (button.disabled = false));
};

const openModal = () => {
  createModal("Авторизация", getAuthForm());
  document
    .querySelector("#auth-form")
    .addEventListener("submit", authFormHandler, { once: true });
};

const renderModalAfterAuth = (content) => {
  if (typeof content === "string") {
    createModal("Ошибка", content);
  } else {
    createModal("Список вопросов", Question.getPrivateList(content));
  }
};

window.addEventListener("load", Question.renderList);

questionForm.addEventListener("submit", submitFormHandler);

questionInput.addEventListener("input", () => {
  questionSubmit.disabled = !isValid(questionInput.value);
});

modalBtn.addEventListener("click", openModal);
