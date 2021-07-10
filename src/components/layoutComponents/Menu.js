import * as React from 'react';
import {
    DashboardMenuItem,
    MenuItemLink,
} from 'react-admin';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ShareIcon from '@material-ui/icons/Share';
import { usePermissions } from 'react-admin';
import { Box} from '@material-ui/core';
import { useTranslate } from 'react-admin';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


const Menu =()=>{
    const permission = usePermissions()
    const translate = useTranslate()
    //console.log(permission.permissions)//checking authorisations
    let identifier = localStorage.getItem("identification")

    return (
        <Box>
            <DashboardMenuItem />
            <MenuItemLink
                to={"/usermanagement/users/"+identifier}
                primaryText={translate("dashboard.profile")}
                leftIcon={<AccountCircleIcon/>}
               />
            {
                permission.permissions==="ADMIN"
                &&
                <MenuItemLink
                    to={'/usermanagement/users'}
                    primaryText={translate("dashboard.users")}
                    leftIcon={<ContactMailIcon/>}
                />
            }
            {
                (permission.permissions==="ADMIN"||"OPERATOR"||"DISTRIBUTOR")
                    &&
                        <MenuItemLink
                            to={"/clientmanagement/clients"}
                            primaryText={translate("dashboard.clients")}
                            leftIcon={<PeopleAltTwoToneIcon/>}
                        />
        }
            {
                ( permission.permissions==="ADMIN"||"OPERATOR")
                &&
                <MenuItemLink
                    to={"/merchandisemanagement/merchandise"}
                    primaryText={translate("dashboard.merchandise")}
                    leftIcon={<ShoppingCartIcon/>}
                />
            }
            {
                <MenuItemLink
                    to={"/shipmentmanagement/shipments"}
                    primaryText={translate("dashboard.shipments")}
                    leftIcon={<DirectionsBoatIcon/>}
                />
            }
            {
                ( permission.permissions==="ADMIN") &&
                <MenuItemLink
                    to={"/sample"}
                    primaryText={translate("dashboard.distribution")}
                    leftIcon={<ShareIcon/>}
                />
            }
        </Box>
    );

}

export default Menu;