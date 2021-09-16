import React from 'react'

import { Card, Grid } from 'semantic-ui-react'

const src = 'https://react.semantic-ui.com/images/avatar/large/daniel.jp'
const DashBoard = () => {
    return (
        <div style={{ height: "100vh"}}>
            <Grid>
                <Grid.Column width="5"></Grid.Column>
                <Grid.Column width="11" textAlign="right" verticalAlign="middle">
                <Card.Group itemsPerRow={4}>
                <Card color='red' image={src} />
                <Card color='orange' image={src} />
                <Card color='yellow' image={src} />
                <Card color='olive' image={src} />
                <Card color='green' image={src} />
                <Card color='teal' image={src} />
                <Card color='blue' image={src} />
                <Card color='violet' image={src} />
                <Card color='purple' image={src} />
                <Card color='pink' image={src} />
                <Card color='brown' image={src} />
                <Card color='grey' image={src} />
            </Card.Group>
                </Grid.Column>
            

            </Grid>
           
        </div>
    )
}

export default DashBoard
