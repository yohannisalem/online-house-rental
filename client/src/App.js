import { createMedia } from '@artsy/fresnel';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, useHistory, BrowserRouter as Router, Route } from 'react-router-dom'
import {
  Button,
  Container, Grid, Header, Icon, List, Menu,
  Segment,
  Sidebar,
  Sticky
} from 'semantic-ui-react';
import Navigator from "./components/Navigator";
import Home from "./components/pages/Home";
import SwiperSlider from './components/screen/SwiperSlider';
import FileUp from './components/screen/FileUp';
import LandlordProfile from './components/screen/LandlordProfile';

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

const DesktopContainer = ({ children }) => {
  const history = useHistory()
  const [fixed, toggleFixedBar] = useState(false)
  const showNav = () => {
    toggleFixedBar(true)
  }
  const hideNav = () => {
    toggleFixedBar(false)
  }

  const [activeItem, setActiveItem] = useState({
    name: 'home'
  })

  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
  }


  return (
    <Media greaterThan='mobile'>

      <Navigator />
      {children}
    </Media>
  )
}


DesktopContainer.propTypes = {
  children: PropTypes.node,
}

const MobileContainer = ({ children }) => {
  const [sidebarOpened, setOpenedSideBar] = useState(false)

  /* thsi is a handler for sidebar toggler */
  const handleSidebarHide = () => {
    setOpenedSideBar(false)
  }

  const handleToggle = () => {
    setOpenedSideBar(true)
  }
  const history = useHistory()
  const [activeItem, setActiveItem] = useState({
    name: 'home'
  })

  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
  }


  return (
    <Media as={Sidebar.Pushable} at='mobile'>
      <Router>
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation='overlay'
          inverted
          onHide={handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          
            <Menu.Item
              active={activeItem === 'home'}
              onClick={handleItemClick}
              as={Link}
              to={'/'}
            >
              KirayBet.com
            </Menu.Item>
            <Menu.Item
              color='red'
              active={activeItem === 'tenantscreen'}
              onClick={handleItemClick}
              as={Link}
              to={'/tenantscreen'}
            >
              Tenant Screen
            </Menu.Item>
            <Menu.Item

              active={activeItem === 'landlordscreen'}
              onClick={handleItemClick}
              as={Link}
              to={'/admin'}
            >
              * Fake Admin
            </Menu.Item>
            <Menu.Item
              active={activeItem === 'listproperty'}
              onClick={handleItemClick}
              as={Link}
              to={'/listproperty'}
            >
              List Property
            </Menu.Item>
            <Menu.Item

              active={activeItem === 'managelisting'}
              onClick={handleItemClick}

              to={'/managelisting'}
            >
              Landlord Screen
            </Menu.Item>
           
          
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
                  <Button as='a' style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <Route exact path="/"><Home /></Route>
            <Route path="/tenantscreen"><SwiperSlider /></Route>
            <Route path="/listproperty"><FileUp /></Route>
            <Route path="/managelisting"><LandlordProfile /></Route>
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
      </Router>
      
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
<Router>
<ResponsiveContainer />
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
                    <List.Item as='a'>Our Rental System</List.Item>
                    <List.Item as='a'>Rental Plans</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='Services' />
                  <List link inverted>
                    <List.Item as='a'>House Pre-Order</List.Item>
                    <List.Item as='a'>Kiray.com FAQ</List.Item>
                    <List.Item as='a'>How To Access</List.Item>
                    <List.Item as='a'>Favorite Houses</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header as='h4' inverted>
                    Terms of Service
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
</Router>
      
    </div>



  );
}

export default App;
