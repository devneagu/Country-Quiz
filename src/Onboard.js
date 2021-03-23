import React, { useEffect, useState } from "react";

const Onboard = function Onboard({ startQuiz }) {
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
        e.stopPropagation();
        e.preventDefault();
        startQuiz(elementSelected);
      }}
    >
      <p>To begin the quiz please select the following level:</p>
      {region.map((item) => (
        <div key={item.id}>
          <input
            type="radio"
            id={item.name}
            name="region"
            value={item.name}
            onChange={(e) => setElementSelected(e.target.value)}
          />
          <label htmlFor={item.name}>{item.name}</label>
        </div>
      ))}
      <button>Let's play!</button>
    </form>
  );
};
export default Onboard;
