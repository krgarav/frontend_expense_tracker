import { Fragment, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import classes from "./auth.module.css";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(true);
  const enteredEmail = useRef();
  const enteredName = useRef();
  const enteredPassword = useRef();
  const stateHandler = () => {
    if (state) {
      enteredEmail.current.value = "";
      enteredPassword.current.value = "";
    } else {
      enteredName.current.value = "";
      enteredEmail.current.value = "";
      enteredPassword.current.value = "";
    }
    setState((prev) => {
      return !prev;
    });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (state) {
      const Email = enteredEmail.current.value;
      const Password = enteredPassword.current.value;
      const loginObj = {
        email: Email,
        password: Password,
      };
      const postLoginData = async () => {
        try {
          const response = await fetch("http://43.205.148.73:3000/user/login", {
            method: "POST",
            body: JSON.stringify(loginObj),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          if (data.error) {
            throw new Error(data.error);
          } else {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userStatus", data.ispremiumuser);
            alert(data.data);
            navigate("/expenses", { replace: true });
          }
        } catch (err) {
          alert(err.message);
        }
      };
      postLoginData();
    } else {
      const Name = enteredName.current.value;
      const Email = enteredEmail.current.value;
      const Password = enteredPassword.current.value;
      const obj = {
        name: Name,
        email: Email,
        password: Password,
      };
      const postSignupData = async () => {
        try {
          const response = await fetch("http://43.205.148.73:3000/user/signup", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          if (data.error) {
            throw new Error(data.error);
          } else {
            alert("Successfully Signed up");
          }
        } catch (err) {
          alert(err.message);
        }
      };
      postSignupData();
    }
  };
  const forgotPageHandler = () => {
    navigate("/forgotpassword");
  };
  return (
    <Fragment>
      <div className={classes.parent}>
        <div className={classes.childBox}>
          <div className={classes.formBox}>
            <h3>{state ? "Login" : "Signup"}</h3>
            <Form onSubmit={submitHandler}>
              {!state && (
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    ref={enteredName}
                    required
                  />
                </Form.Group>
              )}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  ref={enteredEmail}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={enteredPassword}
                  required
                />
              </Form.Group>
              {state && (
                <p className={classes.forgot} onClick={forgotPageHandler}>
                  Forgot Password ?
                </p>
              )}
              <button className={classes.submitButton} type="submit">
                {state ? "Login" : "Sign up"}
              </button>
            </Form>
          </div>
          <div className={classes.toggler}>
            <p  onClick={stateHandler}>
              {state ? "New - User Signup ?" : "Existing user - Login"}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Auth;
