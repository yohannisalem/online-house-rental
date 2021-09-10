import React from 'react'
import {Grid,Input, Segment,Divider, Header,Form,Item,Image,Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
const FeedBack = () => {
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
                       disabled
                        control={Input}
                        name='houseId'
                        type='text'
                        label='House ID'
                      
                        
                        
                      />
                      <Form.Field
                        required
                        control={Input}
                        name='tenantId'
                        type='text'
                        label='Tenant Id'
                        placeholder='tenant Id'
                       
                      />
                      <Form.Field
                        required
                        id='form-input-control-last-name'
                        control={Input}
                        name='tenantPhone'
                        type='Number'
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
                      <Button color="twitter" >Request House</Button>
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
