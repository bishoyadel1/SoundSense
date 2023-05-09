import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";

const AddForm = () => {
  const auth = getAuthUser();
  const [form, setForm] = useState({
    name: "",
    question: "",
    choice1: "",
    choice2: "",
    choice3: "",
    answer: "",
    err: "",
    loading: false,
    success: null,
  });

  const adiuo = useRef(null);

  const createForm = (e) => {
    e.preventDefault();

    setForm({ ...form, loading: true });

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("question", form.question);
    formData.append("answer", form.answer);
    formData.append("choice1", form.choice1);
    formData.append("choice2", form.choice2);
    formData.append("choice3", form.choice3);
    if (adiuo.current.files && adiuo.current.files[0]) {
      formData.append("audiofile", adiuo.current.files[0]);
    }
    axios
      .post("http://localhost:4000/forms", formData, {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setForm({
          name: "",
          question: "",
          choice1: "",
          choice2: "",
          choice3: "",
          answer: "",
          err: null,
          loading: false,
          success: "form Created Successfully !",
        });
        adiuo.current.value = null;
      })
      .catch((err) => {
        setForm({
          ...form,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  };

  return (
    <div className="login-container">
      <h1>Add New form Form</h1>

      {form.err && (
        <Alert variant="danger" className="p-2">
          {form.err}
        </Alert>
      )}

      {form.success && (
        <Alert variant="success" className="p-2">
          {form.success}
        </Alert>
      )}

      <Form onSubmit={createForm}>
        <Form.Group className="mb-3">
          <Form.Control
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            type="text"
            required
            placeholder="form Name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <textarea
            className="form-control"
            placeholder="question"
            value={form.question}
            required
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            rows={5}
          ></textarea>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            value={form.choice1}
            onChange={(e) => setForm({ ...form, choice1: e.target.value })}
            type="text"
            required
            placeholder="choice1"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            value={form.choice2}
            onChange={(e) => setForm({ ...form, choice2: e.target.value })}
            type="text"
            required
            placeholder="choice2"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            value={form.choice3}
            onChange={(e) => setForm({ ...form, choice3: e.target.value })}
            type="text"
            required
            placeholder="choice3"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            value={form.answer}
            type="text"
            placeholder="answer"
            required
            onChange={(e) => setForm({ ...form, answer: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <input type="file" className="form-control" ref={adiuo} required />
        </Form.Group>

        <Button
          className="btn btn-primary w-100"
          variant="primary"
          type="submit"
        >
          Add New form
        </Button>
      </Form>
    </div>
  );
};

export default AddForm;
