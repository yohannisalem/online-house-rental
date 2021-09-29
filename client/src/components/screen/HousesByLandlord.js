import axios from 'axios'
import React, { createRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Divider, Grid, Header, Icon, Table } from 'semantic-ui-react'
import { useParams } from 'react-router'

const HousesByLandlord = () => {
    const contextRef = createRef()
    const [multipleFiles, setMultipleFiles] = useState([]);
    
    const email = localStorage.getItem("email")
  
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
          const { data } = await axios.get(`http://localhost:5000/api/returnownershouse/${email}`);
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
            
            </Grid.Column>
            <Grid.Column floated='right' width={3}>
              <Link to='/listproperty'>
                <Icon name='plus' />
                Add Listing
                </Link> 
            </Grid.Column>
          </Grid>
          <Divider />
          <Table striped collapsing padded>
            <Table.Header>
              <Table.Row>
              <Table.HeaderCell>House Id</Table.HeaderCell>
                <Table.HeaderCell>House Name</Table.HeaderCell>
                <Table.HeaderCell>House Description </Table.HeaderCell>
                
                <Table.HeaderCell>House District</Table.HeaderCell>
                <Table.HeaderCell>Lease Fee</Table.HeaderCell>
                <Table.HeaderCell>Terms and Condition</Table.HeaderCell>
                <Table.HeaderCell>Edit House</Table.HeaderCell>
                <Table.HeaderCell>Remove House</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                multipleFiles.map((house, index) =>

                  <Table.Row>
                     <Table.Cell>
                      <Header as='h4' image>
                        <Header.Content>
                          {house._id}
                        </Header.Content>
                      </Header>
                    </Table.Cell>
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
                          {house.district}
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      <Header as='h4' image>
                        <Header.Content>
                          {house.feepermonth}
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
                   

                    <Table.Cell textAlign='center'>
                      <Link to={`/edithouse/${house._id}`}>
                        <Icon name='edit' />
                      </Link>

                    </Table.Cell>
                    <Table.Cell textAlign='center'>
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

export default HousesByLandlord
