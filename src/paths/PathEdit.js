import * as React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput, DateInput } from 'react-admin';

export const PathEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="type" />
            <NumberInput source="start.coordinates[0]" label="Start Latitude" />
            <NumberInput source="start.coordinates[1]" label="Start Longitude" />
            <NumberInput source="end.coordinates[0]" label="End Latitude" />
            <NumberInput source="end.coordinates[1]" label="End Longitude" />
            <NumberInput source="speed" />
            <DateInput disabled source="createdAt" label="Created At" />
        </SimpleForm>
    </Edit>
);