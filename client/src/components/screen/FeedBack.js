import React from 'react'
import {Grid,Input, Segment,Divider, Header,Form,Item,Image,Button,TextArea } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const FeedBack = () => {
    return (
        <div style={{height:"100vh"}}>
            <Grid>
              <Grid.Column width={5}>
                {/* <Sticky active pushing context={contextRef}> */}

                <Segment stacked style={{ backgroundColor: "lightGray" }} textAlign='center'>
                <Form size='large' >
                      <Header as='h2' color='teal' textAlign='center'>
                        Write a FeedBack
                      </Header>
                      <Form.Field
                                required
                                id='form-input-control-last-name'
                                control={TextArea}
                                label='FeedBack'
                                name='feedback'
                                placeholder='feedback'
                                

                            />
                      <Form.Field
                        required
                        control={Input}
                        name='usertype'
                        type='text'
                        label='type of user'
                        placeholder='identify who you are'
                       
                      />
                      <Form.Field
                        required
                        id='form-input-control-last-name'
                        control={Input}
                        name='username'
                        type='text'
                        label='username'
                        
                      />
                     
                      <Divider hidden />
                      <Button color="twitter" >Send FeedBack</Button>
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

export default FeedBack
