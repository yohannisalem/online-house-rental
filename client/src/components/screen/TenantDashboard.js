import SideNav, { NavItem, NavText } from '@trendmicro/react-sidenav';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import HouseList from '../admin/HouseList';
import ContractForm from './ContractForm';
import FeedBack from './FeedBack';
import LandlordAccountReview from './LandlordAccountReview';
import ReportIssue from './ReportIssue';
import RequestedHouse from './RequestedHouse';
import TenantProfile from './TenantProfile';
const TenantDashboard = () => {
    const [error, setError] = useState("")
    const history = useHistory()
    useEffect(() => {
      if (!localStorage.getItem("authToken")) {
        history.push("/login")
      }
     /*  const fetchPrivateDate = async () => {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("landlordToken")}`,
          },
        };
  
        try {
          const { data } = await axios.get("http://localhost:5000/api/private", config);
  
        } catch (error) {
          
          setError("You are not authorized please login");
        }
      };
  
      fetchPrivateDate();  */
    }, []);
    return (
        <div style={{minHeight:"100vh"}}>
            <Router>
        <Route render={({ location, history }) => (
          <React.Fragment>
            <SideNav
            expanded
            closeIcon={false}
              onSelect={(selected) => {
                const to = '/' + selected;
                if (location.pathname !== to) {
                  history.push(to);
                }
              }}
              style={{ marginTop: "70px", backgroundColor: "gray" }}
            >
              <SideNav.Toggle />
              <SideNav.Nav defaultSelected="managelisting">
                <NavItem eventKey="managelisting">
                 
                  <NavText>
                    Rented House
                  </NavText>
                </NavItem>
                <NavItem eventKey="requestedhouse">
                 
                  <NavText>
                    Requested House
                  </NavText>
                </NavItem>
                <NavItem eventKey="tenantprofile">
                 
                  <NavText>
                    Account Profile
                  </NavText>
                </NavItem>
                <NavItem eventKey="reviewcontract">
                
                  <NavText>
                    Contract
                  </NavText>
                </NavItem>
                <NavItem eventKey="feedback">
                
                  <NavText>
                    FeedBack
                  </NavText>
                </NavItem>
                <NavItem eventKey="report">
               
                  <NavText>
                    Report
                  </NavText>

                </NavItem>

              </SideNav.Nav>
            </SideNav>
            <main>
              
              <Route path="/requestedhouse" component={props => <RequestedHouse />} />
              <Route path="/tenantprofile" component={props => <TenantProfile />} />
              <Route path="/reviewcontract" component={props => <ContractForm />} />
              <Route path="/feedback" component={props => <FeedBack />} />
              <Route path="/report" component={props => <ReportIssue />} />

            </main>
          </React.Fragment>
        )}
        />
      </Router>
        </div>
    )
}

export default TenantDashboard
