import * as React from 'react';
import { List, Datagrid, TextField, DateField, EditButton, DeleteButton } from 'react-admin';

export const PathList = (props) => (
    <List {...props}>
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
