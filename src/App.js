import * as React from "react";
import {
    Admin,
    Resource, ListGuesser, EditGuesser,
    resolveBrowserLocale
} from 'react-admin';
import dataProvider from "./dataProvider";
import authProvider from "./authProvider";
import CustomRoutes from "./customRoutes";
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from './i18n/en';
import customFrenchMessages from './i18n/fr';
import LoginForm from "./components/authComponents/loginForm";
import Dashboard from "./components/dashboardComponents/Dashboard";
import MyLayout from "./components/layoutComponents/MyLayout";
import {UserList} from "./components/usersComponent/Userlist";
import {Clientlist} from "./components/clientComponents/clientList";
import {CreateClient} from "./components/clientComponents/createClient"
import {ClientEdit} from "./components/clientComponents/editClient";
import {UserEdit} from "./components/usersComponent/Editusers";
import CreditManagement from "./components/clientComponents/manageCredit";
import MerchandiseList from "./components/merchandiseComponent/merchandiseList";
import MerchandiseEdit from "./components/merchandiseComponent/merchandiseEdit";
import MerchandiseCreate from "./components/merchandiseComponent/merchandiseCreate"
import ShipmentList from "./components/shipmentComponents/shipmentList";
import ShipmentEdit from "./components/shipmentComponents/shipmentEdit";
import ShipmentCreate from "./components/shipmentComponents/shipmentCreate";

//set language for the app
let i18nProvider;

i18nProvider = polyglotI18nProvider(locale =>
        locale === 'fr'
            ? customFrenchMessages
            : englishMessages,
    // Always fallback on browsers local
    resolveBrowserLocale()
);


const App = () =>
    <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        customRoutes={CustomRoutes}
        i18nProvider={i18nProvider}
        dashboard={Dashboard}
        loginPage={LoginForm}
        layout={MyLayout}
    >
        {permissions => [
            <Resource
                name="usermanagement/users"
                list={UserList}
                edit={UserEdit}
            />,
            permissions === "DISTRIBUTOR"
                ? <Resource
                    name="clientmanagement/clients"
                    list={Clientlist}
                />
                : <Resource
                    name="clientmanagement/clients"
                    list={Clientlist}
                    edit={CreditManagement}
                    show={ClientEdit}
                    create={CreateClient}
                />,

            <Resource
                name="merchandisemanagement/merchandise"
                list={MerchandiseList}
                edit={MerchandiseEdit}
                create={MerchandiseCreate}
            />,
            permissions === "ADMIN" &&
            <Resource
                name="shipmentmanagement/shipments"
                list={ShipmentList}
                create={ShipmentCreate}
                edit={ShipmentEdit}
            />,
            permissions === "DISTRIBUTOR" &&
            <Resource
                name="shipmentmanagement/shipments"
                list={ShipmentList}
                create={ShipmentCreate}
                edit={ShipmentEdit}
            />,
            permissions === "OPERATOR" &&
            <Resource
                name="shipmentmanagement/shipments"
                list={ShipmentList}
            />,

        ]}
    </Admin>

export default App;
