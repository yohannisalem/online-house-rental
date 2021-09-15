import React,{useState} from 'react'
import axios from "axios";
import { Link,Redirect,useHistory} from "react-router-dom";
import { Button,Form,Grid,Segment} from 'semantic-ui-react'

const Register = () => {
  let history = useHistory()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register", { username, email, password,},
        config
      );
      localStorage.setItem("authToken",data.token)
      history.push("/")
      
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div style={{height:"100vh",backgroundColor:"#edeff2"}}>
      <Grid textAlign="center" verticalAlign='middle' style={{ paddingTop: "70px" }}>
          <Grid.Column width={8} style={{ padding: "0px" }}>
          {error && <span className="error-message">{error}</span>}
          <span >
          Already have an account? <Link to="/login">Login</Link>
    </span>
    <span>
    Ooops <Link to="/landlordRegister">I'm Landlord</Link>
    </span>
      <Form>
        <Form.Field>
          <label>First Name</label>
          <input
            type="text"
            required
            id="name"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
        <label>email</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
        <label>password</label>
        <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
        <label>confirm password</label>
        <input
            type="password"
            required  
            autoComplete="true"
            placeholder="Confirm password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Field>
        <Button onClick={registerHandler}>Submit</Button>
    </Form>
   
      
          </Grid.Column>
  
          <Grid.Column width={4} style={{ padding: "0px" }}>
          <Segment
              textAlign='center'
              style={{
                height: "65vh",
                backgroundImage: "url(/log.jpeg)"
              }}
            >
            </Segment>
                </Grid.Column>
                
  
        </Grid>
  
      
    </div>
  );
}

export default Register
