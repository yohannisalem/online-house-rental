import React from 'react'
import { Button, Divider, Grid, Icon, Label, Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import PostList from './PostList';
const AdminPanel = () => {
    return (
      <div>
        <Admin dataProvider={simpleRestProvider('http://localhost:5000/api')}>
          <Resource name="getMultipleFiles" list={PostList}/>
          <Resource name="Users" list={PostList}/>
          <Resource name="District" list={PostList}/>
          <Resource name="Account" list={PostList}/>
        </Admin>

      </div>
    )
}

export default AdminPanel
