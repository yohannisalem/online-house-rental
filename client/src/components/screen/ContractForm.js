import { useState } from 'react'
import { Container, Header, Segment } from 'semantic-ui-react'
import TextPlaceHolder from '../admin/SignHere'
import { Divider, Grid, Image,Form,Button} from 'semantic-ui-react'
import { axios } from 'axios';
const ContractForm = () => {
  const [tenantemail, setTenantemail] = useState("")
  const [tenantusername, setTenantusername] = useState('')
  const [landlordemail, setLandlordemail] = useState('')
  const [landlordusername, setLandlordusername] = useState('')
  const handletenantEmailChange = (e)=>{
    setTenantemail(e.target.value)
  }
  const handleTenantNameChange = (e)=>{
    setTenantusername(e.target.value)
  }
  const handleLandlordEmailChange = (e)=>{
    setLandlordemail(e.target.value)
  }
  const handleLandlordNameChange = (e)=>{
    setLandlordusername(e.target.value)
  }
 
  const SignContract = (contractdata)=>{
    const config = {
      header: {
        "Content-Type": "application/json",
      }
    };
    try {
      const {data} = axios.post('http://localhost:5000/admin/savecontract',contractdata,config)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleMultipleFileSubmit = async () => {
    const formData = new FormData();
    formData.append('landlordname', localStorage.getItem("username"));
    

    await createHouse(formData);
    console.log(formData)

  }
  return (
    <div style={{ minHeight: "100vh" }}>

      <Grid style={{ marginTop: "5px" }} >
      
            
        
        <Grid.Column width={16}>
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
          <Header as='h2' >Terms And Conditions</Header>
          <Divider />
          <Grid textAlign='left'>
            <Grid.Column width="8"><Form size='large' style={{ verticalAlign: "center" }}>
              <Header> Tenant Contract Fill Form</Header>
              <Form.Input fluid icon='user' iconPosition='left' type="text"
                required
                placeholder="your username"
                tabIndex={1}
              />
              <Form.Input fluid icon='email' iconPosition='left' type="email"
                required
                id="email"
                placeholder="your email address"
                tabIndex={1}
              />
              

              

            </Form>
            <Segment>
                <TextPlaceHolder />
                Tenant
              </Segment>
             
              <Divider hidden />
            </Grid.Column>

            <Grid.Column width="8"><Form size='large' style={{ verticalAlign: "center" }}>

            <Header> Tenant Contract Fill Form</Header>
            <Form.Input fluid icon='user' iconPosition='left' type="text"
                required
                placeholder="your username"
                tabIndex={1}
              />
              <Form.Input fluid icon='email' iconPosition='left' type="email"
                required
                id="email"
                placeholder="your email address"
                tabIndex={1}
              />
            </Form>
          
            <Segment>
                <TextPlaceHolder />
                Landlord
              </Segment>
              <Divider hidden />

              <Button >I agree to terms and condition</Button>
            </Grid.Column>

            
            
              
              
         
          </Grid>
        </Grid.Column>
      </Grid>

    </div>




  )
}
export default ContractForm;
