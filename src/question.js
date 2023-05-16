export class Question {
  static push(question) {
    return fetch('https://ask-me-with-auth-default-rtdb.firebaseio.com/questions.json', {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(response => {
      console.log('response: ', response)
    })
  }
}