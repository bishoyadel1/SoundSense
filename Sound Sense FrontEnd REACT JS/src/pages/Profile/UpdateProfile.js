import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
  let { id } = useParams();
  const auth = getAuthUser();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    loading: false,
    err: null,
    success: null,
    reload: false,
    success: null,
  });

  const UpdateUser = (e) => {
    e.preventDefault();
    setUser({ ...user, loading: true });

    axios
      .put(
        "http://localhost:4000/user/" + auth.id,
        {
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
        {
          headers: {
            token: auth.token,
          },
        }
      )
      .then((resp) => {
        setUser({
          ...user,
          loading: false,
          err: null,
          success: "User Updated Successfully",
          reload: user.reload + 1,
        });
      })
      .catch((errors) => {
        setUser({
          ...user,
          loading: false,
          err: "Something went wrong",
          success: null,
        });
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/user/" + auth.id)
      .then((resp) => {
        setUser({
          ...user,
          name: resp.data.name,
          email: resp.data.email,
          phone: resp.data.phone,
        });
      })
      .catch((errors) => {
        setUser({
          ...user,
          loading: false,
          err: "Something went wrong",
          success: null,
        });
      });
  }, [user.reload]);

  return (
    <div className="login-container">
      <h1>Update Profile</h1>

      {user.err && (
        <Alert variant="danger" className="p-2">
          {user.err}
        </Alert>
      )}

      {user.success && (
        <Alert variant="success" className="p-2">
          {user.success}
        </Alert>
      )}
      <Form onSubmit={UpdateUser}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Your Name"
            required
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            required
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Phone Number"
            required
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
        </Form.Group>

        <Button
          className="btn btn-primary w-100"
          variant="primary"
          type="submit"
        >
          Update
        </Button>
      </Form>
    </div>
  );
};

export default UpdateUser;
