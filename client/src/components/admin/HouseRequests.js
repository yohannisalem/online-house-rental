import axios from 'axios'
import React, { createRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Divider, Grid, Header, Icon, Table } from 'semantic-ui-react'



const HouseRequests = () => {
    const contextRef = createRef()
    const [multipleFiles, setMultipleFiles] = useState([]);
    
    /* this a state declaration for a file update */
  
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
          const { data } = await axios.get('http://localhost:5000/admin/gethouserequest');
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
                <Table.HeaderCell>Employee</Table.HeaderCell>
                <Table.HeaderCell>Correct Guesses</Table.HeaderCell>
                <Table.HeaderCell>Correct Guesses</Table.HeaderCell>
                <Table.HeaderCell>Correct Guesses</Table.HeaderCell>
                <Table.HeaderCell>Send Appointment</Table.HeaderCell>
                <Table.HeaderCell>Send Contract Form</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                multipleFiles.map((house, index) =>

                  <Table.Row>
                    <Table.Cell>
                      <Header as='h4' image>
                        <Header.Content>
                          {house.tenantId}
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      <Header as='h4' image>
                        <Header.Content>
                          {house.houseId}
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      <Header as='h4' image>
                        <Header.Content>
                          {house.tenantPhone}
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      <Header as='h4' image>
                        <Header.Content>
                          {house.tenantEmail}
                        </Header.Content>
                      </Header>
                    </Table.Cell>

                    <Table.Cell>
                      <Link >
                        <Icon name='calendar alternate outline' />
                      </Link>

                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/sendcontract/${house._id}`}>
                        <Icon name='wpforms' />
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

export default HouseRequests
