export const getAuthForm = () => {
  return `
  <form class="mui-form" id="auth-form">
  <div class="mui-textfield mui-textfield--float-label">
    <input
      id="email"
      type="email"
      required
    />
    <label for="email">Email</label>
  </div>
  <div class="mui-textfield mui-textfield--float-label">
    <input
      id="password"
      type="password"
      required
    />
    <label for="password">Пароль</label>
  </div>
  <button
    type="submit"
    id="auth-submit"
    class="mui-btn mui-btn--raised mui-btn--primary"
  >
    Войти
  </button>
</form>
  `;
};

export const authWithEmailAndPassword = (email, password) => {
  const link =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";
  const apiKey = "AIzaSyBUzYjDgU3emmjNsfS0LITwOThVwGKv2H0";
  const options = {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(`${link}?key=${apiKey}`, options)
    .then((response) => response.json())
    .then((data) => data.idToken);
};
