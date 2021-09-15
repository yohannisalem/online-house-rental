import React,{useState,useEffect} from 'react'
import { Icon } from 'semantic-ui-react'
import { BrowserRouter as Router,Route,useHistory} from 'react-router-dom'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import HouseList from '../admin/HouseList';
import LandlordAccountReview from './LandlordAccountReview';
import ContractForm from './ContractForm';
import FeedBack from './FeedBack';
import ReportIssue from './ReportIssue';

const LandlordProfile = () => {
  const [error, setError] = useState("")
  const history = useHistory()
  useEffect(() => {
    if (!localStorage.getItem("landlordToken")) {
      history.push("/landlordLogin")
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
              <Route path="/managelisting" component={props => <HouseList />} />
              <Route path="/profile" component={props => <LandlordAccountReview />} />
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

export default LandlordProfile
