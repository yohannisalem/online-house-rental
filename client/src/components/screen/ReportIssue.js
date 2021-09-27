import { useState } from 'react'
import { Grid, Input, Segment, Divider, Header, Form, TextArea, Image, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const ReportIssue = () => {
  const [description, setDescription] = useState('')
  const [reportedBy, setReportedBy] = useState('')
  const reportIssue = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("http://localhost:5000/report/reportissue", { description, reportedBy }, config);
      console.log(res)

    } catch (err) {
      console.log(err)
    }
  };
  return (

    <div style={{ minHeight: "100vh" }}>

      <Grid style={{ marginTop: "5px" }} >
        
        <Grid.Column width={16}>
        
          <Divider hidden />
          
          <Grid textAlign="center" width="8">


          <Segment style={{ backgroundColor: "lightGray" }} textAlign='center' >
                  <Form size='large' >
                    <Header as='h2' color='teal' textAlign='center'>
                      Report an Issue
                    </Header>
                    <Divider hidden />
                   
                    <Form.Field
                      required
                      id='form-input-control-last-name'
                      control={Input}
                      name='reportedby'
                      type='text'
                      label='Reported By'
                      placeholder="enter your name"
                      
                    />
                    <Form.Field
                      required
                      id='form-input-control-last-name'
                      control={TextArea}
                      name='description'
                      type='text'
                      label='Report Descirption'
                      placeholder="enter what you want to report"
                      
                    />
                  
                    <Divider hidden />
                    <Button color="twitter" >Report Issue</Button>
                    
                    
                  </Form>
                </Segment>
          </Grid>

        </Grid.Column>

      </Grid>

    </div>


  )
}

export default ReportIssue
