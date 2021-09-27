import axios from "axios";
import React, { useState } from 'react';
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
        
  
        localStorage.setItem("adminToken", data.token);
        history.push('/admin');
      } catch (error) {
         console.log(error)
        
      }
    };
    return (
        <div style={{ minHeight: "99vh", backgroundImage:"url(/admin.jpeg)",backgroundSize: "cover",backgroundRepeat:"no-repeat"}}>
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
             Admin Login
            </Header>
            {error && <span className="error-message">{error}</span>}
            <Form size='large' style={{verticalAlign:"center"}}>

              <Form.Input fluid icon='user' iconPosition='left' type="email"
                required
                id="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                tabIndex={1}
              />

              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                type="password"
                required
                id="password"
                name="password"
                autoComplete="true"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              
                tabIndex={2}
              />
              
              <Divider hidden/>
              <Button onClick={loginHandler}>Login</Button>

            </Form>
            
          </Segment>
        </Grid.Column>

      </Grid>



    </div>
    )
}

export default AdminLogin
