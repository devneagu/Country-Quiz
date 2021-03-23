import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";

const Quote = function Quote({ getRandomQuote }) {
  const [quoteList, setQuoteList] = useState([]);
  const [listType, setListType] = useState("quote");
  const [screenshotId, setScreenshotId] = useState("");

  if (quoteList.length == 0) {
    let randomPage = parseInt(Math.random(Math.random()) * 70000);
    fetch(
      "https://quote-garden.herokuapp.com/api/v3/quotes?page=" +
        String(randomPage) +
        "&limit=1"
    )
      .then((response) => response.json())
      .then((data) => {
        setQuoteList(data.data);
        setListType("quote");
      });
  }
  function getRandomQuote() {
    let randomPage = parseInt(Math.random(Math.random()) * 7000);
    fetch(
      "https://quote-garden.herokuapp.com/api/v3/quotes?page=" +
        String(randomPage) +
        "&limit=1"
    )
      .then((response) => response.json())
      .then((data) => {
        setQuoteList(data.data);
        setListType("quote");
      });
  }

  function goToAuthor() {
    let randomPage = parseInt(Math.random(Math.random()) * 7000);
    fetch(
      "https://quote-garden.herokuapp.com/api/v3/quotes?author=" +
        quoteList[0].quoteAuthor
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setQuoteList(data.data);
        setListType("author");
      });
  }
  useEffect(() => {
    console.log("hi");
    if (listType == "author") {
      if (!document.body.classList.contains("dark"))
        document.getElementsByTagName("body")[0].classList.add("dark");
    } else {
      if (document.body.classList.contains("dark"))
        document.getElementsByTagName("body")[0].classList.remove("dark");
    }
  }, [listType]);

  useEffect(() => {
    if (screenshotId != "") captureElement(screenshotId);
  }, [screenshotId]);

  function captureElement(id) {
    html2canvas(document.querySelector(".a" + id + " .elementScreenshot")).then(
      (canvasElm) => {
        var imageType = "image/jpeg";
        var imageData = canvasElm.toDataURL(imageType);
        var anchor = document.createElement("a");
        anchor.setAttribute("class", "hidden");
        anchor.setAttribute("download", "a" + id + ".png");
        anchor.setAttribute("href", imageData);
        anchor.click();
      }
    );
  }

  return (
    <div>
      <div className="randomHeader">
        <div className="flex" onClick={() => getRandomQuote()}>
          <div className="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 26 26"
            >
              <path d="M13.5 2c-5.288 0-9.649 3.914-10.377 9h-3.123l4 5.917 4-5.917h-2.847c.711-3.972 4.174-7 8.347-7 4.687 0 8.5 3.813 8.5 8.5s-3.813 8.5-8.5 8.5c-3.015 0-5.662-1.583-7.171-3.957l-1.2 1.775c1.916 2.536 4.948 4.182 8.371 4.182 5.797 0 10.5-4.702 10.5-10.5s-4.703-10.5-10.5-10.5z" />
            </svg>
          </div>
          <div className="flex-1">random</div>
        </div>
      </div>
      <div className="text-center mb-5">
        {quoteList.length > 0 ? (
          quoteList.map((item) => (
            <div key={item._id} className={`a${item._id}`}>
              <div className="elementScreenshot">
                <p className="quoteText">{item.quoteText}</p>
                <div
                  onClick={() => goToAuthor()}
                  className="authorContainer mx-auto"
                >
                  <h4>{item.quoteAuthor}</h4>
                  <h6>{item.quoteGenre}</h6>
                </div>
              </div>
              <p
                className="svgDownload"
                onClick={() => setScreenshotId(item._id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-download"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </p>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};
export default Quote;
