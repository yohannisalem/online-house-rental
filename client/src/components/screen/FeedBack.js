import React from 'react'
import {Grid,Input, Segment,Divider, Header,Form,Item,Image,Button,TextArea } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const FeedBack = () => {
    return (
        <div style={{height:"100vh"}}>
            <Grid textAlign='center'>
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
              

            </Grid>
        </div>
    )
}

export default FeedBack
