import {useState} from 'react'
import {Grid,Input, Segment,Divider, Header,Form,Item,Image,Button, TextArea } from 'semantic-ui-react';
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
      const res = await axios.post("http://localhost:5000/report/reportissue", {description,reportedBy}, config);
      console.log(res)
     
    } catch (err) {
      console.log(err)
    }
  };
    return (
        <div>
            <Grid>
              <Grid.Column width={5}>
                {/* <Sticky active pushing context={contextRef}> */}

                <Segment stacked style={{ backgroundColor: "lightGray" }} textAlign='center'>
                <Form size='large' >
                      <Header as='h2' color='teal' textAlign='center'>
                        Request this house
                      </Header>
                     
                     
                      <Form.Field
                        required
                        id='form-input-control-last-name'
                        control={TextArea}
                        name='description'
                        type='text'
                        label='report details'
                        placeholder='enter what you wanted to report here'
                        onChange={e=>setDescription(e.target.value)}
                       
                      />
                      <Form.Field
                        required
                        id='form-input-control-last-name'
                        control={Input}
                        name='reportedBy'
                        type='text'
                        label='Name'
                        placeholder='enter your name'
                        onChange={e=>setReportedBy(e.target.value)}
                      />
                      <Divider hidden />
                      <Button color="twitter" onClick={reportIssue}>Report Issue</Button>
                      <Divider hidden />
                      
                    </Form>
                </Segment>
                {/* </Sticky> */}
              </Grid.Column>
              <Grid.Column width={11}>
              <Item.Group>
    <Item>
      <Item.Content>
        <Item.Header as='a'>Header</Item.Header>
        <Item.Meta>Description</Item.Meta>
        <Item.Description>
          <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Item.Description>
        <Item.Extra>Additional Details</Item.Extra>
      </Item.Content>
    </Item>

    <Item>
      <Item.Content>
        <Item.Header as='a'>Quick Facts</Item.Header>
        <Item.Meta>Description</Item.Meta>
        <Item.Description>
        some description
        </Item.Description>
        <Item.Extra>Additional Details</Item.Extra>
      </Item.Content>
    </Item>
    <Item>
      <Item.Content>
        <Item.Header as='a'>Description</Item.Header>
        <Item.Meta>Description</Item.Meta>
        <Item.Description>
        some description
        </Item.Description>
        <Item.Extra>Additional Details</Item.Extra>
      </Item.Content>
    </Item>
    <Item>
      <Item.Content>
        <Item.Header as='a'>Landlord Info</Item.Header>
        <Item.Meta>Description</Item.Meta>
        <Item.Description>
          some description
        </Item.Description>
        <Item.Extra>Additional Details</Item.Extra>
      </Item.Content>
    </Item>
    <Item>
      <Item.Content>
        <Item.Header as='a'>Features</Item.Header>
        <Item.Meta>Description</Item.Meta>
        <Item.Description>
        some description
        </Item.Description>
        <Item.Extra>Additional Details</Item.Extra>
      </Item.Content>
    </Item>
    <Item>
      <Item.Content>
        <Item.Header as='a'>Header</Item.Header>
        <Item.Meta>Description</Item.Meta>
        <Item.Description>
        some description
        </Item.Description>
        <Item.Extra>Additional Details</Item.Extra>
      </Item.Content>
    </Item>
  </Item.Group>
  <Divider hidden/>
  We take fraud seriously. If something looks fishy, let us know.
  <Link>Report This Listing</Link>

              </Grid.Column>

            </Grid>

        </div>
    )
}

export default ReportIssue
