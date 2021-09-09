import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Dropdown, Menu } from 'semantic-ui-react'

const NavBar = (props) => {
  /* this is a handler for a navbar link item */
  const history = useHistory()
   const [activeItem,setActiveItem] = useState({
     name:'home'
   })

   const handleItemClick =(e,{name})=>{
     setActiveItem(name)
   }

    return (
        <div>

            <Menu 
            size='large'
            color='teal' 
            pointing 
            borderless
            style={{height:'70px'}}
           >
            
            <Menu.Item
              active={activeItem ==='home'}
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
              as={Link}
              to={'/managelisting'}
            >
            Manage Listing
            </Menu.Item>
            <Menu.Menu position='right'>
            <Menu.Item >
            <Dropdown
              text='LogIn'
              floating
              labeled
              button
              icon={null}
              style={{ marginRight: '0.5em' }}
            >
                  <Dropdown.Menu >
                    <Dropdown.Item 
                    as={Link}
                    to={'/landlordLogin'}
                    >LandLords Login</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                    onClick={history.push('/login')}
                    as={Link}
                    to={'/login'}
                    >Tenants Login</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
              <span>
                <pre>
                  |
                </pre>
              </span>
              <Dropdown
                text='SignUp'
                direction='left'
                floating
                labeled
                button
                icon={null}
                style={{ marginLeft: '0.5em' }}
              >
                  <Dropdown.Menu >
                  <Dropdown.Item
                  as={Link}
                  to={'/landlordRegister'}
                  >LandLords SignUp</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                    as={Link}
                    to={'/register'}
                    >Tenants SignUp</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
                      
                     
            </Menu.Item>
            <Menu.Item>
              profile
            </Menu.Item>
            </Menu.Menu>
           </Menu>
          
        </div>
    )
}

export default NavBar
