import React,{useState,useEffect} from 'react'
import { Link,useHistory } from 'react-router-dom'
import { Form,Button,Message,Segment,Grid,Header,Image } from 'semantic-ui-react'
import axios from 'axios'
const LandlordLogin = () => {
    let history = useHistory()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [user, setUser] = useState({})

    useEffect(() => {
        /* if (localStorage.getItem("landlordToken")) {
            history.push("/listproperty");
        } */
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
                "http://localhost:5000/api/auth/landlordLogin",
                { email, password },
                config
            );
            setUser(data)

            localStorage.setItem("landlordToken", data.token);
            localStorage.setItem("username", data.username)
            localStorage.setItem("userid", data.id)
            localStorage.setItem("email", data.email)
            history.push("/listproperty");
        } catch (error) {

            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };
    return (
        
        <div style={{ minHeight: "98vh", backgroundColor: "lightgray" }}>
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
            stacked style={{ backgroundColor: "#9fb5d6", height: "65vh" }}
            
          >
                    <Header as='h2' color='teal' textAlign='center'>
                        Landlord Log-in
                    </Header>
                    {error && <span className="error-message">{error}</span>}
                    <Form size='large'>
                       
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
                        
                    </Form>
                    <Message>
                        Don't have an account? <Link to="/landlordRegister">Register</Link>
                    </Message>
                    </Segment>
                </Grid.Column>
                
  
        </Grid>
  
  
  
      </div>
    )
}

export default LandlordLogin
