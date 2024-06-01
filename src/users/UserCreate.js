import * as React from 'react';
import { Create, SimpleForm, TextInput, NumberInput, SelectInput } from 'react-admin';

export const UserCreate = (props) => {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="name" />
                <TextInput source="email" />
                <SelectInput source="gender" choices={[
                    { id: 'Male', name: 'Male' },
                    { id: 'Female', name: 'Female' },
                    { id: 'Other', name: 'Other' },
                ]} />
                <NumberInput source="age" />
                <NumberInput source="weight" />
                <NumberInput source="height" />
                <TextInput source="phone" />
                <TextInput source="location" />
            </SimpleForm>
        </Create>
    );
};
