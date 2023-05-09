import React, { useState, useEffect } from "react";
import FormCard from "../../components/FormCard";
// import Form from "react-bootstrap/Form";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
// import Alert from "react-bootstrap/Alert";

const Home = () => {
  const [questionx, setquestion] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setquestion({ ...questionx, loading: true });
    axios
      .get("http://localhost:4000/forms")
      .then((res) => {
        const questions = res.data.map((question) => {
          const choicesArray = [
            question.choice1,
            question.choice2,
            question.choice3,
          ];
          return {
            id: question.id,
            audiofile: question.audiofile,
            question: question.question,
            choices: choicesArray,
            answer: question.answer,
          };
        });
        setquestion({
          ...questionx,
          results: questions,
          loading: false,
          err: false,
        });
      })
      .catch((err) => {
        setquestion({ ...questionx, loading: false, err: "eror!" });
      });
  }, [questionx.reload]);

  return (
    <div>
      {questionx.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {questionx.results.length > 0 && (
        <FormCard questions={questionx.results} />
      )}
    </div>
  );
};
export default Home;
