import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Button, Divider, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
const AdminLogin = () => {
    let history = useHistory()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [user, setUser] = useState({})
  
    const loginHandler = async (e) => {
      e.preventDefault();
  
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
  
      try {
        const { data } = await axios.post(
          "http://localhost:5000/admin/login",
          { email, password },
          config
        );
        setUser(data)
  
        localStorage.setItem("adminToken", data.token);
        history.goBack();
      } catch (error) {
  
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    return (
        <div style={{ minHeight: "99vh", backgroundImage:"url(/admin.jpeg)"}}>
      <Grid textAlign="center" verticalAlign='middle' style={{ paddingTop: "70px" }}>
        <Grid.Column width={4} style={{ padding: "0px" }}>
          <Segment
            textAlign='center'
            style={{
              height: "65vh",
              backgroundImage: "url(/lff.jpeg)"
            }}
          >
          </Segment>
        </Grid.Column>

        <Grid.Column width={4} style={{ padding: "0px" }}>
          <Segment
            stacked style={{ backgroundColor: "lightGray", height: "65vh" }}
            
          >

            <Header as='h2' color='teal' textAlign='center'>
              Tenant Log-in
            </Header>
            {error && <span className="error-message">{error}</span>}
            <Form size='large' style={{verticalAlign:"center"}}>

              <Form.Input fluid icon='user' iconPosition='left' type="email"
                required
                id="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                tabIndex={1}
              />

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
              <label htmlFor="password">
                Password:{" "}
                <Link to="/forgotpassword">
                  Forgot Password?
                </Link>
              </label>
              <Divider hidden/>
              <Button onClick={loginHandler}>Login</Button>

            </Form>
            <Message>
              Don't have an account? <Link to="/register">Register</Link>
            </Message>
          </Segment>
        </Grid.Column>

      </Grid>



    </div>
    )
}

export default AdminLogin
