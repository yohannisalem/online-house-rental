import axios from 'axios';
import React, { createRef, useEffect, useState,useRef} from 'react';
import { Link,useHistory} from 'react-router-dom';
import { Card, CardContent, Container, Form, Grid, Button, Image, Ref, Divider, Sticky } from 'semantic-ui-react';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import HousesLocation from '../maps/HousesLocation';

SwiperCore.use([Navigation, Pagination, Scrollbar]);
const SwiperSlider = () => {
  const contextRef = createRef()

  const [multipleFiles, setMultipleFiles] = useState([]);
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  
  const [clicked,setClicked]= useState("")
  const wrapperRef = useRef(null);
  const history = useHistory()
 const handleSearch =(term)=>{
  history.push(`/houseDistrict/${term}`)
 }
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
  const searchHouse = async (text) => {
    try {
      const pokemon = [];
      const searchedHouse = await axios.get(`http://localhost:5000/api/autoCompleteSearch?term=${text}`)
      searchedHouse.data.map(house => {
        pokemon.push(house)
        
      })
      setOptions(pokemon);
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const updatePokeDex = poke => {
    setSearch(poke);
    setClicked(poke)
    setDisplay(false);

  };
  useEffect(() => {
    getMultipleFilesList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div >
      <Ref innerRef={contextRef}>

        <Container fluid >
          <Grid columns='2' style={{ padding: "0px", margin: "0px" }}>
            <Grid.Column style={{ padding: "0px", margin: "0px" }}>
            <Form>
              
                
              <Form.Input
                    type='search' placeholder='Search...'
                    action={{
                      content: 'Search',
                      style: { backgroundColor: "#20c1c9", width: "55px", padding: "7px" },
                      onClick:()=>handleSearch(clicked) 
                    }}
                    onChange={(e) => searchHouse(e.target.value)}
                    onClick={() => setDisplay(!display)}
                    value={clicked}
                  />
                
            
            </Form>
            {display && (
                  <div className="autoContainer">
                    {options
                      .map((value) => {
                        return (
                          <div
                            onClick={() => updatePokeDex(value)}
                            className="option"
                            tabIndex="0"
                          >
                            <span>{value}</span>

                          </div>
                        );
                      })}
                  </div>
                )}
              <Grid  columns={2} style={{ padding: "0px", margin: "0px", width: "70vw" }}>
                {multipleFiles.map((element, index) =>

                  <div key={element._id} style={{padding:"10px"}}>
                    <Card
                      style={{
                        height: "305px",
                        width: "315px",
                        
                        padding:"0px"
                      }}
                      key={index}
                    >
                      <Grid.Column style={{ padding: "0px", margin: "0px" }}>
                        <Swiper
                          slidesPerView={1}
                          navigation
                         
                        >
                          {element.files.map((url, index) =>

                            <SwiperSlide key={index}
                              style={{ height: "200px"}}
                            >
                              <Link to={`/houseDetails/${element._id}`}>
                                <Image src={url} alt="img"
                                  style={{
                                    height:"200px",
                                    objectFit: "cover"
                                  }}
                                />
                              </Link>
                            </SwiperSlide>

                          )}
                        </Swiper>
                      </Grid.Column>
                      <CardContent>
                        
                        <Card.Description>
                          {element.feepermonth} Br
                        </Card.Description>
                        <Card.Description>

                          {
                            element.numberofbeds
                          }bd,
                          {element.size}sq.ft
                        </Card.Description>
                        <Card.Description>

                          {
                            element.sefer
                          },{element.district}
                        </Card.Description>
                        <Card.Description>

                        <Button size='mini' color="teal">Request Property</Button>
                        <Button size='mini' floated='right'>(094)-145-4140</Button>
                        </Card.Description>

                      </CardContent>

                    </Card>
                  </div>

                )}

              </Grid>
            </Grid.Column>
            <Grid.Column style={{ padding: "0px" }}>
              <Sticky context={contextRef} offset={60}>
                <HousesLocation />
              </Sticky>

            </Grid.Column>
          </Grid>
        </Container>
      </Ref>
      <Divider hidden/>

    </div>
  )
}

export default SwiperSlider
