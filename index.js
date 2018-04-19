const qData = [
  {
    question: 'What is the name of the commercial towing vehicle on which the film takes place?',
    answers: [
      'The Enterprise',
      'The Nautilus',
      'The Nostromo',
      'The Argon',
    ],
    correctAnswer: 'The Nostromo',
  },
  {
    question: 'What is the registration number of the commercial towing vehicle?',
    answers: [
      '789452189',
      '875436645',
      '459021547',
      '180924609',
    ],
    correctAnswer: '180924609',
  },
  {
    question: 'What is the name of the computer that runs the ship?',
    answers: [
      'Hal',
      'Computer',
      'Mother',
      'Father',
    ],
    correctAnswer: 'Mother',
  },
  {
    question: 'What is the name of the planet the crew visits? (note: revealed in Aliens)',
    answers: [
      'Nars',
      'LV-223',
      'LV-426',
      'Darwin II',
    ],
    correctAnswer: 'LV-426',
  },
  {
    question: 'How many decks does the facehugger blood eat through?',
    answers: [
      '4',
      '1',
      '2',
      '3',
    ],
    correctAnswer: '3',
  },
  {
    question: 'Who is the first victim of the adult Alien?',
    answers: [
      'Lambert',
      'Kane',
      'Brett',
      'Parker',
    ],
    correctAnswer: 'Brett',
  },
  {
    question: 'Who is the last victim of the Alien?',
    answers: [
      'Lambert',
      'Kane',
      'Brett',
      'Parker',
    ],
    correctAnswer: 'Lambert',
  },
  {
    question: 'What is the name of the cat?',
    answers: [
      'Mittens',
      'Jinks',
      'Jones',
      'Carson',
    ],
    correctAnswer: 'Jones',
  },
  {
    question: 'What is the name of the crew member that turns out to be an android?',
    answers: [
      'Ripley',
      'Dallas',
      'Kane',
      'Ash',
    ],
    correctAnswer: 'Ash',
  },
  {
    question: 'What song does Ripley sing as she kills the Alien?',
    answers: [
      'Twinkle, Twinkle Little Star',
      'You Are My Lucky Star',
      'Shooting Star',
      'A Sky Full of Stars',
    ],
    correctAnswer: 'You Are My Lucky Star',
  },
];

let currentQuestion = 0;
let playerScore = 0;

function generateQuestionElement() {
  if (currentQuestion < qData.length) {
    return `<form role="form">
        <fieldset>
          <div class="question" id="questionDiv">
            <h2 id="questiontxt">${qData[currentQuestion].question}</h2>
          </div>
          <label class="answers">
            <input type="radio" name="answer" value="${qData[currentQuestion].answers[0]}">
            ${qData[currentQuestion].answers[0]}
          </label>
          <label class="answers">
            <input type="radio" name="answer" value="${qData[currentQuestion].answers[1]}">
            ${qData[currentQuestion].answers[1]}
          </label>
          <label class="answers">
            <input type="radio" name="answer" value="${qData[currentQuestion].answers[2]}">
            ${qData[currentQuestion].answers[2]}
          </label>
          <label class="answers">
            <input type="radio" name="answer" value="${qData[currentQuestion].answers[3]}">
            ${qData[currentQuestion].answers[3]}
          </label>
          <button type="submit" class="submitButton">Submit</button>
        </fieldset>
      </form>`;
  } else {
    $('.mainBox').html(renderResults());
  }
}

function handleStart() {
  $('.quizStart').on('click', '.startButton', function (event) {
    $('.quizStart').remove();
    $('.mainBox').html(generateQuestionElement());
    updateQuestion();
  });
}

function displayRightFeedback() {
  return `<div class="correct">
    <h1>"You got it right!"</h1>
    <button type="button" class="nextButton">Next</button>
  </div>`;
}

function displayWrongFeedback(rightAns) {
  return `<div class="wrong">
    <h1>"You got it wrong..."</h1>
    The correct answer was ${rightAns}
    <button type="button" class="nextButton">Next</button>
  </div>`;
}

function submitAnswer() {
  $('.mainBox').on('click', '.submitButton', function (event) {
      event.preventDefault();
      const selected = $('input:checked').val();
      const correctAns = `${qData[currentQuestion].correctAnswer}`;
      if (selected === correctAns) {
        $('.mainBox').html(displayRightFeedback());
        playerScore++;
        updateScore();
      } else {
        $('.mainBox').html(displayWrongFeedback(correctAns));
      }
    });
}

function nextQuestion() {
  $('.mainBox').on('click', '.nextButton', function (event) {
    event.preventDefault();
    if (currentQuestion < qData.length) {
      currentQuestion++;
      $('.mainBox').html(generateQuestionElement());
      updateQuestion();
    } else {
      $('.mainBox').html(generateQuestionElement());
    }
  });
}

function updateQuestion() {
  $('.questionNum').text(currentQuestion);
}

function updateScore() {
  $('.score').text(playerScore);
}

function renderResults() {
  return `<div class="results">
    Congratulations! You finished the quiz! Let's see how you did...
        <ul class "results">
          <li>10: Perfect score. You really know your Alien trivia. We should be friends.</li>
          <li>7-9: Pretty good, but you could use a couple more rewatches.</li>
          <li>4-6: Meh. You've only watched the sequel.</li>
          <li>1-3: Ugly. I bet if this was a Star Wars quiz, you'd get them all.</li>
          <li>0: You know you have to press play to get the movie to start, don't you?</li>
        </ul>
        <button type="button" class="reset">Try Again</button>`;
}

function restartQuiz() {
  $('.mainBox').on('click', '.reset', function (event) {
    location.reload();
  });
}

function createQuiz() {
  handleStart();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(createQuiz);
