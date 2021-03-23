import React, { useEffect, useState } from "react";

const Onboard = function Onboard({ startQuiz }) {
  const [disableQuestion, setDisableQuestion] = useState(false);

  const [elementSelected, setElementSelected] = useState("");
  const region = [
    { id: 1, name: "Africa" },
    { id: 2, name: "Americas" },
    { id: 3, name: "Asia" },
    { id: 4, name: "Europe" },
    { id: 5, name: "Oceania" },
  ];
  return (
    <form
      className=""
      onSubmit={(e) => {
        console.log("Submit");
        e.stopPropagation();
        e.preventDefault();
        setDisableQuestion(true);
        startQuiz(elementSelected);
      }}
    >
      <p className="questionQuiz">
        To begin the quiz please select the following level:
      </p>
      {region.map((item) => (
        <div
          className={`quizAnswer ${item.name}   ${
            elementSelected == item.name ? "selected" : ""
          }  `}
          key={item.name}
          onClick={() => {
            setElementSelected(item.name);
          }}
        >
          <input type="radio" id={item.name} name="region" />
          <label htmlFor={item.name}>{item.name}</label>
        </div>
      ))}
      <div className="quizFooter">
        <button className={`startButton`}>Start Quiz</button>
      </div>
    </form>
  );
};
export default Onboard;
