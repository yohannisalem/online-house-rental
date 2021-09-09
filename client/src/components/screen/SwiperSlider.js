import axios from 'axios';
import React, { createRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Container, Form, Grid, GridColumn, Image, Ref, Segment, Sticky } from 'semantic-ui-react';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import HousesLocation from '../maps/HousesLocation';

SwiperCore.use([Navigation, Pagination, Scrollbar]);
const SwiperSlider = () => {
  const contextRef = createRef()

  const [multipleFiles, setMultipleFiles] = useState([]);
  const getMultipleFiles = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/getMultipleFiles');
      return data;
    } catch (error) {
      throw error;
    }
  }
  const getMultipleFilesList = async () => {
    try {
      const fileslist = await getMultipleFiles();
      setMultipleFiles(fileslist);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getMultipleFilesList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div >
      <Ref innerRef={contextRef}>

        <Container fluid >
          <Segment style={{padding:"0px"}}>
            <Form>
              <Form.Group widths='equal'>
                
                  <Form.Input
                    type='search' placeholder='Search...'
                    action={{
                      icon: 'search',
                      
                    }}
                  /* defaultValue={this.state.value}
                  onChange={this.handleInputChange} 
                 */
                  />
                
                <Form.Input placeholder='First name' />
                <Form.Input placeholder='Last name' />
                <Form.Select
                  placeholder='Gender'
                />
              </Form.Group>
            </Form>
          </Segment>

          <Grid columns='2' style={{ padding: "0px", margin: "0px" }}>
            <GridColumn style={{ padding: "0px", margin: "0px" }}>
              <Form>
                <Form.Group widths='equal'>
                  <Form.Input fluid label='First name' placeholder='First name' />
                  <Form.Input fluid label='Last name' placeholder='Last name' />
                  <Form.Select
                    fluid
                    label='Gender'
                    placeholder='Gender'
                  />
                </Form.Group>
              </Form>
              <Grid columns={2} style={{ padding: "0px", margin: "0px", width: "70vw" }}>
                {multipleFiles.map((element, index) =>

                  <div key={element._id} >
                    <Card
                      style={{
                        height: "350px",
                        width: "308px",
                        margin: "5px 0px",
                      }}
                    >
                      <Grid.Column style={{ padding: "0px", margin: "0px" }}>
                        <Swiper
                          slidesPerView={1}
                          navigation
                          pagination={{ clickable: true }}
                          scrollbar={{ draggable: true }}
                        >
                          {element.files.map((url, index) =>

                            <SwiperSlide key={index}
                              style={{ height: "250px" }}
                            >
                              <Link to={`/houseDetails/${element._id}`}>
                                <Image src={url} alt="img"
                                  style={{

                                    objectFit: "cover"
                                  }}
                                />
                              </Link>
                            </SwiperSlide>

                          )}
                        </Swiper>
                      </Grid.Column>
                      <CardContent>
                        <Card.Header>Matthew</Card.Header>
                        <Card.Meta>
                          {element.housename}
                        </Card.Meta>
                        <Card.Description>

                          {
                            element.district
                          },
                          {element.sefer}
                        </Card.Description>
                      </CardContent>

                    </Card>
                  </div>

                )}

              </Grid>
            </GridColumn>
            <GridColumn>
              <Sticky context={contextRef} offset={60}>
                <HousesLocation />
              </Sticky>

            </GridColumn>
          </Grid>
        </Container>
      </Ref>


    </div>
  )
}

export default SwiperSlider
