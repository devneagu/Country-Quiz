import React, { useEffect, useState } from "react";
import Onboard from "./Onboard";
import Question from "./Question";

const Quiz = function Quiz() {
  const [quizActive, setQuizActive] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const [quizList, setQuizList] = useState([]);
  const [quizQuestion, setQuizQuestion] = useState({});

  const [questionIndex, setQuestionIndex] = useState(0);

  function shuffleFisherYates(array) {
    let i = array.length;
    while (i--) {
      const ri = Math.floor(Math.random() * (i + 1));
      [array[i], array[ri]] = [array[ri], array[i]];
    }
    return array;
  }
  function randomNumber(maxim) {
    function getRandom() {
      return parseInt(Math.random(Math.random()) * maxim);
    }
    return getRandom();
  }
  function uniqueRandomArray(arrayLength, datasetLength) {
    var arr = [];
    while (arr.length < arrayLength) {
      var r = Math.floor(Math.random() * datasetLength) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  }
  function buildQuestions(region) {
    fetch("https://restcountries.eu/rest/v2/region/" + region)
      .then((response) => response.json())
      .then((data) => {
        let newData = data.map((item) => {
          return {
            id: "qz" + String(parseInt(Math.random(Math.random()) * 100000)),
            country: item.name,
            capital: item.capital,
          };
        });
        let countries = data.map((item) => {
          return item.country;
        });
        newData = newData.map((item) => {
          return {
            ...item,
            questionType: "text", //text or image
            question: item.capital + " is the capital of ",
            answerlist: [],
            correctAnswer: [
              { id: "qz" + String(randomNumber(100000)), name: item.country },
            ],
          };
        });
        newData = newData.map((item) => {
          let arrayRandom = [];
          for (var i = 0; i < 3; i++) {
            let thisRandomNumber = randomNumber(newData.length);
            arrayRandom.push({
              id: "qz" + String(randomNumber(100000)),
              name: newData[thisRandomNumber].country,
            });
          }

          arrayRandom.push({
            id: item.correctAnswer[0].id,
            name: item.correctAnswer[0].name,
          });

          return {
            ...item,
            answerlist: arrayRandom,
          };
        });
        newData = newData.map((item) => {
          return {
            ...item,
            answerlist: shuffleFisherYates(item.answerlist),
          };
        });

        var randomQuestions = [];
        var n = 10;
        let uniqueArray = uniqueRandomArray(n, newData.length - 1);
        for (var i = 0; i < n; i++) {
          randomQuestions.push(newData[uniqueArray[i]]);
        }
        setQuizQuestion(randomQuestions[0]);
        setQuizList(randomQuestions);
      })
      .then(() => {
        setQuestionIndex(0);
        setQuizActive(true);
        setQuizCompleted(false);
      });
  }
  function startQuiz(regiune) {
    setScore(0);
    buildQuestions(regiune);
  }
  function completeQuiz() {
    setQuizActive(false);
    setQuizCompleted(true);
  }

  function nextQuestion() {
    if (quizList.length - 1 != questionIndex) {
      setQuizQuestion(quizList[questionIndex + 1]);
      setQuestionIndex(questionIndex + 1);
    } else {
      completeQuiz();
    }
  }

  function addScore() {
    setScore(score + 1);
  }
  function Police() {
    if (!quizActive && quizCompleted == false)
      return <Onboard startQuiz={startQuiz} />;
    if (quizActive == true && quizCompleted == false) {
      return (
        <Question
          quizQuestion={quizQuestion}
          nextQuestion={nextQuestion}
          addScore={addScore}
        />
      );
    }
    if (quizCompleted) {
      return (
        <div>
          <h1>Results</h1>
          <p>You got {score} correct answers.</p>
          <div className="quizFooter">
            <button
              className="startButton"
              onClick={() => {
                setQuizCompleted(false);
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="quizContainer">
      <div>{Police()}</div>
    </div>
  );
};
export default Quiz;
