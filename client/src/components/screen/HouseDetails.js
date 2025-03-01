import React, { useEffect, useState, createRef } from 'react'
import axios from 'axios'

import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Breadcrumb, Image, Item, Ref, Segment, Container, Input, Checkbox, Divider, Header, Form, Button, Message, Grid, Modal, Icon, Sticky } from 'semantic-ui-react'
import { useParams, Link, useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player'
import RelatedHouses from './RelatedHouses';

SwiperCore.use([Navigation, Pagination, Scrollbar]);
const HouseDetails = ({ match }) => {
  const history = useHistory()
  const [open, setOpen] = useState(false)
  let params = useParams()
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

  const handleInput = (tenantPhone) => {
    return (
      tenantPhone.replace(phoneRegex, `($1) $2-$3`)
    )
  }

  const contextRef = createRef()
  const [multipleFiles, setMultipleFiles] = useState([])
  const [tenantPhone, setTenantPhone] = useState("")
  const [landlordemail, setLandlordemail] = useState("")
  const [landlordusername, setLandlordusername] = useState("")
  const [termsandcondition, settermsandcondition] = useState("")
  const productId = params.productId
  const apiUrl = `http://localhost:5000/api/getFilesById/${productId}`;

  const tenantId =localStorage.getItem("tenantId")
  const tenantEmail = localStorage.getItem('tenantEmail')
  const houseId = params.productId

  const requestHouse = async (e) => {

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      if (!localStorage.getItem("authToken")) {
        history.push('/login')
      }

      const res = await axios.post("http://localhost:5000/api/requestHouses", { tenantId, houseId, tenantPhone, tenantEmail,landlordemail,landlordusername,termsandcondition}, config);
   
      console.log(houseId)
      console.log(landlordusername)
      console.log(landlordemail)
      console.log(tenantPhone)
      setTenantPhone("")
    
      alert("you have request this house successfully")
    } catch (err) {
      console.log(err)
    }
  };
  const getMultipleFilesList = async () => {
    try {
      const { data } = await axios.get(apiUrl);
      setMultipleFiles(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getMultipleFilesList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId])
  return (
    <div >
      {multipleFiles.map((element, index) =>
        <Ref innerRef={contextRef} key={index}>
          {/*  */}
          <Container key={index}>

            <Grid textAlign='justified' style={{ marginBottom: "1px" }} key={index}>
              <Grid.Column width={11} verticalAlign='middle'>
                <Breadcrumb style={{ color: "teal" }}>
                  <Breadcrumb.Section as={Link} to={'/'}>Home</Breadcrumb.Section>
                  <Breadcrumb.Divider icon='right chevron' />
                  <Breadcrumb.Section as={Link} to={`/houseDistrict/${element.district}`}>{element.district}</Breadcrumb.Section>
                  <Breadcrumb.Divider icon='right chevron' />
                  <Breadcrumb.Section as={Link}>{element.sefer}</Breadcrumb.Section>
                  <Breadcrumb.Divider icon='right chevron' />
                  <Breadcrumb.Section active>{element.housename}</Breadcrumb.Section>
                </Breadcrumb>
              </Grid.Column>
              <Grid.Column width={5} textAlign='right'>
                <Modal
                  closeIcon
                  centered
                  open={open}
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                  trigger={<Button color="twitter">
                    <Icon name='video'/>

                  </Button>}
                  style={{ maxWidth: "680px", textAlign: "center" }}
                  key={index}
                >
                  <Modal.Content>
                  <ReactPlayer url={element.video} controls/>
                  </Modal.Content>

                </Modal> 

                <Button >
                  <Icon name='phone' />0941454140
                </Button>
              </Grid.Column>
            </Grid>

            <Swiper
              slidesPerView={2}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {element.files.map((url, index) =>
                <div className="col-6">
                  <SwiperSlide key={index} style={{ maxHeight: "70vh" }}>
                    <Image src={url} wrapped alt="img" style={{ objectFit: "contain" }} />
                  </SwiperSlide>
                </div>
              )}
            </Swiper>
            <Divider hidden />
            <Grid>
              <Grid.Column width={5}>
                {/* <Sticky active pushing context={contextRef}> */}

                <Segment stacked style={{ backgroundColor: "lightGray" }} textAlign='center' key={index}>
                  <Form size='large' key={index} >
                    <Header as='h2' color='teal' textAlign='center'>
                      Request this house
                    </Header>
                    <Divider hidden />
                    <select required name="houseId" onChange={e => setLandlordemail(e.target.value)}>
                      <option>--Select Landlord's Email--</option>
                      
                      <option value={element.owneremail}>Email</option>
                  
                    </select>
                    <select required name="houseId" onChange={e => setLandlordusername(e.target.value)}>
                    <option>--Select Landlord's Name--</option>
                      <option value={element.ownerusername}>username</option>
                      
                    </select>
                    <select required name="termsandcondition" onChange={e => settermsandcondition(e.target.value)}>
                    <option>--Terms--</option>
                      <option value={element.termsandcondition}>id</option>
                    </select>
                   
                    <Form.Field
                      required
                      id='form-input-control-last-name'
                      control={Input}
                      name='tenantPhone'
                      type='text'
                      label='Phone Number'
                      value={tenantPhone}
                      onChange={(e) => setTenantPhone(e.target.value)}
                    />
                   
                    <Divider hidden />
                    <Button color="twitter" onClick={requestHouse}>Request House</Button>
                    <Divider hidden />
                    <Checkbox label={<label>In sending this message, you agree to KirayBet.com's Privacy Policy and Terms</label>} />


                  </Form>
                </Segment>
                {/* </Sticky> */}
              </Grid.Column>
              <Grid.Column width={11}>
                <Item.Group>
                  <Item>
                    <Item.Content>
                      <Item.Header as='a'>Description</Item.Header>

                      <Item.Description>
                        {element.description}
                      </Item.Description>
                      
                    </Item.Content>
                  </Item>

                  <Item>
                    <Item.Content>
                      <Item.Header as='a'>Quick Facts</Item.Header>

                      <Item.Description>
                        {element.propertytype},{element.numberofbeds}
                      </Item.Description>
                      <Item.Extra>{element.size}</Item.Extra>
                    </Item.Content>
                  </Item>
                  <Item>
                    <Item.Content>
                      <Item.Header as='a'>Terms</Item.Header>
                      <Item.Meta>{element.termsandcondition}</Item.Meta>
                      <Item.Description>
                        {element.leaseperiod}
                      </Item.Description>
                      <Item.Extra>Additional Details</Item.Extra>
                    </Item.Content>
                  </Item>
                  <Item>
                    <Item.Content>
                      <Item.Header as='a'>Landlord Info</Item.Header>
                      <Item.Meta>{element.owneremail}</Item.Meta>
                      
                      <Item.Description>
                      
                      </Item.Description>
                      <Item.Extra>{element.ownerusername}</Item.Extra>
                    </Item.Content>
                  </Item>
                  <Item>
                    <Item.Content>
                      <Item.Header as='a'>Features</Item.Header>
                      <Item.Description>
                        {element.sefer}
                      </Item.Description>
                      <Item.Description>
                        {element.district}
                      </Item.Description>
                      
                    </Item.Content>
                  </Item>
                  <Item>
                    <Item.Content>
                      <Item.Header as='a'>Status</Item.Header>
                      <Item.Meta>House Status</Item.Meta>
                      <Item.Description>
                        {element.available}
                      </Item.Description>
                      
                    </Item.Content>
                  </Item>
                </Item.Group>
                <Divider hidden />
                We take fraud seriously. If something looks fishy, let us know.
                <Link to='/reportissue'>Report This Listing</Link>

              </Grid.Column>

            </Grid>



            <Divider hidden />

            <Header>People who viewed this House also viewed</Header>
            <RelatedHouses sefer={element.sefer} />

          </Container>
        </Ref>
      )}

    </div>
  )
}

export default HouseDetails
