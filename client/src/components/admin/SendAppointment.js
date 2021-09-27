import React, { useEffect, useState } from 'react'
import { Header, Button, Grid, Form, Input, Segment, TextArea, Divider } from 'semantic-ui-react';
import Datetime from 'react-datetime'
import "react-datetime/css/react-datetime.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';
const SendAppointment = () => {
  let params = useParams()
  const houseid = params.id
  const [tenantEmail, setTenantEmail] = useState("")
  const [landlordEmail, setLandlordEmail] = useState("")
  const [appointmentletter, setLetter] = useState("")

  const [date, setDate] = useState(new Date())
  const [house, setHouse] = useState([])

  const getSpecificRequestedHouse = async (e) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/admin/gethouserequestbyid/${houseid}`)
      setHouse(data)
      
    } catch (error) {
      console.log(error)
    }
  }
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
        { tenantEmail,landlordEmail,appointmentletter, date },
        config
      );
      console.log(data)
      alert("sent successfuly")

    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    getSpecificRequestedHouse()

  }, [])
  return (
    <div style={{ alignContent: "center", margin: "100px",height:"100vh"}}>

      <Grid textAlign='center'>
        <Grid.Column width={7}>

          <Segment stacked style={{ backgroundColor: "lightGray" }} textAlign='center'>
            {
              house.map((element, index) =>

              <Form>

              <Form.Field>
                <label>tenant email</label>
                <select required name="tenantEmail" onChange={e => setTenantEmail(e.target.value)}>
                  <option>---Select Email</option>
                  <option value={element.tenantEmail}>Email</option>

                </select>
              </Form.Field>
              <Form.Field>
              <label>landlord email</label>
                <select required name="landlordemail" onChange={e => setLandlordEmail(e.target.value)}>
                  <option>---Select Email</option>
                  <option value={element.landlordemail}>Email</option>

                </select>
              </Form.Field>
              <Form.Field
                      required
                      id='form-input-control-last-name'
                      control={Input}
                      name='appointmentletter'
                      type='text'
                      label='appointmentletter'
                      onChange={(e) => setLetter(e.target.value)}
                    />
              <Form.Field>
                <label>Date</label>
                <Datetime
                  value={date}
                  onChange={e => setDate(e, date)}
                />
              </Form.Field>
              <Button onClick={sendEmail}>Submit</Button>
            </Form>
                        
            )}
            
          </Segment>
        </Grid.Column>


      </Grid>
    </div>
  )
}

export default SendAppointment
