import * as React from 'react';
import { Edit, SimpleForm, TextInput, PasswordInput, SelectInput, NumberInput } from 'react-admin';

export const UserEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput disabled source="email" />
            <PasswordInput source="password" />
            <SelectInput source="gender" choices={[
                { id: 'Male', name: 'Male' },
                { id: 'Female', name: 'Female' },
                { id: 'Other', name: 'Other' },
            ]} />
            <NumberInput source="age" />
            <NumberInput source="weight" />
            <NumberInput source="height" />
            <TextInput disabled source="phone" />
            <TextInput source="location" />
        </SimpleForm>
    </Edit>
);
