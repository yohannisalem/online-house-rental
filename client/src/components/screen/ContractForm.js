
import axios from 'axios';
import { Component, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Divider, Form, Grid, Header, Image, Label, Segment, TransitionablePortal ,Icon,Checkbox} from 'semantic-ui-react';
import SignaturePanel from '../admin/SignaturePanel';

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
  const houseid = params.id
  const [house, setHouse] = useState([])
  
  const [feepermonth, setFeepermonth] = useState(0)
  const [tenantname, setTenantusername] = useState('')
 
  const [landlordname, setLandlordusername] = useState('')
  const [tenantsignature, setTenantSignature] = useState('')
  const [landlordsignature, setLandlordSignature] = useState('')
  const [termsandcondition, setTermsandcondition] = useState('')
  const [tenantfirma, setTenantfirma] = useState('')
  const [landlordfirma, setLandlordfirma] = useState('')
  const [contractduration, setLeaseduration] = useState('')
  const [checked, setChecked] = useState(false)
  const handleClick = () => setChecked(!checked)
 const tensig = JSON.stringify(tenantfirma.trimmedDataURL)
 const landsig = JSON.stringify(landlordfirma.trimmedDataURL)
 const tenantemail = localStorage.getItem("tenantEmail")
 const landlordemail = localStorage.getItem("email")
 console.log("tensig",tensig)
 console.log("landsig",landsig)
  const getThatHouse = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/admin/gethouserequestbyid/${houseid}`)
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
      {tenantname,tenantemail,landlordname,landlordemail,houseid,termsandcondition,feepermonth,contractduration,tenantsignature,landlordsignature}, config)
      console.log(res)
      alert(tensig)
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
      <Container style={{marginBottom:"100px"}}>

      <Grid style={{ marginTop: "5px" }} >

        <Grid.Column width={16}>
          <Divider hidden />
          <Header as='h2' icon textAlign='center'>
      <Icon name='handshake' circular />
      <Header.Content>Agreement</Header.Content>
    </Header>
   
          <Divider />
          <Grid textAlign='center' style={{backgroundColor:"lightGray"}}>
            <Grid.Column width="8">
              <Form size='large' style={{ verticalAlign: "center" }}>
               
                
              
             
              <Header> Tenant Contract Fill Form</Header>

              <Form.Input fluid icon='user' iconPosition='left' type="text"
                required
                label='Your Name'
                name="tenantname"
                placeholder="your username"
                tabIndex={1}
                onChange={e => setTenantusername(e.target.value)}
              />
               <Form.Field>
               <Segment>
                <TextPlaceHolder trimmedDataURL={tenantfirma} onChange={setTenantfirma} />
                Tenant
              </Segment>

              <Divider hidden />
               {/* <Checkbox label='agree to rent this house' name="enantsignature" checked={checked} onClick={handleClick} value={tensig} onChange={e => setTenantSignature(e.target.value)}/> */}
                <select required name="tenantsignature"  onChange={e => setTenantSignature(e.target.value)}>
                    <option>--agree to rent this house--</option>
                      <option value={tensig}>Confirm</option>
                      
                    </select>
                </Form.Field>

            </Form>
              
            </Grid.Column>

            <Grid.Column width="8"><Form size='large' style={{ verticalAlign: "center" }}>

              <Header> Landlord Contract Fill Form</Header>
              <Form.Input fluid icon='user' iconPosition='left' type="text"
                required
                 label='Your Name'
                name="landlordname"
                placeholder="your username"
                tabIndex={1}
                onChange={e => setLandlordusername(e.target.value)}
              />
              <Form.Input fluid icon='money' iconPosition='left' type="text"
                required
                label='Fee on Which You both agreed'
                name="feepermonth"
                placeholder="feepermonth"
                tabIndex={1}
                onChange={e => setFeepermonth(e.target.value)}
              />
              <Form.Input fluid icon='handshake' iconPosition='left' type="text"
                required
                label='terms you agreed with tenant'
                name="termsandcondition"
                placeholder="termsandcondition"
                tabIndex={1}
                onChange={e => setTermsandcondition(e.target.value)}
              />
              <Form.Input fluid icon='clock' iconPosition='left' type="text"
                required
                label='what is the duration of a lease'
                name="contractduration"
                placeholder="leaseduration"
                tabIndex={1}
                onChange={e => setLeaseduration(e.target.value)}
              />
              <Form.Field>
              <Segment>
                <TextPlaceHolder trimmedDataURL={landlordfirma} onChange={setLandlordfirma} />
                Landlord
              </Segment>
              <Divider hidden />

              
              <Divider/>
              {/* <Checkbox label='agree to rent this house' name="landlordsignature" checked={checked} onClick={handleClick} value={landsig} onChange={e => setLandlordSignature(e.target.value)}/> */}

                <select required name="landlordsignature"  onChange={e => setLandlordSignature(e.target.value)}>
                    <option>--agree to rent this house--</option>
                      <option value={landsig}>Confirm</option>
                      
                    </select>
                </Form.Field>
            </Form>

             

            </Grid.Column>

            <Button onClick={SignContract} color='twitter'>We agreed on full terms</Button>


<Divider hidden/>

          </Grid>
        </Grid.Column>





      </Grid>
      </Container>

    </div>




  )
}
export default ContractForm;
