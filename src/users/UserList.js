import * as React from 'react';
import { List, Datagrid, TextField, EmailField, EditButton, DeleteButton, TextInput, Filter, NumberInput } from 'react-admin';

// Define a Filter component for the search bar
const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <TextInput label="Name" source="name" />
        <TextInput label="Email" source="email" />
        <TextInput label="Gender" source="gender" />
        <NumberInput label="Age" source="age" />
        <NumberInput label="Weight" source="weight" />
        <NumberInput label="Height" source="height" />
        <TextInput label="Location" source="location" />
    </Filter>
);

export const UserList = (props) => (
    <List filters={<UserFilter />} sort={{ field: 'name', order: 'ASC' }} {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
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
