import React, { useState } from "react";
import axios from "axios";
import { getAuthUser } from "../helper/Storage";
import "../css/MovieCard.css";

const MoviesCard = ({ questions, answer }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const auth = getAuthUser();
  const handleAnswerSelected = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(1 + score);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer("");
    } else {
      if (!scoreSubmitted) {
        // check if score has not been submitted
        // Make Axios POST request to save score to database
        axios
          .post(
            "http://localhost:4000/Exam/",
            { score: score + 1, id: auth.id },
            {
              headers: {
                token: auth.token,
              },
            }
          )
          .then((response) => {
            // Handle response from server if needed
            setScoreSubmitted(true); // update the scoreSubmitted state to true
          })
          .catch((error) => {
            // Handle error if needed
          });
      }
      setShowScore(true);
    }
  };
  console.log(questions[currentQuestion].answer);
  console.log(questions[currentQuestion].choices);
  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-12 col-xl-4">
            <div className="card" style={{ borderRadius: "15px" }}>
              <div className="card-body text-center">
                <div className="mt-3 mb-4"></div>
                {showScore ? (
                  <div>
                    <h1>Your Score: {score}</h1>
                  </div>
                ) : (
                  <div>
                    <audio
                      className="audio-player"
                      src={questions[currentQuestion].audiofile}
                      controls
                    />
                    <h1>{questions[currentQuestion].question} </h1>
                    <form className="col-md-8" onSubmit={handleSubmit}>
                      {questions[currentQuestion].choices.map(
                        (choice, index) => (
                          <div className="col-md-8" key={index}>
                            <input
                              type="radio"
                              id={`Choice ${index}`}
                              name="choice"
                              value={choice}
                              checked={selectedAnswer === choice}
                              onChange={handleAnswerSelected}
                            />
                            <label
                              htmlFor={`Choice ${index}`}
                              className="col-md-8"
                            >
                              {choice}
                            </label>
                          </div>
                        )
                      )}
                      <br></br>
                      <div className="center">
                        <button
                          class="col-md-4 center btn btn-primary btn-rounded btn-lg"
                          type="submit"
                        >
                          Next
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoviesCard;
