import React,{useState,useEffect} from 'react'
import { Grid, Icon, Segment, Image, Form, Input, Divider, Label, Button, Container, } from 'semantic-ui-react'
import axios  from 'axios';
import { useParams } from 'react-router';
const LandlordAccountReview = () => {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const landlordid = localStorage.getItem('userid')
  const updateAccount = async ()=>{
    try {
      const account = await axios.put(`http://localhost:5000/api/auth/updateaccount/${landlordid}`,{
        firstname,lastname,username,email,phone
      })
      alert("updated successfuly")

    } catch (error) {
      console.log(error)
      alert("error while updating a data")
    }
  }

  return (
    <div style={{ minHeight: "100vh"}}>
      
      <Grid style={{ marginTop: "5px"}} >
        <Grid.Column width="3"></Grid.Column>
        <Grid.Column  width={13}>
          <Segment
            textAlign='bottom'
            style={{
              backgroundImage: "url(/des2.jpg)",
              height: "20vh"
            }}
          >
            <Image src='https://react.semantic-ui.com/images/avatar/small/matthew.png' circular size='small' />
          </Segment>
          <Divider hidden />
          <Divider hidden />
          <Grid textAlign='center'>
           
            <Grid.Column floated='right' width={3}>
              <Button onClick={updateAccount} color='twitter'>
                <Icon  name='save' />
                Update Account
              </Button>
            </Grid.Column>
          </Grid>
          <Divider />
          <Grid textAlign='left'>

<Segment style={{backgroundColor:"lightGray"}}>
            <Form>
              <Form.Group >

            <Form.Field
                            required
                            id='form-input-control-last-name'
                            control={Input}
                            name='firstname'
                            type='text'
                            label='First Name'
                            placeholder='first name'

                            onChange={e=>setFirstname(e.target.value)}
                        />
            <Form.Field
                            required
                            id='form-input-control-last-name'
                            control={Input}
                            name='lastname'
                            type='text'
                            label='Last Name'
                            placeholder='last name'

                            onChange={e=>setLastname(e.target.value)}
                        />
              </Form.Group>
            <Form.Field
                            required
                            id='form-input-control-last-name'
                            control={Input}
                            name='username'
                            type='text'
                            label='User Name'
                            placeholder='user name'

                            onChange={e=>setUsername(e.target.value)}
                        />
               <Form.Field
                            required
                            id='form-input-control-last-name'
                            control={Input}
                            name='email'
                            type='email'
                            label='Email Address'
                            placeholder='email address'

                            onChange={e=>setEmail(e.target.value)}
                        />
               <Form.Field
                            required
                            id='form-input-control-last-name'
                            control={Input}
                            name='phone'
                            type='text'
                            label='Phone Number'
                            placeholder='phone number'

                            onChange={e=>setPhone(e.target.value)}
                        />
              
              
            </Form>
</Segment>
          </Grid>

        </Grid.Column>

      </Grid>
      
    </div>
  )
}

export default LandlordAccountReview
