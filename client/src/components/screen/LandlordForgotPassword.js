import React,{useState} from 'react'
import axios from "axios";
import { Button, Form, Segment } from 'semantic-ui-react';
const LandlordForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const {data} = await axios.post(
        "http://localhost:5000/api/auth/landlordForgotPassword",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError("email is not sent");
      setEmail("");
     
    }
  };

  return (
    <div style={{height:"100vh",marginTop:"100px"}}>
    
        <Segment stacked style={{backgroundColor:"lightGray"}}>
        <Form>
        
        {error && <span className="error-message">error-{error}</span>}
        {success && <span className="success-message">{success}</span>}
        <div className="form-group">
          <p className="forgotpassword-screen__subtext">
            Please enter the email address you register your account with. We
            will send you reset password confirmation to this email
          </p>
          
        </div>
        <Form.Field>
          <label>First Name</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Field>
        <Button onClick={forgotPasswordHandler}>send email</Button>
        </Form>
        </Segment>
        
     
    </div>
  );
}

export default LandlordForgotPassword

