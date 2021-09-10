import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

const Login = () => {
  let history = useHistory()
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user,setUser] =useState({})
 useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        config
      );
      setUser(data)

     localStorage.setItem("authToken", data.token);
     history.push("/");
    } catch (error) {
      
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  
  return (
    <div className="login-screen">
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        Tenant Log-in
      </Header>
      {error && <span className="error-message">{error}</span>}
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' type="email"
            required
            id="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
             />
             <label htmlFor="password">
            Password:{" "}
            <Link to="/forgotpassword" className="login-screen__forgotpassword">
              Forgot Password?
            </Link>
          </label>
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />

          <Button onClick={loginHandler}>Login</Button>
        </Segment>
      </Form>
      <Message>
        Don't have an account? <Link to="/register">Register</Link>
      </Message>
    </Grid.Column>
  </Grid>
       
    </div>
  );
}

export default Login





