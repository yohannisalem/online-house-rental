import React from 'react'
import { List, Datagrid, TextField, EmailField,DeleteButton,EditButton} from 'react-admin';

const PostList = (props) => {
    return (
        <List {...props}>
        <Datagrid rowClick="edit">

            <TextField source="id" />
            <TextField source="housename" />
            <TextField source="district" />
            <TextField source="sefer" />
            <TextField source="propertytype" />
            <TextField source="location" />
            <TextField source="feepermonth" />
            <TextField source="description" />
            <TextField source="numberofbeds" />
            <TextField source="available" />
            <TextField source="files" />
            <TextField source="video" />
             
        </Datagrid>
    </List>
        
            
       
    )
}

export default PostList
