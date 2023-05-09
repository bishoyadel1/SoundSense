import React from "react";
import "../../css/about.css";
const AboutUs = () => {
  return (
    <div>
      <link
        href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css"
        rel="stylesheet"
        id="bootstrap-css"
      />
      {/*---- Include the above in your HEAD tag --------*/}
      <link
        href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <div className="about-section paddingTB60 gray-bg">
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-sm-6">
              <div className="about-title clearfix">
                <h1>
                  About <span>Eary</span>
                </h1>
                <h3>Welcome to the About Us page of Eray,</h3>
                <p className="about-paddingB">
                  a cutting-edge system designed to help people with hearing
                  problems. At Eray, we understand the challenges that people
                  with hearing difficulties face in their daily lives. That's
                  why we have created a revolutionary solution that combines the
                  latest technology with advanced research to improve the
                  quality of life for those with hearing impairments. Our system
                  is designed to work seamlessly with the human ear, providing a
                  natural listening experience that enhances your ability to
                  hear and understand speech. Using advanced algorithms and
                  neural networks, Eray is able to filter out background noise
                  and amplify speech sounds, making it easier for you to
                  communicate with those around you. At Eray, we are dedicated
                  to providing the most effective and user-friendly hearing aid
                  technology available. Our team of experts is constantly
                  researching and developing new solutions to improve the
                  quality of life for those with hearing difficulties. We take
                  pride in our commitment to excellence and strive to provide
                  the best possible service to our customers. We understand that
                  each individual's hearing needs are unique. That's why we
                  offer a range of customizable options to ensure that our
                  system is tailored to your specific needs. Whether you need a
                  hearing aid for a mild hearing loss or a more advanced
                  solution for severe hearing impairment, Eray has the perfect
                  solution for you. If you're looking for a reliable and
                  effective solution to your hearing difficulties, look no
                  further than Eray. Our cutting-edge system is designed to help
                  you hear better and live life to the fullest. Contact us today
                  to learn more about our products and services, and start
                  hearing the world around you like never before.
                </p>

                <div className="about-icons">
                  <ul>
                    <li>
                      <a href="https://www.facebook.com/">
                        <i
                          id="social-fb"
                          className="fa fa-facebook-square fa-3x social"
                        />
                      </a>{" "}
                    </li>
                    <li>
                      <a href="https://twitter.com/">
                        <i
                          id="social-tw"
                          className="fa fa-twitter-square fa-3x social"
                        />
                      </a>{" "}
                    </li>
                    <li>
                      {" "}
                      <a href="https://plus.google.com/">
                        <i
                          id="social-gp"
                          className="fa fa-google-plus-square fa-3x social"
                        />
                      </a>{" "}
                    </li>
                    <li>
                      {" "}
                      <a href="mailto:bootsnipp@gmail.com">
                        <i
                          id="social-em"
                          className="fa fa-envelope-square fa-3x social"
                        />
                      </a>{" "}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-5 col-sm-6">
              <div className="about-img">
                <img
                  src="https://devitems.com/preview/appmom/img/mobile/2.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
