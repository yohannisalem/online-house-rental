import React, {useState} from 'react'
import { Header, Button, Grid, Form, Input, Segment, TextArea, Divider } from 'semantic-ui-react';
import Datetime from 'react-datetime'
import "react-datetime/css/react-datetime.css";
import axios from 'axios';
const SendAppointment = () => {
    const [tenantEmail, setTenantEmail] = useState("")
    const [appointmentletter, setLetter] = useState("")
    const [date, setDate] = useState(new Date())
    const sendEmail = async (e) => {
        e.preventDefault();
    
        const config = {
          header: {
            "Content-Type": "application/json",
          },
        };
    
        try {
          const { data } = await axios.post(
            "http://localhost:5000/admin/sendappointment",
            { tenantEmail,appointmentletter,date},
            config
          );
         console.log(data)
    
        } catch (error) {
        console.log(error)
        }
      };
    return (
        <div style={{ alignContent: "center", margin: "100px" }}>

            <Grid textAlign='center'>
                <Grid.Column width={7}>

                    <Segment stacked style={{ backgroundColor: "lightGray" }} textAlign='center'>
                    <Form>
        
        <Form.Field>
        <label>email</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            value={tenantEmail}
            onChange={(e) => setTenantEmail(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
        <label>email</label>
          <input
            type="text"
            required
            id="letter"
            placeholder="appointment letter"
            value={appointmentletter}
            onChange={(e) => setLetter(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
        <label>Date</label>
        <Datetime 
        value={date}
        onChange={e=>setDate(e,date)}
        />
        </Form.Field>
        
  {
      JSON.stringify({date})
  }
        <Button onClick={sendEmail}>Submit</Button>
    </Form>
                    </Segment>
                </Grid.Column>


            </Grid>
        </div>
    )
}

export default SendAppointment
