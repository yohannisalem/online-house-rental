import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from './NavBar'
import About from './pages/About'
import Home from './pages/Home'
import PrivateRoute from './routing/PrivateRoute'
import FileUp from './screen/FileUp'
import HouseDetails from './screen/HouseDetails'
import HousesInTheSameDistrict from './screen/HousesInTheSameDistrict'
import LandlordLogin from './screen/LandlordLogin'
import LandlordProfile from './screen/LandlordProfile'
import LandlordRegister from './screen/LandlordRegister'
import Login from './screen/Login'
import Register from './screen/Register'
import SwiperSlider from './screen/SwiperSlider'
import ContractForm from './screen/ContractForm'
import AdminPanel from './admin/AdminPanel';
import LandlordAccountReview from './screen/LandlordAccountReview';
import ReportIssue from './screen/ReportIssue';
import EditHouse from './screen/EditHouse';
import FeedBack from './screen/FeedBack';
import TenantDashboard from './screen/TenantDashboard';
import AdminRoute from './routing/AdminRoute';
import AdminLogin from './admin/AdminLogin';
import ForgotPassword from './screen/ForgotPassword';
import LandlordForgotPassword from './screen/LandlordForgotPassword';


const Navigator = () => {
    return (
        <div>
            <Router>
                <NavBar/>
                
                <Route exact path="/"><Home/></Route>
                <Route path="/forgotpassword"><ForgotPassword/></Route>
                <Route path="/landlordforgotpassword"><LandlordForgotPassword/></Route>
                <Route path="/login"><Login/></Route>
                <Route path="/register"><Register/></Route>
                <Route path="/landlordLogin"><LandlordLogin/></Route>
                <Route path="/adminLogin"><AdminLogin/></Route>
                <Route path="/landlordRegister"><LandlordRegister/></Route>
                <Route path="/profile"><LandlordAccountReview/></Route>
                <Route path="/tenantdashboard"><TenantDashboard/></Route>
                <PrivateRoute path="/managelisting"><LandlordProfile/></PrivateRoute>
                <AdminRoute path="/admin"><AdminPanel/></AdminRoute>
                <Route path="/edithouse/:houseId"><EditHouse/></Route>
                <Route path="/reportissue"><ReportIssue/></Route>
                <Route path="/feedback"><FeedBack/></Route>
                <PrivateRoute path="/listproperty"><FileUp/></PrivateRoute>
                <Route path="/tenantscreen"><SwiperSlider/></Route>
                <Route path="/contract/:id"><ContractForm/></Route>
                <Route path="/houseDetails/:productId"><HouseDetails/></Route>
                <Route path="/houseDistrict/:district"><HousesInTheSameDistrict/></Route>

            </Router>
        </div>
    )
}

export default Navigator
