import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "../../css/ManageForm.css";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const ManageForm = () => {
  const auth = getAuthUser();
  const [Forms, setForms] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setForms({ ...Forms, loading: true });
    axios
      .get("http://localhost:4000/exam/" + auth.id)
      .then((resp) => {
        setForms({ ...Forms, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setForms({
          ...Forms,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [Forms.reload]);

  return (
    <div class="card text-center">
      <div class="card-header">Featured</div>
      <div class="card-body">
        <h5 class="card-title">Score history</h5>
        <p class="card-text">
          {" "}
          {Forms.results.map((scores) => (
            <h1>{scores.score}</h1>
          ))}
        </p>
        <a href="/" class="btn btn-primary">
          Go To Home
        </a>
      </div>
      <div class="card-footer text-body-secondary">
        The best score you can achieve is 5
      </div>
    </div>
  );
};

export default ManageForm;
