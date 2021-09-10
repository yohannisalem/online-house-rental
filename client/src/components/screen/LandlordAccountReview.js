import React from 'react'
import { Grid,Icon,Divider,Button, } from 'semantic-ui-react'
const LandlordAccountReview = () => {
    return (
        <div style={{minHeight:"100vh"}}>
            <Grid>
        <Grid.Column width={3}>
         siome jlfjlj
        </Grid.Column>


        <Grid.Column width='13'>
        
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
         
        </Grid.Column>
      </Grid>
        
        </div>
    )
}

export default LandlordAccountReview
