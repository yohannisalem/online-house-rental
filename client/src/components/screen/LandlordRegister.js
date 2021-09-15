import React,{useState} from 'react'
import { Link,Redirect,useHistory} from "react-router-dom";
import { Button,Form,Grid,Segment,Header, Container} from 'semantic-ui-react'
import axios from 'axios';
const LandlordRegister = () => {
    let history = useHistory()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
        "http://localhost:5000/api/auth/landlordRegister",
        {
          username,
          phone,
          email,
          password
        },
        config
      );
     localStorage.setItem("landlordToken",data.token)
      history.push("/listproperty")
      
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
    return (
        <div style={{backgroundColor:"#edeff2"}}>
          <Container>
          <Grid>
    <Grid.Column width={7}>
    <Segment
        textAlign='center'
        style={{
          minHeight: 640,
          backgroundImage: "url(/des2.jpg)",
          height: "80vh"
        }}
      >
        <Header
          as='h1'
          content='Need a house near your workplace'
          style={{
            fontSize: '4em',
            fontFamily: "NunitoSans, Helvetica, sans-serif",
            fontWeight: 'bold',
            marginBottom: 0,
            marginTop: '3em',
            color: "white"
          }}
        />
      </Segment>
    </Grid.Column>
    <Grid.Column width={9}>
      <Header content='Create account'/>
    {error && <span className="error-message">{error}</span>}
      <Form>
      <Form.Group widths={2}>
      <Form.Input label='First name' placeholder='First name' />
      <Form.Input label='Last name' placeholder='Last name' />
    </Form.Group>
        <Form.Field>
          <label>User name</label>
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
          <label>Phone</label>
          <input
            type="text"
            required
            id="phone"
            placeholder="Enter phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
    <span className="register-screen__subtext">
          Already have an account? <Link to="/landlordLogin">Login</Link>
    </span>
    </Grid.Column>
   
       
  </Grid>
           </Container>  
        </div>
    )
}

export default LandlordRegister
