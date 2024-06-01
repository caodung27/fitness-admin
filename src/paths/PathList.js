import * as React from 'react';
import { List, Datagrid, TextField, DateField, EditButton, DeleteButton, TextInput, Filter, SelectInput, DateInput } from 'react-admin';

// Define a Filter component for the search bar
const PathFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <SelectInput source="type" choices={[
            { id: 'Walking', name: 'Walking' },
            { id: 'Running', name: 'Running' },
            { id: 'Cycling', name: 'Cycling' }
        ]} />
        <TextInput label="Start Latitude" source="start.coordinates[0]" />
        <TextInput label="Start Longitude" source="start.coordinates[1]" />
        <TextInput label="End Latitude" source="end.coordinates[0]" />
        <TextInput label="End Longitude" source="end.coordinates[1]" />
        <DateInput label="Created At" source="createdAt" />
    </Filter>
);

export const PathList = (props) => (
    <List filters={<PathFilter />} sort={{ field: 'type', order: 'ASC' }} {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="type" />
            <TextField source="start.coordinates[0]" label="Start Latitude" />
            <TextField source="start.coordinates[1]" label="Start Longitude" />
            <TextField source="end.coordinates[0]" label="End Latitude" />
            <TextField source="end.coordinates[1]" label="End Longitude" />
            <TextField source="speed" />
            <DateField source="createdAt" label="Created At" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);
