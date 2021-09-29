import React,{useState,useEffect} from 'react'
import { Icon } from 'semantic-ui-react'
import { BrowserRouter as Router,Route,useHistory} from 'react-router-dom'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import LandlordAccountReview from './LandlordAccountReview';

import FeedBack from './FeedBack';
import ReportIssue from './ReportIssue';
import HousesByLandlord from './HousesByLandlord';
import HousesRentedByLandlord from './HousesRentedByLandlord';

const LandlordProfile = () => {
  const [error, setError] = useState("")
  const [logged, setlogged] = useState("")
  const history = useHistory()
 
 

  let token;
  useEffect(() => {
    setTimeout(() => {
       token = localStorage.getItem("landlordToken");
       if (!token) {
        history.push("/landlordLogin")
        
      }
    }, 2000);
  
  
  }, [token]);
  return (
    <div >

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
                    MangageListing
                  </NavText>
                </NavItem>
                <NavItem eventKey="profile">
                 
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
              <Route path="/managelisting" component={props => <HousesByLandlord />} />
              <Route path="/profile" component={props => <LandlordAccountReview />} />
              <Route path="/reviewcontract" component={props => <HousesRentedByLandlord />} />
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

export default LandlordProfile
