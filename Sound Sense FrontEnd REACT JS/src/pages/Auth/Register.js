import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { setAuthUser } from "../../helper/Storage";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    email: "",
    password: "",
    name: "",
    loading: false,
    err: [],
  });

  const RegisterFun = (e) => {
    e.preventDefault();
    setRegister({ ...register, loading: true, err: [] });
    axios
      .post("http://localhost:4000/auth/register", {
        email: register.email,
        password: register.password,
        name: register.name,
      })
      .then((resp) => {
        setRegister({ ...register, loading: false, err: [] });
        setAuthUser(resp.data);
        navigate("/");
      })
      .catch((errors) => {
        setRegister({
          ...register,
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
            {register.err.map((error, index) => (
              <Alert key={index} variant="danger" className="p-2">
                {error.msg}
              </Alert>
            ))}

            <Form onSubmit={RegisterFun}>
              <div className="form-outline mb-4">
                <Form.Group>
                  <Form.Control
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Full Name"
                    required
                    value={register.name}
                    onChange={(e) =>
                      setRegister({ ...register, name: e.target.value })
                    }
                  />
                </Form.Group>

                <label className="form-label" htmlFor="form1Example13">
                  Email address
                </label>
              </div>
              {/* Email input */}
              <div className="form-outline mb-4">
                <Form.Group>
                  <Form.Control
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    required
                    value={register.email}
                    onChange={(e) =>
                      setRegister({ ...register, email: e.target.value })
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
                    value={register.password}
                    onChange={(e) =>
                      setRegister({ ...register, password: e.target.value })
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
                disabled={register.loading === true}
              >
                Register
              </Button>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
