import React, { useEffect, useState } from "react";
import Onboard from "./Onboard";
import Question from "./Question";

const Quiz = function Quiz() {
  const [quizActive, setQuizActive] = useState(false);
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
        for (var i = 0; i < n; i++) {
          randomQuestions.push(newData[randomNumber(newData.length)]);
        }
        console.log(randomQuestions);
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
    buildQuestions(regiune);
  }
  function completeQuiz() {
    quizActive(false);
    setQuizCompleted(true);
  }

  function nextQuestion() {
    console.log(questionIndex);
    setQuizQuestion(quizList[questionIndex + 1]);
    setQuestionIndex(questionIndex + 1);
  }

  function Police() {
    if (!quizActive) return <Onboard startQuiz={startQuiz} />;
    if (quizActive == true && quizCompleted == false) {
      return (
        <Question quizQuestion={quizQuestion} nextQuestion={nextQuestion} />
      );
    }
    if (quizCompleted) {
      return <p>You are all done!</p>;
    }
  }

  return (
    <div className="quizContainer">
      <div>{Police()}</div>
    </div>
  );
};
export default Quiz;
