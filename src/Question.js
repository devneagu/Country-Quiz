import React, { useEffect, useState } from "react";

const Question = function Question({ nextQuestion, quizQuestion }) {
  const [disableQuestion, setDisableQuestion] = useState(false);
  const [elementSelected, setElementSelected] = useState("");
  const quiz = quizQuestion;
  const questionQuiz = quizQuestion.question;

  console.log("quiz");
  console.log(quiz);
  useEffect(() => {
    if (disableQuestion) {
      if (quiz.correctAnswer[0].id == elementSelected) {
        document
          .querySelector(".quizAnswer." + quiz.correctAnswer[0].id)
          .classList.add("correct");
      } else {
        document
          .querySelector(".quizAnswer." + quiz.correctAnswer[0].id)
          .classList.add("correct");
        document
          .querySelector(".quizAnswer." + elementSelected)
          .classList.add("wrong");
      }
    }
  }, [disableQuestion]);
  return (
    <form
      key={quiz.id}
      className=""
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();
        //reset
        setDisableQuestion(false);
        setElementSelected("");

        nextQuestion(elementSelected);
      }}
    >
      <p className="questionQuiz">{questionQuiz}</p>
      {quiz.answerlist.map((item) => (
        <div
          className={`quizAnswer ${item.id}   ${
            elementSelected == item.id ? "selected" : ""
          }  `}
          key={item.id}
          onClick={() => {
            if (!disableQuestion) {
              setElementSelected(item.id);
              setDisableQuestion(true);
            }
          }}
        >
          <input
            disabled={disableQuestion}
            type="radio"
            id={item.id}
            name="quiz"
          />
          <label htmlFor={item.id}>{item.name}</label>
        </div>
      ))}
      <button className={`${!disableQuestion ? "hidden" : ""}`}>Next</button>
    </form>
  );
};
export default Question;
