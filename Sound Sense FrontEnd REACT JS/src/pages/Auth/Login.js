import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "../../css/Login.css";
import axios from "axios";
import { setAuthUser } from "../../helper/Storage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
    loading: false,
    err: [],
  });

  const LoginFun = (e) => {
    e.preventDefault();
    setLogin({ ...login, loading: true, err: [] });
    axios
      .post("http://localhost:4000/auth/login", {
        email: login.email,
        password: login.password,
      })
      .then((resp) => {
        setLogin({ ...login, loading: false, err: [] });
        setAuthUser(resp.data);
        navigate("/");
      })
      .catch((errors) => {
        setLogin({
          ...login,
          loading: false,
          err: errors.response.data.errors,
        });
      });
  };
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            {login.err.map((error, index) => (
              <Alert key={index} variant="danger" className="p-2">
                {error.msg}
              </Alert>
            ))}

            <Form onSubmit={LoginFun}>
              {/* Email input */}
              <div className="form-outline mb-4">
                <Form.Group>
                  <Form.Control
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    required
                    value={login.email}
                    onChange={(e) =>
                      setLogin({ ...login, email: e.target.value })
                    }
                  />
                </Form.Group>

                <label className="form-label" htmlFor="form1Example13">
                  Email address
                </label>
              </div>
              {/* Password input */}
              <div className="form-outline mb-4">
                <Form.Group>
                  <Form.Control
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    required
                    value={login.password}
                    onChange={(e) =>
                      setLogin({ ...login, password: e.target.value })
                    }
                  />
                </Form.Group>

                <label className="form-label" htmlFor="form1Example23">
                  Password
                </label>
              </div>
              <div className="d-flex justify-content-around align-items-center mb-4"></div>
              {/* Submit button */}
              <Button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                disabled={login.loading === true}
              >
                Login
              </Button>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>
              <a
                className="btn btn-primary btn-lg btn-block"
                style={{ backgroundColor: "#3b5998" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-facebook-f me-2" />
                Continue with Facebook
              </a>
              <br /> <br />
              <a
                className="btn btn-primary btn-lg btn-block"
                style={{ backgroundColor: "#3b5998" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-twitter me-2" />
                Continue with Twitter
              </a>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
