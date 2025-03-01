import axios from 'axios'
import React, { createRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Divider, Grid, Header, Icon, Table } from 'semantic-ui-react'


const HouseList = () => {
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
        <div style={{minHeight:"100vh"}}>
            <Grid textAlign='right'>
<Grid.Column width='3'>

</Grid.Column>
            <Grid.Column width='13' textAlign='right'>
         
          <Divider />
          <Table striped collapsing padded>
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

export default HouseList
