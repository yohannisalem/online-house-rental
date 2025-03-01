import SideNav, { NavIcon, NavItem, NavText } from '@trendmicro/react-sidenav';
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import axios from 'axios';
import React, { createRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import FeedBacks from './FeedBacks';
import HouseList from './HouseList';
import HouseRequests from './HouseRequests';
import LandlordList from './LandlordList';
import RentedHouse from './RentedHouse';
import Reports from './Reports';
import SendAppointment from './SendAppointment';
import SendContract from './SendContract';
import TenantList from './TenantList';



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
        if (!localStorage.getItem("adminToken")) {
            history.push("/adminLogin")
          }
        getMultipleFilesList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div >
            <Router>
                <Route render={({ location, history }) => (
                    <React.Fragment>
                        <SideNav
                           expanded
                            onSelect={(selected) => {
                                const to = '/' + selected;
                                if (location.pathname !== to) {
                                    history.push(to);
                                }
                            }}
                            style={{ marginTop: "70px", backgroundColor: "#20c1c9" }}
                        >
                            <SideNav.Toggle />
                            <SideNav.Nav defaultSelected="admin">
                                <NavItem eventKey="admin">
                                    <NavIcon>
                                        <Icon name='home' />
                                    </NavIcon>
                                    <NavText>
                                        DashBoard
                                    </NavText>
                                </NavItem>
                                
                                <NavItem eventKey="rent">
                                    <NavIcon>
                                        <Icon name='home' />
                                    </NavIcon>
                                    <NavText>
                                        Rented Houses
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="report">
                                    <NavIcon>
                                        <Icon name='alert' />
                                    </NavIcon>
                                    <NavText>
                                        Report
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="feedback">
                                    <NavIcon>
                                        <Icon name='home' />
                                    </NavIcon>
                                    <NavText>
                                        Feedback
                                    </NavText>

                                </NavItem>
                                <NavItem eventKey="houses">
                                    <NavIcon>
                                        <Icon name='home' />
                                    </NavIcon>
                                    <NavText>
                                        Houses
                                    </NavText>

                                </NavItem>
                                <NavItem eventKey="landlords">
                                    <NavIcon>
                                        <Icon name='home' />
                                    </NavIcon>
                                    <NavText>
                                        Landlords
                                    </NavText>

                                </NavItem>
                                <NavItem eventKey="tenants">
                                    <NavIcon>
                                        <Icon name='home' />
                                    </NavIcon>
                                    <NavText>
                                        Tenants
                                    </NavText>

                                </NavItem>
                              
                            </SideNav.Nav>
                        </SideNav>
                        <main>

                            <Route path="/admin" component={props => <HouseRequests />} />
                            <Route path="/houses" component={props => <HouseList />} />
                            <Route path="/feedback" component={props => <FeedBacks />} />
                            <Route path="/report" component={props => <Reports />} />
                            <Route path="/appointment/:id" component={props => <SendAppointment />} />
                            <Route path="/tenants" component={props => <TenantList />} />
                            <Route path="/landlords" component={props => <LandlordList />} />
                            <Route path="/sendcontract/:id" component={props => <SendContract />} />
                            <Route path="/rent" component={props => <RentedHouse />} />
                            

                        </main>
                    </React.Fragment>
                )}
                />
            </Router>
        </div>
    )
}

export default AdminPanel

