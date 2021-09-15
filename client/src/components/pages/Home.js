
import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import {Link,useHistory,BrowserRouter as Router} from 'react-router-dom'
import {
  Button,
  Container, Divider, Form, Grid,
  Header, Image, Input, List, Segment, Ref
} from 'semantic-ui-react'
/* const Auto = () => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);
  const searchPokemon= async (text)=>{
    try {
      const pokemon = [];
      const searchedHouse = await axios.get(`http://localhost:5000/api/autoCompleteSearch?term=bo`)
        searchedHouse.data.map(house=>{
          pokemon.push(house)
          console.log(house)
        })
        setOptions(pokemon);
    } catch (error) {
      
      
      console.log(error.message)
    }
  }

  useEffect(() => {
    searchPokemon()
    console.log('options',options)
    
  }, []);

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
    setDisplay(false);
    
  };

  return (
    <div ref={wrapperRef} className="flex-container flex-column pos-rel">
      <input
        id="auto"
        onClick={() => setDisplay(!display)}
        placeholder="Type to search"
        value={search}
        onChange={event => setSearch(event.target.value)}
      />
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
    </div>
  );
};
 */
const Home = () => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  
  const [clicked,setClicked]= useState("")
  const wrapperRef = useRef(null);
  const [multipleFiles, setMultipleFiles] = useState([])
  const history = useHistory()
 const handleSearch =(term)=>{
  history.push(`/houseDistrict/${term}`)
 }
  const getHousesIntheSameDistrict = async (houseDistrict) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/getFilesByDistrict/${houseDistrict}`);
      console.log(data)
      setMultipleFiles(data);
      console.log(multipleFiles);
    } catch (error) {
      console.log(error);
    }
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
    <div>
      <Segment
        textAlign='center'
        style={{
          minHeight: 640,
          backgroundImage: "url(/des2.jpg)",
          height: "80vh"
        }}
      >
        <Header
          as='h1'
          content='Need a house near your workplace'
          style={{
            fontSize: '4em',
            fontFamily: "NunitoSans, Helvetica, sans-serif",
            fontWeight: 'bold',
            marginBottom: 0,
            marginTop: '3em',
            color: "white"
          }}
        />
        <Grid textAlign='center'>
          <Grid.Column style={{ maxWidth: 600 }} >
            <Ref ref={wrapperRef}>
              <Segment style={{ borderColor: "#20c1c9", borderWidth: "3px", padding: "0px" }} >
                <Form size='large'>
                  <Input
                    size='big' fluid type='search' placeholder='Search by district...'
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
              </Segment>
            </Ref>


          </Grid.Column>
        </Grid>
      </Segment>
      <Divider horizontal>
        FOR RENTERS
      </Divider>
      <Segment style={{ padding: '8em 0em',borderWidth:"0px"}} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Let our search guide you
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                Search thousands of up-to-date property listings on our easy-to-use website. Narrow down your options by choosing what's most important to you, such as number of bedrooms and bathrooms, price range, location, pet policy and more.
                Parents can also search for rentals that fall within a particular school district.import { useHistory } from 'react-router-dom';

              </p>
              
             <Button>Start My Search</Button>
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
              <Image bordered rounded size='large' src='/log2.jpeg' />
            </Grid.Column>
          </Grid.Row>
          
        </Grid>
      </Segment>
      <Divider horizontal>
        FOR LANDLORDS
      </Divider>
      <Segment style={{ padding: '8em 0em',borderWidth:"0px" }} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={8}>
             
              <Header as='h1' style={{ fontSize: '2em' }}>
                Simple and streamlined rental management all under a single roof
              </Header>
              <Header as='h4'>
                List your rental property
              </Header>
              <p style={{ fontSize: '1.33em' }}>

                Post your rental property in minutes to reach millions of potential renters.
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Button>
              <Link to='/listproperty'>Check Them Out</Link></Button>
             
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      {/* <Segment style={{ padding: '0em',borderWidth:"0px"}} vertical>
        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                "What a Company"
              </Header>
              <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                "I shouldn't have gone with their competitor."
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                <Image avatar src='/log.jpeg' />
                <b>Nan</b> Chief Fun Officer Acme Toys
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
 */}
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Header as='h3' style={{ fontSize: '2em' }}>
            Breaking The Grid, Grabs Your Attention
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            Instead of focusing on content creation and hard work, we have learned how to master the
            art of doing nothing by providing massive amounts of whitespace and generic content that
            can seem massive, monolithic and worth your attention.
          </p>
          <Button as='a' size='large'>
            Read More
          </Button>

          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
          >
            <a href='#'>Houses</a>
          </Divider>

          <Header as='h3' style={{ fontSize: '2em' }}>
            Search By District and Base(Sefer)
          </Header>
          <Grid columns={2}>
            {multipleFiles.map((element, index) =>
              <div key={element._id}>
                <List>
                
                  <List.Item
                    as={Link} to={`/houseDistrict/${element.district}`}
                  >
                    {element.district}
                  </List.Item>
                 
                </List>
              </div>
            )}

          </Grid>

        </Container>
      </Segment>


    </div>

  )
}

export default Home

