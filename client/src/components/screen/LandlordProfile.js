import axios from 'axios'
import React, { createRef, useEffect, useState } from 'react'
import { Link,BrowserRouter as Router, Route} from 'react-router-dom'
import { Button, Divider, Form, Grid, Header, Icon, Input, Label, Menu, Modal, Popup, Segment, Table, TextArea, Progress } from 'semantic-ui-react'
import storage from "../../firebase"
import Login from './Login';
import ContractForm from './ContractForm';
import LandlordLogin from './LandlordLogin'
import FeedBack from './FeedBack';
const LandlordProfile = () => {
  const contextRef = createRef()
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [opened, setisOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [openModal, setModalOpen] = useState(false)
  /* this a state declaration for a file update */
  const [housename, setHousename] = useState('')
  const [description, setDescription] = useState('')
  const [numberofbeds, setNumberOfBeds] = useState(0)
  const [district, setDistrict] = useState('')
  const [sefer, setSefer] = useState('')
  const [feepermonth, setFeeperMonth] = useState(0)
  const [size, setSize] = useState(0)
  const [available, setAvailable] = useState(false)
  const [propertytype, setPropertytype] = useState('')
  const [video, setVideo] = useState(null)
  const [imageUrls, setImageUrls] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);


  const handleChange = (e) => {
    e.preventDefault()
    console.log(e.target.name)
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setFiles((prevState) => [...prevState, newImage]);
    }
  };
  const handleVideoChange = (e) => {
    e.preventDefault()
    setVideo(e.target.files[0])

  }
  const handleNameChange = (e) => {
    setHousename(e.target.value)
    console.log(housename)
  }
  const handleDescrptionChange = (e) => {
    setDescription(e.target.value)
  }
  const handleDestrictChange = (e) => {
    setDistrict(e.target.value)
  }
  const handleSeferChange = (e) => {
    setSefer(e.target.value)
  }
  const handleTypeChange = (e) => {
    setPropertytype(e.target.value)
  }
  const handleFeeChange = (e) => {
    setFeeperMonth(e.target.value)
  }
  const handleSizeChange = (e) => {
    setSize(e.target.value)
  }
  const handleAvailableChange = (e) => {
    setAvailable(e.target.value)
  }
  const handleBedChange = (e) => {
    setNumberOfBeds(e.target.value)
  }
  const updateHouse = async (housedata, houseId) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(`http://localhost:5000/api/updateHouse/${houseId}`, housedata, config);
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  };
  const handleMultipleFileSubmit = async (id) => {
    const formData = new FormData();
    formData.append('housename', housename);
    formData.append('description', description);
    formData.append('district', district);
    formData.append('sefer', sefer);
    formData.append('numberofbeds', numberofbeds);
    formData.append('size', size);
    formData.append('feepermonth', feepermonth);
    formData.append('available', available);
    formData.append('propertytype', propertytype);
    formData.append('video', videoUrls);
    for (let i = 0; i < imageUrls.length; i++) {
      formData.append('files', imageUrls[i]);
    }

    await updateHouse(formData, id);
    console.log(formData)

  }
  const handleUpload = () => {
    const promises = [];
    const uploadTaskTwo = storage.ref(`images/${video.name}`).put(video)
    promises.push(uploadTaskTwo);
    uploadTaskTwo.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        const urls = await storage.ref("images").child(video.name).getDownloadURL()
        setVideoUrls((prevState) => [...prevState, urls]);
        console.log("this is a video part", urls)

      }

    )

    files.map((image) => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          const urls = await storage.ref("images").child(image.name).getDownloadURL();
          setImageUrls((prevState) => [...prevState, urls]);
          console.log("this is a iamge part", urls)

        }
      );

    });
    Promise.all(promises)
      .then(
        () => alert("All images uploaded")
      ).then()
      .catch((err) => console.log(err));

  };
  const showConfirm = () => {
    setisOpen(true)

  }
  function hideConfirm(houseId) {
    try {
      axios.delete(`http://localhost:5000/api/deleteHouse/${houseId}`);
      console.log(`house with ${houseId} is deleted`)
    } catch (error) {
      throw error;
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
  useEffect(() => {
    getMultipleFilesList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [activeItem,setActiveItem] = useState({
    name:'listing'
})

const handleItemClick =(e,{name})=>{
    setActiveItem(name)
}

  return (
    <div ref={contextRef}>
      <Grid>
        <Grid.Column width={3}>
          <Segment
            textAlign='center'
            style={{ height: "100vh", backgroundColor: "#f0f2f2" }}
            raised
          >
           
            <Menu color='teal' vertical secondary fluid>
            
            <Menu.Item
              active={activeItem ==='listing'}
              onClick={handleItemClick}
              as={Link}
              to={'/managelisting'}
            >
              Manage Listing
            </Menu.Item>
            <Menu.Item
              color='red'
              active={activeItem === 'profile'}
              onClick={handleItemClick}
              as={Link}
              to={'/profile'}
            >
             My Account
            </Menu.Item>
            <Menu.Item
              name='contractdetail'
              active={activeItem === 'contractdetail'}
              onClick={handleItemClick}
              as={Link}
              to={'/reviewcontract'}
            >
            Review Contract
            </Menu.Item>
            <Menu.Item
              name='feedback'
              active={activeItem === 'feedback'}
              onClick={handleItemClick}
              as={Link}
              to={'/feedback'}
            >
            FeedBack
            </Menu.Item>
        </Menu>
               
            
            

          </Segment>
        </Grid.Column>


        <Grid.Column width='13'>
        <Router>
        
                <Route path="/profile"><Login/></Route>
                <Route path="/reviewcontract"><ContractForm/></Route>
                <Route path="/feedback" ><FeedBack/></Route>
                
            </Router>
          <Grid style={{ marginTop: "20px" }} verticalAlign='middle'>
            <Grid.Column floated='left' width={13}>
              My Listing
            </Grid.Column>
            <Grid.Column floated='right' width={3}>
              <Button>
                <Icon name='plus' />
                Add Listing
              </Button>
            </Grid.Column>
          </Grid>
          <Divider />
          <Table basic='very' celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Employee</Table.HeaderCell>
                <Table.HeaderCell>Correct Guesses</Table.HeaderCell>
                <Table.HeaderCell>Correct Guesses</Table.HeaderCell>
                <Table.HeaderCell>Correct Guesses</Table.HeaderCell>
                <Table.HeaderCell>Correct Guesses</Table.HeaderCell>
                <Table.HeaderCell>Correct Guesses</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                multipleFiles.map((house, index) =>

                  <Table.Row>
                    <Table.Cell>
                      <Header as='h4' image>
                        <Header.Content>
                          {house.housename}
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      <Header as='h4' image>
                        <Header.Content>
                          {house.description}
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      <Header as='h4' image>
                        <Header.Content>
                          {house.sefer}
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      <Header as='h4' image>
                        <Header.Content>
                          {house._id}
                        </Header.Content>
                      </Header>
                    </Table.Cell>

                    <Table.Cell>
                      <Icon name='plus' onClick={() => setOpen(true)} />
                      <Modal
                        open={open}
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        content={house.housename}
                        style={{ maxWidth: "400px", textAlign: "center" }}
                      >

                      </Modal>
                      <Popup trigger={<Icon name='edit' />} flowing hoverable position='right center'>
                        <Grid>
                          <Grid.Column textAlign='center'>
                            <Form>
                              <Segment raised >
                                <Progress percent={progress} success progress />
                                <Form.Field
                                  required
                                  id='form-input-control-last-name'
                                  control={Input}
                                  name='housename'
                                  type='text'
                                  label='House Name'
                                  placeholder='house name'
                                  onChange={handleNameChange}
                                />
                                <Form.Field
                                  required
                                  id='property type'
                                  control={Input}
                                  label='Property Type'
                                  name='propertytype'
                                  placeholder='property type'
                                  onChange={handleTypeChange}
                                />

                                <Form.Field
                                  required
                                  id='district'
                                  control={Input}
                                  label='District'
                                  name='district'
                                  placeholder='District or Sub City'
                                  onChange={handleDestrictChange}
                                />
                                <Form.Field
                                  required
                                  id='form-input-control-last-name'
                                  control={Input}
                                  label='Sefer'
                                  name='sefer'
                                  placeholder='Sefer or Village'
                                  onChange={handleSeferChange}
                                />
                                <Form.Field
                                  required
                                  id='form-input-control-last-name'
                                  control={TextArea}
                                  label='Description'
                                  name='description'
                                  placeholder='House description'
                                  onChange={handleDescrptionChange}

                                />
                                <Form.Field
                                  required
                                  id='form-input-control-last-name'
                                  control={Input}
                                  type="number"
                                  name='size'
                                  label='Square Footage'
                                  placeholder='Size of a house'
                                  onChange={handleSizeChange}
                                  value={size}
                                />
                                <Form.Field
                                  required
                                  id='form-input-control-last-name'
                                  control={Input}
                                  type="number"
                                  name='feepermonth'
                                  label='Lease Fee'
                                  placeholder='Fee'
                                  onChange={handleFeeChange}
                                />
                                <Form.Field
                                  required
                                  id='form-input-control-last-name'
                                  control={Input}
                                  type="number"
                                  name='numberofbeds'
                                  label='Number of Beds'
                                  placeholder='beds'
                                  onChange={handleBedChange}
                                />
                                <Form.Field
                                  required
                                  control={Input}
                                  type="file"
                                  name="files"
                                  multiple
                                  label='Photos of the House'
                                  icon='upload'
                                  onChange={handleChange}
                                />
                                <Form.Field
                                  required
                                  id='form-input-control-last-name'
                                  control={Input}
                                  type="file"
                                  name="video"
                                  label='Videos about the house'
                                  onChange={handleVideoChange}

                                />

                                <select name="available" id="available" onChange={handleAvailableChange}>
                                  <option value="false">No</option>
                                  <option value="true">Yes</option>
                                </select>
                                <button onClick={handleUpload}>confirm Update</button>
                                <button onClick={() => handleMultipleFileSubmit(house._id)}>Update</button>

                              </Segment>
                            </Form>
                          </Grid.Column>

                        </Grid>
                      </Popup>

                    </Table.Cell>
                    <Table.Cell>
                      <Button onClick={() => hideConfirm(house._id)}><Icon name='trash' /></Button>


                    </Table.Cell>
                  </Table.Row>



                )}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default LandlordProfile
