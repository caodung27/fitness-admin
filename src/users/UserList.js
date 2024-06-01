import * as React from 'react';
import { List, Datagrid, TextField, EmailField, EditButton, DeleteButton } from 'react-admin';

export const UserList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="password" />
            <TextField source="gender" />
            <TextField source="age" />
            <TextField source="weight" />
            <TextField source="height" />
            <TextField source="phone" />
            <TextField source="location" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);
