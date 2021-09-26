import React, { useState } from 'react'
import axios from 'axios'

import { Segment,Form,Header,Divider,Button,Input} from 'semantic-ui-react';
const SendContract = () => {
    const [tenantname, setTenantname] = useState('')
    const sendContractToBoth = async (id)=>{
        try {
          const sentContractForm = await axios.get(`http://localhost:5000/admin/gethouserequestbyid/${id}`)

        } catch (error) {
          console.log(error)
        }
      }
    return (
        <div>
            <Segment stacked style={{ backgroundColor: "lightGray" }} textAlign='center' >
                  <Form size='large'  >
                    <Header as='h2' color='teal' textAlign='center'>
                      Request this house
                    </Header>
                    <Divider hidden />
                    
                   
                    <Form.Field
                      required
                      id='form-input-control-last-name'
                      control={Input}
                      name='tenantPhone'
                      type='text'
                      label='Phone Number'
                      
                    />
                    <Form.Field
                      required
                      id='form-input-control-last-name'
                      control={Input}
                      name='tenantEmail'
                      type='text'
                      label='Tenant Email'
                      placeholder='email'
                      
                    />
                    <Divider hidden />
                    <Button color="twitter" onClick={sendContractToBoth}>Request House</Button>
                    <Divider hidden />
                    
                  </Form>
                </Segment>
        </div>
    )
}

export default SendContract
