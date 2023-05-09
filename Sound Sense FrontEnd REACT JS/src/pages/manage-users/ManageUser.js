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
      .get("http://localhost:4000/user")
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

  const deleteUser = (id) => {
    axios
      .delete("http://localhost:4000/user/" + id, {
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
        <h3 className="text-center ">Manage Users</h3>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>

            <th> Name</th>
            <th> email</th>
            <th>role</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {Forms.results.map((form) => (
            <tr key={form.id}>
              <td>{form.id}</td>
              <td> {form.name} </td>
              <td>{form.email}</td>
              <td>{form.role}</td>
              <td>{form.status}</td>

              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    deleteUser(form.id);
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
