function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function () {
  // return this.questions[this.questionIndex];
  return this.questions[Math.floor(Math.random() * questions.length)];
}


Quiz.prototype.guess = function (answer) {
  if (this.getQuestionIndex(quess).isCorrectAnswer(answer)) {
    this.score++;
    // answer.style.animation = "color-animation 0.5s infinite linear alternate";
    // alert("correct");
  } else {
    // document.getElementById("quizContainer").style.display = "none";
    // alert("wrong answer");
    // showScores();
    // window.location.href = "../index.html";
  }

  this.questionIndex++; 
}

Quiz.prototype.isEnded = function () {
  return this.questionIndex === "";
}