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
      .get("http://localhost:4000/forms")
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

  const deleteForm = (id) => {
    axios
      .delete("http://localhost:4000/forms/" + id, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setForms({ ...Forms, reload: Forms.reload + 1 });
      })
      .catch((err) => {});
  };

  return (
    <div className="manage-Forms p-5">
      <div className=" d-flex justify-content-between mb-5">
        <h3 className="text-center ">Manage Forms</h3>
        <Link to={"add"} className="btn btn-success">
          Add New form +
        </Link>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>audiofile</th>
            <th> Name</th>
            <th> question</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Forms.results.map((form) => (
            <tr key={form.id}>
              <td>{form.id}</td>
              <td>
                <audio>
                  <source src={form.audiofile} alt={form.id}></source>
                </audio>
              </td>
              <td> {form.name} </td>
              <td>{form.question}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    deleteForm(form.id);
                  }}
                >
                  Delete
                </button>
                <Link to={"" + form.id} className="btn btn-sm btn-primary mx-2">
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageForm;
