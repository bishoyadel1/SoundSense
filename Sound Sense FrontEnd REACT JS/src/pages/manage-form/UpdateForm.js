import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateForm = () => {
  let { id } = useParams();
  const auth = getAuthUser();
  const [form, setForm] = useState({
    name: "",
    question: "",
    audiofile: null,
    choice1: "",
    choice2: "",
    choice3: "",
    answer: "",
    err: "",
    loading: false,
    reload: false,
    success: null,
  });
  const audiofile = useRef(null);

  const UpdateForm = (e) => {
    e.preventDefault();

    setForm({ ...form, loading: true });

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("question", form.question);
    formData.append("choice1", form.choice1);
    formData.append("choice2", form.choice2);
    formData.append("choice3", form.choice3);
    formData.append("answer", form.answer);
    if (audiofile.current.files && audiofile.current.files[0]) {
      formData.append("audiofile", audiofile.current.files[0]);
    }
    axios
      .put("http://localhost:4000/forms/" + id, formData, {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setForm({
          ...form,
          loading: false,
          success: "form updated successfully !",
          reload: form.reload + 1,
        });
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

  useEffect(() => {
    axios
      .get("http://localhost:4000/forms/" + id)
      .then((resp) => {
        setForm({
          ...form,
          name: resp.data.name,
          choice1: resp.data.choice1,
          choice2: resp.data.choice2,
          choice3: resp.data.choice3,
          question: resp.data.question,
          audiofile: resp.data.audiofile,
          answer: resp.data.answer,
        });
      })
      .catch((err) => {
        setForm({
          ...form,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  }, [form.reload]);

  return (
    <div className="login-container">
      <h1>Update form Form</h1>

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

      <Form onSubmit={UpdateForm} className="text-center py-2">
        <audio controls class="embed-responsive-item">
          <source src={form.audiofile} />
        </audio>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="form Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <textarea
            className="form-control"
            placeholder="question"
            value={form.question}
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
          <textarea
            className="form-control"
            placeholder="answer"
            value={form.answer}
            onChange={(e) => setForm({ ...form, answer: e.target.value })}
            rows={1}
          ></textarea>
        </Form.Group>

        <Form.Group className="mb-3">
          <input type="file" className="form-control" ref={audiofile} />
        </Form.Group>

        <Button
          className="btn btn-primary w-100"
          variant="primary"
          type="submit"
        >
          Update form
        </Button>
      </Form>
    </div>
  );
};

export default UpdateForm;
