import React, { useEffect, useState,createRef,useRef} from 'react'
import axios from 'axios'

import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import HousesLocation from '../maps/HousesLocation';
import { GridColumn,Grid,Image, Card, Form, Container,CardContent,Sticky,Button,Ref, Divider} from 'semantic-ui-react'
import { useParams,Link,useHistory} from 'react-router-dom';

SwiperCore.use([Navigation, Pagination, Scrollbar]);
const HousesInTheSameDistrict = ({ match }) => {
  const contextRef = createRef()
  let params = useParams()
  const [multipleFiles, setMultipleFiles] = useState([])
  const housesDistrict = params.district
  const apiUrl = `http://localhost:5000/api/getFilesByDistrict/${housesDistrict}`;
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  
  const [clicked,setClicked]= useState("")
  const wrapperRef = useRef(null);
  const history = useHistory()
 const handleSearch =(term)=>{
  history.push(`/houseDistrict/${term}`)
 }

  const getMultipleFilesList = async () => {
    try {
      const { data } = await axios.get(apiUrl);
      console.log(data)
      setMultipleFiles(data);
      console.log(multipleFiles);
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
  }, [housesDistrict])
  return (
    <div >
<Ref innerRef={contextRef}>
<Container fluid >
          <Grid columns='2' style={{ padding: "0px", margin: "0px" }}>
            <GridColumn style={{ padding: "0px", margin: "0px" }}>
            <Form>
              <Form.Group widths='equal'>
                
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
                
              </Form.Group>
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
              <Grid columns={2} style={{ padding: "0px", margin: "0px", width: "70vw" }}>
                {multipleFiles.map((element, index) =>

                  <div key={element._id} >
                    <Card
                      style={{
                        height: "305px",
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
                              style={{ height: "200px" }}
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
                        <Button size='mini' floated='right'>0941454140</Button>
                        </Card.Description>

                      </CardContent>

                    </Card>
                  </div>

                )}

              </Grid>
            </GridColumn>
            <GridColumn style={{ padding: "0px" }}>
            <Sticky context={contextRef} offset={60}>
                <HousesLocation />
              </Sticky>

            </GridColumn>
          </Grid>
        </Container>
        </Ref>
        <Divider hidden/>
    </div>
  )
}

export default HousesInTheSameDistrict
