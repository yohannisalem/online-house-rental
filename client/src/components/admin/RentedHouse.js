import axios from 'axios'
import React, { createRef, useEffect, useState } from 'react'
import { Link, BrowserRouter as Router, Route } from 'react-router-dom'
import { Button, Divider, Form, Grid, Header, Icon, Input, Label, Menu, Modal, Popup, Segment, Table, TextArea, Progress } from 'semantic-ui-react'


const RentedHouse = () => {
    const contextRef = createRef()
    const [multipleFiles, setMultipleFiles] = useState([]);
    
    /* this a state declaration for a file update */
  
   
    const getMultipleFiles = async () => {
      try {
          const { data } = await axios.get('http://localhost:5000/admin/rentedhouse');
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
        <div style={{minHeight:"100vh"}}>
        <Grid textAlign='right'>
<Grid.Column width='3'>

</Grid.Column>
        <Grid.Column width='13' textAlign='right'>
      
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
            <Table.HeaderCell>House</Table.HeaderCell>
            <Table.HeaderCell>Tenant Name</Table.HeaderCell>
            <Table.HeaderCell>Landlord Name</Table.HeaderCell>
            <Table.HeaderCell>Terms</Table.HeaderCell>
            <Table.HeaderCell>Lease Period</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            multipleFiles.map((house, index) =>

              <Table.Row>
                <Table.Cell>
                  <Header as='h4' image>
                    <Header.Content>
                      {house.houseid}
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Header as='h4' image>
                    <Header.Content>
                      {house.tenantname}
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Header as='h4' image>
                    <Header.Content>
                      {house.landlordname}
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Header as='h4' image>
                    <Header.Content>
                      {house.termsandcondition}
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  <Header as='h4' image>
                    <Header.Content>
                      {house.contractduration}
                    </Header.Content>
                  </Header>
                </Table.Cell>

                <Table.Cell>
                  <Link >
                    <Icon name='trash' />
                  </Link>

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

export default RentedHouse
