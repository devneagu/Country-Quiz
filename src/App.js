import React from "react";
import { render } from "react-dom";
import Quiz from "./Quiz";
const App = () => {
  return (
    <div className="container quoteContainerTight mx-auto">
      <Quiz />
    </div>
  );
};

render(<App />, document.getElementById("root"));
