import { Container, Header, Segment } from 'semantic-ui-react'
import TextPlaceHolder from './SignHere.js'
import { Divider, Grid, Image,Form,Button} from 'semantic-ui-react'
const TermsAndConditions = () => {
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

          <Divider />
          <Grid textAlign='left'>
            <Grid.Column width="8"><Form size='large' style={{ verticalAlign: "center" }}>
              <Header> Tenant Contract Fill Form</Header>
              <Form.Input fluid icon='user' iconPosition='left' type="text"
                required
                placeholder="Email address"
                tabIndex={1}
              />
              <Form.Input fluid icon='user' iconPosition='left' type="email"
                required
                id="email"
                placeholder="Email address"
                tabIndex={1}
              />
              <Form.Input fluid icon='user' iconPosition='left' type="email"
                required
                id="email"
                placeholder="Email address"
                tabIndex={1}
              />

             
              <Divider hidden />
              

            </Form></Grid.Column>

            <Grid.Column width="8"><Form size='large' style={{ verticalAlign: "center" }}>

              <Form.Input fluid icon='user' iconPosition='left' type="email"
                required
                id="email"
                placeholder="Email address"
                tabIndex={1}
              />

              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                type="password"
                required
                id="password"
                autoComplete="true"
                placeholder="Enter password"

                tabIndex={2}
              />
             
              <Divider hidden />
              <Button >Login</Button>

            </Form></Grid.Column>

            <Header as='h2' >Terms And Conditions</Header>
            <p>This is an agreement between Yohannes and Hezekiel Tamire that lasts for the next ten months!
              A violation will result in the bla bla bla bla bla bla bla.
              This is an agreement between Yohannes and Hezekiel Tamire that lasts for the next ten months!
              A violation will result in the bla bla bla bla bla bla bla.
              This is an agreement between Yohannes and Hezekiel Tamire that lasts for the next ten months!
              A violation will result in the bla bla bla bla bla bla bla.
              This is an agreement between Yohannes and Hezekiel Tamire that lasts for the next ten months!
              A violation will result in the bla bla bla bla bla bla bla.
            </p>
            <Segment.Group>
              <Segment>
                <TextPlaceHolder />
                Tenant
              </Segment>
              <Segment>
                <TextPlaceHolder />
                Landlord
              </Segment>
            </Segment.Group>
          </Grid>
        </Grid.Column>
      </Grid>

    </div>




  )
}
// function TermsAndConditions () {
//     return(
//         <Container>
//             <Header as='h2' >Terms And Conditions</Header>
//             <p>This is an agreement between Yohannes and Hezekiel Tamire that lasts for the next ten months!
//                 A violation will result in the bla bla bla bla bla bla bla.
//                 This is an agreement between Yohannes and Hezekiel Tamire that lasts for the next ten months!
//                 A violation will result in the bla bla bla bla bla bla bla.
//                 This is an agreement between Yohannes and Hezekiel Tamire that lasts for the next ten months!
//                 A violation will result in the bla bla bla bla bla bla bla.
//                 This is an agreement between Yohannes and Hezekiel Tamire that lasts for the next ten months!
//                 A violation will result in the bla bla bla bla bla bla bla.
//             </p>
//             <Segment.Group vertical>
//                 <Segment>
//                     Tenant
//                 </Segment>
//                 <Segment>
//                     Landlord
//                 </Segment>
//                 </Segment.Group>
//         </Container>
//     )
// }
export default TermsAndConditions;