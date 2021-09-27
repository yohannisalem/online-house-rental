
import { useEffect, useState, Component } from 'react';

import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Label, TransitionablePortal, Segment, Header, Image, Divider, Form, Grid } from 'semantic-ui-react'
import SignaturePanel from '../admin/SignaturePanel'
class TextPlaceHolder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trimmedDataURL: null,
      open: false
    }
  }
  signPad = {}
  clear = () => {
    this.signPad.clear()
  }
  trimSignature = () => {
    this.props.onChange({
      trimmedDataURL: this.signPad.getTrimmedCanvas()
        .toDataURL('image/svg')
    })
    this.setState({ open: false })
  }
  setOpen = (props) => {
    this.setState({ open: !props })
  }

  render() {
    const { trimmedDataURL } = this.state

    //this.setOpen(false)
    return <Container>

      <Label content={'Cick here to sign'} onClick={() => { this.setOpen(this.state.open) }}></Label>
      <TransitionablePortal
        open={this.state.open}
        transition={{ animation: 'browse', duration: 500 }}
      >
        <Segment style={{
          left: '40%',
          position: 'fixed',
          top: '30%',
          zIndex: 1000,
        }}
        >
          <Header>Please use the mouse to sign!</Header>
          <SignaturePanel name canvasProps={{width: '100%', height: '100%'}}
            ref={(ref) => { this.signPad = ref }} />

          <Button onClick={this.trimSignature}>Save</Button>
        </Segment>
      </TransitionablePortal>
      {trimmedDataURL
        ? <Image style={{
          backgroundSize: ' 200px 50px',
          width: '200px',
          height: '50px',
          backgroundColor: 'white'
        }} src={trimmedDataURL} />
        : ''}
      {/* {JSON.stringify(this.state.trimmedDataURL)} */}
    </Container>
  }

}

const ContractForm = () => {
  let params = useParams()
  const houseId = params.id
  const [house, setHouse] = useState([])
  const [tenantemail, setTenantemail] = useState('')
  const [houseid, setHouseid] = useState('')
  const [feepermonth, setFeepermonth] = useState(0)
  const [tenantname, setTenantusername] = useState('')
  const [landlordemail, setLandlordemail] = useState('')
  const [landlordname, setLandlordusername] = useState('')
  const [tenantsignature, setTenantSignature] = useState('')
  const [landlordsignature, setLandlordSignature] = useState('')
  const [termsandcondition, setTermsandcondition] = useState('')
  const [contractduration, setLeaseduration] = useState('')

 const tensig = JSON.stringify(tenantsignature.trimmedDataURL).toString()
 const landsig = JSON.stringify(landlordsignature.trimmedDataURL).toString()
 console.log("tensig",tensig)
 console.log("landsig",landsig)
  const getThatHouse = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/admin/gethouserequestbyid/${houseId}`)
      setHouse(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  const SignContract = async (e) => {
    e.preventDefault()
    const config = {
      header: {
        "Content-Type": "application/json",
      }
    };
    try {
      const res = await axios.post("http://localhost:5000/admin/savecontract", 
      {tenantname,tenantemail,landlordname,landlordemail,houseid,termsandcondition,feepermonth,contractduration,tensig,landsig}, config)
      console.log(res)
      alert("contract saved successfully")
    } catch (error) {
      console.log(error)
    }
  }

  const saveContract = async () => {
    const formData = new FormData();
    formData.append('houseid', houseid)
    formData.append('tenantname', tenantname);
    formData.append('tenantemail', tenantemail);
    formData.append('landlordname', landlordname);
    formData.append('landlordemail', landlordemail);
    formData.append('termsandcondition', termsandcondition);
    formData.append('contractduration', contractduration);
    formData.append('feepermonth', feepermonth);
    formData.append('tenantsignature', JSON.stringify(tenantsignature));
    formData.append('landlordsignature', JSON.stringify(landlordsignature));

    SignContract(formData)
    


  }
console.log(house)
  useEffect(() => {
    getThatHouse()
  }, [])
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
            <Grid.Column width="8">
              <Form size='large' style={{ verticalAlign: "center" }}>
              <Form.Input fluid icon='user' iconPosition='left' type="text"
                required
                name="houseid"
                placeholder="houseid"
                tabIndex={1}
                onChange={e => setHouseid(e.target.value)}
              />
              <Form.Input fluid icon='user' iconPosition='left' type="text"
                required
                name="feepermonth"
                placeholder="feepermonth"
                tabIndex={1}
                onChange={e => setFeepermonth(e.target.value)}
              />
              <Form.Input fluid icon='user' iconPosition='left' type="text"
                required
                name="termsandcondition"
                placeholder="termsandcondition"
                tabIndex={1}
                onChange={e => setTermsandcondition(e.target.value)}
              />
              <Form.Input fluid icon='user' iconPosition='left' type="text"
                required
                name="contractduration"
                placeholder="leaseduration"
                tabIndex={1}
                onChange={e => setLeaseduration(e.target.value)}
              />
              <Header> Tenant Contract Fill Form</Header>

              <Form.Input fluid icon='user' iconPosition='left' type="text"
                required
                name="tenantname"
                placeholder="your username"
                tabIndex={1}
                onChange={e => setTenantusername(e.target.value)}
              />
              <Form.Input fluid icon='email' iconPosition='left' type="email"
                required
                id="email"
                name="tenantemail"
                placeholder="your email address"
                tabIndex={1}
                onChange={e => setTenantemail(e.target.value)}
              />




            </Form>
              <Segment>
                <TextPlaceHolder name="tenantsignature" trimmedDataURL={tenantsignature} onChange={setTenantSignature} />
                Tenant
              </Segment>

              <Divider hidden />
            </Grid.Column>

            <Grid.Column width="8"><Form size='large' style={{ verticalAlign: "center" }}>

              <Header> Landlord Contract Fill Form</Header>
              <Form.Input fluid icon='user' iconPosition='left' type="text"
                required
                name="landlordname"
                placeholder="your username"
                tabIndex={1}
                onChange={e => setLandlordusername(e.target.value)}
              />
              <Form.Input fluid icon='email' iconPosition='left' type="email"
                required
                id="email"
                name="landlordemail"
                placeholder="your email address"
                tabIndex={1}
                onChange={e => setLandlordemail(e.target.value)}
              />
            </Form>

              <Segment>
                <TextPlaceHolder name="landlordsignature" trimmedDataURL={landlordsignature} onChange={setLandlordSignature} />
                Landlord
              </Segment>
              <Divider hidden />

              <Button onClick={SignContract}>I agree to terms and condition</Button>
              <Divider/>
{
  tensig
}
            </Grid.Column>






          </Grid>
        </Grid.Column>





      </Grid>

    </div>




  )
}
export default ContractForm;
