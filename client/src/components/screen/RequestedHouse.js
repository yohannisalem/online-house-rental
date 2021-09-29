
import axios from 'axios'
import React, { createRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Divider, Grid, Header, Icon, Table } from 'semantic-ui-react'

const RequestedHouse = () => {
    const contextRef = createRef()
    const [multipleFiles, setMultipleFiles] = useState([]);
    
    const email = localStorage.getItem("tenantEmail")
    function calcelRequest() {
      try {
        axios.delete(`http://localhost:5000/api/cancelhouserequest/${email}`);
        alert("you have canceled your request for a house")
      } catch (error) {
        throw error;
      }
  
  
    }
  
    const getMultipleFiles = async () => {
      try {
          const { data } = await axios.get(`http://localhost:5000/api/getrequestedHouse/${email}`);
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
        <div>
            <Grid textAlign='right'>
<Grid.Column width='3'>

</Grid.Column>
            <Grid.Column width='13' textAlign='right'>
          
          <Grid style={{ marginTop: "20px" }} verticalAlign='middle'>
            <Grid.Column floated='right' width={3}>
              <Link to='/tenantscreen'>
              request house
              </Link>
            </Grid.Column>
          </Grid>
          <Divider />
          <Table basic='very' celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>House Id</Table.HeaderCell>
                <Table.HeaderCell>Tenant Email</Table.HeaderCell>
                <Table.HeaderCell>Tenant Phone</Table.HeaderCell>
                <Table.HeaderCell>Landlord UserName</Table.HeaderCell>
                <Table.HeaderCell>Terms and Condition</Table.HeaderCell>
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
                          {house._id}
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
                      <Header as='h4' image>
                        <Header.Content>
                          {house.tenantPhone}
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      <Header as='h4' image>
                        <Header.Content>
                          {house.landlordusername}
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
                      <Button onClick={calcelRequest}>Cancel Request</Button>


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

export default RequestedHouse
