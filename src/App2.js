import { useState } from "react";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "London", "Paris", "Madrid"],
    correctOption: 2,
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Shakespeare", "Hemingway", "Twain", "Austen"],
    correctOption: 0,
  },
  {
    question: "Which programming language is used for React?",
    options: ["Python", "Java", "JavaScript", "C#"],
    correctOption: 2,
  },
  {
    question: "Which country won the FIFA World Cup in 2018?",
    options: ["Brazil", "Germany", "France", "Argentina"],
    correctOption: 2,
  },
  {
    question: "When did World War II end?",
    options: ["1942", "1945", "1939", "1950"],
    correctOption: 1,
  },
];

export default function App() {
  return (
    <>
      <QuestionsBox />
    </>
  );
}

function QuestionsBox() {
  const [curQuestionIndex, setCurQuestionIndex] = useState(0);
  const currentQuestion = questions[curQuestionIndex];
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isAnswer, setIsAnswer] = useState(false);
  const [correctLength, setCorrectLength] = useState(0);

  function handleQuestion() {
    if (isCorrect !== null) setCurQuestionIndex(curQuestionIndex + 1);
    setSelectedAnswer(null);
    setIsAnswer(false);

    if (curQuestionIndex === questions.length) {
      setCurQuestionIndex(0);
      setCorrectLength(0);
    }
  }

  function handleAnswer(index) {
    setSelectedAnswer(index);
    setIsAnswer(true);
    if (index === currentQuestion.correctOption) {
      setIsCorrect(true);
      setCorrectLength(correctLength + 1);
    } else {
      setIsCorrect(false);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="box">
            <Header />

            {curQuestionIndex !== questions.length ? (
              <Question
                quesObj={currentQuestion}
                curQuestionIndex={curQuestionIndex}
                handleAnswer={handleAnswer}
                isCorrect={isCorrect}
                selectedAnswer={selectedAnswer}
                isAnswer={isAnswer}
              />
            ) : (
              <Result correctLength={correctLength} />
            )}

            {curQuestionIndex !== questions.length ? (
              <Button onClick={handleQuestion}> Next </Button>
            ) : (
              <Button onClick={handleQuestion}> Restart </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div>
      <h2 className="title">Quiz App</h2>
      <hr />
    </div>
  );
}

function Question({
  quesObj,
  curQuestionIndex,
  handleAnswer,
  isCorrect,
  selectedAnswer,
  isAnswer,
}) {
  return (
    <div>
      <p className="quiz">
        {curQuestionIndex + 1}. {quesObj.question}
      </p>

      <ul>
        {quesObj.options.map((option, index) => (
          <li
            key={index}
            onClick={() => !isAnswer && handleAnswer(index)}
            className={
              selectedAnswer === index ? (isCorrect ? "green" : "red") : ""
            }
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Result({ correctLength }) {
  return (
    <div>
      <h5>You got {correctLength} out of 5 correct. Well done! 🎉</h5>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <div>
      <button onClick={onClick}>{children}</button>
    </div>
  );
}
