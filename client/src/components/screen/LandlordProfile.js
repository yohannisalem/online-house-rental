import axios from 'axios'
import React, { createRef, useEffect, useState } from 'react'
import { Link, BrowserRouter as Router, Route } from 'react-router-dom'
import { Button, Divider, Form, Grid, Header, Icon, Input, Label, Menu, Modal, Popup, Segment, Table, TextArea, Progress } from 'semantic-ui-react'

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

  const [activeItem, setActiveItem] = useState({
    name: 'listing'
  })

  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
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
                active={activeItem === 'listing'}
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

            <Route path="/profile"><Login /></Route>
            <Route path="/reviewcontract"><ContractForm /></Route>

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
                      <Link to={`/edithouse/${house._id}`}>
                        <Icon name='edit' />
                      </Link>

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
