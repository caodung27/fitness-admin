import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import { UserList } from './users/UserList';
import { UserEdit } from './users/UserEdit';
import { UserCreate } from './users/UserCreate';
import { PathList } from './paths/PathList';
import { PathEdit } from './paths/PathEdit';
import { PathCreate } from './paths/PathCreate';
import { FaUserFriends } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import DataProvider from './data_provider/dataProvider';
import authProvider from './data_provider/authProvider';

const App = () => (
    <Admin authProvider={authProvider} dataProvider={DataProvider}>
        <Resource
            name="user"
            list={UserList}
            edit={UserEdit}
            create={UserCreate}
            icon={FaUserFriends}
        />
        <Resource
            name="path"
            list={PathList}
            edit={PathEdit}
            create={PathCreate}
            icon={FaMapMarkerAlt}
        />
    </Admin>
);

export default App;
