import axios from 'axios'
import React,{useState} from 'react'
import { Form,Button,Input,Grid,Segment,Divider,Icon,Image,Label} from 'semantic-ui-react'
const ContractForm = () => {
    const [tenantEmail, setTenantEmail] = useState("")

    const sendEmail = async (e) => {
        e.preventDefault();
    
        const config = {
          header: {
            "Content-Type": "application/json",
          },
        };
    
        try {
          const { data } = await axios.post(
            "http://localhost:5000/api/sendContractForm",
            { tenantEmail },
            config
          );
         console.log(data)
    
        } catch (error) {
        console.log(error)
        }
      };
    return (
        <div>
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
        </div>
    )
}

export default ContractForm
