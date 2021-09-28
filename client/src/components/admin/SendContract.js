import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Grid, Segment,Input} from 'semantic-ui-react';

const SendContract = () => {
   let params = useParams();
   const id = params.id
   const [tenantEmail, setTenantEmail] = useState("")
   const [landlordEmail, setLandlordEmail] = useState("")
    const [house, setHouse] = useState([])
    const getThatHouse = async ()=>{
        try {
          const {data} = await axios.get(`http://localhost:5000/admin/gethouserequestbyid/${id}`)
          setHouse(data)
        } catch (error) {
          console.log(error)
        }
      }
      const sendEmail = async (e)=>{
        e.preventDefault();

        const config = {
          header: {
            "Content-Type": "application/json",
          },
        };
    
        try {
          const { data } = await axios.post(
            "http://localhost:5000/admin/sendContractForm",
            { tenantEmail,landlordEmail},
            config
          );
          console.log(data)
          alert("sent successfuly")
    
        } catch (error) {
          console.log(error)
        }
      }
      useEffect(() => {
        getThatHouse()
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
                      label='Contract signing message'
                     
                    />
          
             
              <Button onClick={sendEmail}>Submit</Button>
            </Form>
                        
            )}
            
          </Segment>
        </Grid.Column>


      </Grid>
    </div>
    )
}

export default SendContract
