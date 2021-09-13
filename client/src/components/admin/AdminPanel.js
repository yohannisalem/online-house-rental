import axios from 'axios'
import React, { createRef, useEffect, useState } from 'react'
import { Button, Divider, Form, Grid, Header, Icon, Input, Label, Menu, Modal, Popup, Segment, Table, TextArea, Progress } from 'semantic-ui-react'

import ContractForm from '../screen/ContractForm';
import { BrowserRouter as Router,Route,useHistory} from 'react-router-dom'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css'; 
import FeedBacks from './FeedBacks';
import Home from '../pages/Home';
import HouseList from './HouseList';
import Reports from './Reports';

const AdminPanel = () => {
  const history = useHistory()
  const contextRef = createRef()
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [opened, setisOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [openModal, setModalOpen] = useState(false)
  /* this a state declaration for a file update */

  const showConfirm = () => {
    setisOpen(true)

  }
  function hideConfirm(houseId) {
    try {
      axios.delete(`http://localhost:5000/api/deleteHouse/${houseId}`);
      console.log(`house with ${houseId} is deleted`)
    } catch (error) {
      throw error;
    }


  }

  const [activeItem, setActiveItem] = useState({
    name: 'listing'
  })

  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
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
    <div >
      <Router>
    <Route render={({ location, history }) => (
        <React.Fragment>
      <SideNav
     onSelect={(selected) => {
      const to = '/' + selected;
      if (location.pathname !== to) {
          history.push(to);
      }
  }}
  style={{marginTop:"70px",backgroundColor: "#20c1c9"}}
>
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
            <NavIcon>
            <Icon name='home'/>
            </NavIcon>
            <NavText>
                Home
            </NavText>
        </NavItem>
        <NavItem eventKey="rent">
            <NavIcon>
            <Icon name='home'/>
            </NavIcon>
            <NavText>
                Home
            </NavText>
        </NavItem>
        <NavItem eventKey="report">
            <NavIcon>
            <Icon name='alert'/>
            </NavIcon>
            <NavText>
                Home
            </NavText>
        </NavItem>
        <NavItem eventKey="feedback">
            <NavIcon>
            <Icon name='home'/>
            </NavIcon>
            <NavText>
                feedback
            </NavText>
            
        </NavItem>
        <NavItem eventKey="houses">
            <NavIcon>
            <Icon name='home'/>
            </NavIcon>
            <NavText>
                Houses
            </NavText>
            
        </NavItem>
    </SideNav.Nav>
</SideNav>
<main>
                <Route path="/houses" component={props => <HouseList/>} />
                <Route path="/feedback" component={props => <FeedBacks />} />
                <Route path="/report" component={props => <Reports />} />
                
            </main>
        </React.Fragment>
    )}
    />
</Router>
    </div>
  )
}

export default AdminPanel

