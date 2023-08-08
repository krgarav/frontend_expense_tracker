import axios from "axios";
import { Fragment, useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  const mailRef = useRef();
  const navigate = useNavigate();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredMail = mailRef.current.value;
    const sendRequest = async () => {
      try {
        const response = await axios.post(
          "http://43.205.148.73:3000/password/forgotpassword",
          {
            mail: enteredMail,
          }
        );

        if (response.status === 200) {
          alert("Reset password link sent to your mail successfully");
          navigate("/", { replace: true });
        }
      } catch (err) {
        alert("Something went wrong");
        console.log(err);
      }
    };
    sendRequest();
  };

  return (
    <Fragment>
      <Container>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              ref={mailRef}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </Fragment>
  );
};

export default ForgotPassword;
