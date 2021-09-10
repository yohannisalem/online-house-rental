import { createMedia } from '@artsy/fresnel';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Container, Grid, Header, Icon, List, Menu,
  Segment,
  Sidebar,
  Sticky
} from 'semantic-ui-react';
import Navigator from "./components/Navigator";
import Home from "./components/pages/Home";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

const DesktopContainer=({children})=>{
  const history = useHistory()
  const [fixed,toggleFixedBar] = useState(false)
  const showNav =()=>{
    toggleFixedBar(true)
  }
  const hideNav =()=>{
    toggleFixedBar(false)
  }

  const [activeItem,setActiveItem] = useState({
    name:'home'
  })

  const handleItemClick =(e,{name})=>{
    setActiveItem(name)
  }
  
  
   return (
     <Media greaterThan='mobile'>
       
           <Navigator/>
       {children}
     </Media>
   )
 }


DesktopContainer.propTypes = {
 children: PropTypes.node,
}

const MobileContainer =({children})=>{
  const [sidebarOpened, setOpenedSideBar] = useState(false)

/* thsi is a handler for sidebar toggler */
  const handleSidebarHide = () => {
    setOpenedSideBar(false)
  }

  const handleToggle = () =>{
    setOpenedSideBar(true)
  }


    return (
      <Media as={Sidebar.Pushable} at='mobile'>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='overlay'
            inverted
            onHide={handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as='a' active>
              Home
            </Menu.Item>
            <Menu.Item as='a'>Work</Menu.Item>
            <Menu.Item as='a'>Company</Menu.Item>
            <Menu.Item as='a'>Careers</Menu.Item>
            <Menu.Item as='a'>Log in</Menu.Item>
            <Menu.Item as='a'>Sign Up</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu pointing secondary size='large'>
                  <Menu.Item onClick={handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' >
                      Log in
                    </Button>
                    <Button as='a'style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
              <Home/>
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    )
  }


MobileContainer.propTypes = {
  children: PropTypes.node,
}
const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

function App() {
 
  return (
    <div >

      <ResponsiveContainer/>
      <Sticky bottomOffset={0} >

      <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as='h4' content='About' />
                <List link inverted>
                  <List.Item as='a'>Sitemap</List.Item>
                  <List.Item as='a'>Contact Us</List.Item>
                  <List.Item as='a'>Religious Ceremonies</List.Item>
                  <List.Item as='a'>Gazebo Plans</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as='h4' content='Services' />
                <List link inverted>
                  <List.Item as='a'>Banana Pre-Order</List.Item>
                  <List.Item as='a'>DNA FAQ</List.Item>
                  <List.Item as='a'>How To Access</List.Item>
                  <List.Item as='a'>Favorite X-Men</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as='h4' inverted>
                  Footer Header
                </Header>
                <p>
                  Extra space for a call to action inside the footer that could help re-engage users.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
      </Sticky>
    </div>
      
    
    
  );
}

export default App;
