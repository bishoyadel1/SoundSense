import React, { useState, useEffect } from "react";

import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const Person = () => {
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
      .get("http://localhost:4000/user/" + auth.id)
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
    <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-6 mb-4 mb-lg-0">
            <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
              <div className="row g-0">
                <div
                  className="col-md-4 gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar"
                    className="img-fluid my-5"
                    style={{ width: "80px" }}
                  />

                  <i className="far fa-edit mb-5" />
                </div>

                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6>
                      !Welcome
                      <p className="text-muted">
                        {Forms.results.map((scores) => (
                          <h1>{scores.name}</h1>
                        ))}
                      </p>
                    </h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-12 mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">
                          {" "}
                          {Forms.results.map((scores) => (
                            <h1>{scores.email}</h1>
                          ))}
                        </p>
                      </div>
                    </div>
                    <h6>Projects</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Phone</h6>
                        {Forms.results.map((scores) => (
                          <p className="text-muted"> {scores.phone}</p>
                        ))}
                      </div>
                      <div className="col-6 mb-3">
                        <a href="profile/update">
                          <i className="fab fa-facebook-f fa-lg me-3" />
                          Update Profile
                        </a>
                      </div>
                    </div>
                    <div className="d-flex justify-content-start">
                      <a href="#!">
                        <i className="fab fa-facebook-f fa-lg me-3" />
                      </a>
                      <a href="#!">
                        <i className="fab fa-twitter fa-lg me-3" />
                      </a>
                      <a href="#!">
                        <i className="fab fa-instagram fa-lg" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Person;
