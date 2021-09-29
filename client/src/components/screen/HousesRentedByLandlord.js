import axios from 'axios'
import React, { createRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Divider, Grid, Header, Icon, Table } from 'semantic-ui-react'
import { useParams } from 'react-router'

const HousesRentedByLandlord = () => {
    const contextRef = createRef()
    const [multipleFiles, setMultipleFiles] = useState([]);
    
    const email = localStorage.getItem("email")
  
    const getMultipleFiles = async () => {
      try {
          const { data } = await axios.get(`http://localhost:5000/api/auth/landlordgetcontract/${email}`);
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
            
           
          </Grid>
          <Divider />
          <Table striped collapsing padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>House Id</Table.HeaderCell>
                <Table.HeaderCell>Tenant Name</Table.HeaderCell>
                <Table.HeaderCell>Landlord Name</Table.HeaderCell>
                <Table.HeaderCell>Contract Duratiion </Table.HeaderCell>
                <Table.HeaderCell>Fee Per Month</Table.HeaderCell>
                <Table.HeaderCell>Terms</Table.HeaderCell>
                
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                multipleFiles.map((contract, index) =>

                  <Table.Row>
                    <Table.Cell>
                      <Header as='h4' image>
                        <Header.Content>
                          {contract._id}
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      <Header as='h4' image>
                        <Header.Content>
                          {contract.tenantname}
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      <Header as='h4' image>
                        <Header.Content>
                          {contract.landlordname}
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      <Header as='h4' image>
                        <Header.Content>
                          {contract.contractduration}
                        </Header.Content>
                      </Header>
                    </Table.Cell>

                    <Table.Cell >
                      
                    <Header as='h4' image>
                        <Header.Content>
                          {contract.feepermonth}
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell >
                      
                    <Header as='h4' image>
                        <Header.Content>
                          {contract.termsandcondition}
                        </Header.Content>
                      </Header>
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

export default HousesRentedByLandlord
