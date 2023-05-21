export class Question {
  static async push(question) {
    const request =
      "https://ask-me-with-auth-default-rtdb.firebaseio.com/questions.json";
    const options = {
      method: "POST",
      body: JSON.stringify(question),
      headers: {
        "Content-Type": "application/json",
      },
    };
    let response = await fetch(request, options);
    response = await response.json();
    question.id = response.name;
    addToLocalStorage(question);
    Question.renderList();
    return response;
  }

  static async fetch(token) {
    if (!token) {
      return Promise.resolve('<p class="error">У вас нет токена</p>');
    }
    const link =
      "https://ask-me-with-auth-default-rtdb.firebaseio.com/questions.json";

    let response = await fetch(`${link}?auth=${token}`);
    response = await response.json();
    if (response && response.error) {
      return `<p class="error">${response.error}</p>`;
    }
    return response
      ? Object.keys(response).map((key) => ({
          ...response[key],
          id: key,
        }))
      : [];
  }

  static renderList() {
    const questions = getFromLocalStorage();

    const html = questions.length
      ? questions.map(createCard).join("")
      : `<div class="mui--text-headline">Вы пока ничего не спрашивали</div>`;

    const list = document.querySelector("#list");

    list.innerHTML = html;
  }

  static getPrivateList(questions) {
    return questions.length
      ? questions.map(createCard).join("")
      : `<div class="mui--text-body1">Вопросов пока нет</div>`;
  }
}

function addToLocalStorage(question) {
  const all = getFromLocalStorage();
  all.push(question);
  localStorage.setItem("questions", JSON.stringify(all));
}

function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem("questions") || "[]");
}

function createCard(question) {
  return `
    <div class="mui-panel">
      <div class="mui--text-dark-secondary mui--text-caption">
      ${new Date(question.date).toLocaleDateString()} 
      ${new Date(question.date).toLocaleTimeString()}
      </div>
      <div class="mui--text-black-54">
        ${question.text}
      </div>
    </div>
    <br>
  `;
}
