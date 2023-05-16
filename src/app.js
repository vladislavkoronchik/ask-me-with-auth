import "./index.html";
import { Question } from "./question";
import "./styles.css";
import { cleanForm, isValid } from "./utils";

const questionForm = document.querySelector("#question-form");
const questionInput = questionForm.querySelector("#question-input");
const questionSubmit = questionForm.querySelector("#question-submit");

const submitFormHandler = (e) => {
  e.preventDefault();

  if (isValid(questionInput.value)) {
    const question = {
      text: questionInput.value,
      date: new Date().toJSON(),
    };

    questionSubmit.disabled = true;

    Question.push(question).then(() => {
      cleanForm(questionInput, questionSubmit);
    })
  }
};

questionForm.addEventListener("submit", submitFormHandler);

questionInput.addEventListener("input", () => {
  questionSubmit.disabled = !isValid(questionInput.value);
});
