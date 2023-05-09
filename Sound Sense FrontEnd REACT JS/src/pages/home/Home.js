import React from "react";
import { getAuthUser } from "../../helper/Storage";
const auth = getAuthUser();
const Home = () => {
  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-12 col-xl-4">
            <div className="card" style={{ borderRadius: "15px" }}>
              <div className="card-body text-center">
                <div className="mt-3 mb-4"></div>
                <h4 className="mb-2">Eary System</h4>
                <p className="text-muted mb-4">
                  @From <span className="mx-2">|</span>{" "}
                  <a href="#!">Eary.com</a>
                </p>
                <p>We are working to assess people's hearing problem</p>

                <div className="mb-4 pb-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-floating"
                  >
                    <i className="fab fa-facebook-f fa-lg" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-floating"
                  >
                    <i className="fab fa-twitter fa-lg" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-floating"
                  >
                    <i className="fab fa-skype fa-lg" />
                  </button>
                </div>
                {auth && (
                  <>
                    <a
                      href="/Exam/score"
                      class="btn btn-primary btn-rounded btn-lg"
                    >
                      Find out your score
                    </a>
                    <p></p>
                    <a href="/Exam" class="btn btn-primary btn-rounded btn-lg">
                      To enter the exam
                    </a>
                  </>
                )}
                {!auth && (
                  <>
                    <a href="/login" class="btn btn-primary btn-rounded btn-lg">
                      Login
                    </a>
                    <p></p>
                    <a
                      href="/register"
                      class="btn btn-primary btn-rounded btn-lg"
                    >
                      Register
                    </a>
                  </>
                )}
                <div className="d-flex justify-content-between text-center mt-5 mb-2">
                  <div>
                    <p className="mb-2 h5">8471</p>
                    <p className="text-muted mb-0">Wallets Balance</p>
                  </div>
                  <div className="px-3">
                    <p className="mb-2 h5">8512</p>
                    <p className="text-muted mb-0">Income amounts</p>
                  </div>
                  <div>
                    <p className="mb-2 h5">4751</p>
                    <p className="text-muted mb-0">Total Transactions</p>
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
export default Home;
