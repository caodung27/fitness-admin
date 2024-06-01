import * as React from 'react';
import { Create, SimpleForm, TextInput, NumberInput } from 'react-admin';

export const PathCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="type" />
            <NumberInput source="start.coordinates[0]" label="Start Latitude" />
            <NumberInput source="start.coordinates[1]" label="Start Longitude" />
            <NumberInput source="end.coordinates[0]" label="End Latitude" />
            <NumberInput source="end.coordinates[1]" label="End Longitude" />
            <NumberInput source="speed" />
        </SimpleForm>
    </Create>
);
