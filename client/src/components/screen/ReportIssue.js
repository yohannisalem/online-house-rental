import { useState } from 'react'
import { Grid, Input, Segment, Divider, Header, Form, Label, Image, Button, Icon } from 'semantic-ui-react';
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
        <Grid.Column width="3"></Grid.Column>
        <Grid.Column width={13}>
          <Segment
            textAlign='bottom'
            style={{
              backgroundImage: "url(/des2.jpg)",
              height: "20vh"
            }}
          >
            <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='small' circular />
          </Segment>
          <Divider hidden />
          <Divider hidden />
          <Grid textAlign='center'>
            <Grid.Column floated='left' width={13}>
              <Label size='big'>
                My Account
              </Label>
            </Grid.Column>
            <Grid.Column floated='right' width={3}>
              <Button>
                <Icon name='save' />
                Save
              </Button>
            </Grid.Column>
          </Grid>
          <Divider />
          <Grid textAlign='left'>


            <Form>
              <Form.Field inline>
                <label>First name</label>
                <Input placeholder='First name' />
              </Form.Field>
              <Form.Field inline>
                <label>First name</label>
                <Input placeholder='First name' />
              </Form.Field>
              <Form.Field inline>
                <label>First name</label>
                <Input placeholder='First name' />
              </Form.Field>
              <Form.Field inline>
                <label>First name</label>
                <Input placeholder='First name' />
              </Form.Field>
              <Form.Field inline>
                <label>First name</label>
                <Input placeholder='First name' />
              </Form.Field>
              <Form.Field inline>
                <label>First name</label>
                <Input placeholder='First name' />
              </Form.Field>
              <Form.Field inline>
                <label>First name</label>
                <Input placeholder='First name' />
              </Form.Field>
            </Form>

          </Grid>

        </Grid.Column>

      </Grid>

    </div>


  )
}

export default ReportIssue
