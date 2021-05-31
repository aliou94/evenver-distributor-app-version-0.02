
import englishMessages from 'ra-language-english';

//check if spreading translation helps prevent collision

const customEnglishMessages = {

    ...englishMessages,

        link: {
            resetPassword: 'Forgot password ?',
            register:'Register'
        },
        action: {
            verify: 'verify',
            required: 'required',
            requestPassCode:'send temporary pass code',
            changePassword:" Change Password"
        },
    dashboard:{
        welcome:"This is an app designed for Siruis Company It intends to improve the repartition" +
            " of goods according to the available credit of customers",
        profile:"My profile",
        clients:"clients",
        users:"users",
        welcomeM:"welcome to the even distributor app",
        merchandise:"merchandise",
        shipments:"shipments"
    },
        auth:{
            email:'Email',
            cell:"cell",
            land: "land",
            office:"office",
            phoneNumber:"phone number",
            password:' New password',
            firstName: "First name",
            lastName : "Last name",
            fullName:"Name",
            confirmPassword:"confirm password",
            sign_in_error:"verify credentials entered",
            _check_error:"incorrect credentials check email and password"
        },
        help:{
            forgotPassword:'Forgot Password ?',
            register:"Register",
            sign_in:"Already have an account?",
            accountCreation:"Create your account",
            resetHeader:'Reset Password',
            reset:'set a new password',
            password:'password',
            verify: "verify PassCode",
            verifyInstructions:"verify temporary pass code here",
            passCode: "passCode",
            update:"password has been updated",
            misMatch: "invalid password retry",
            retry:"problems encountered retry",
            approval:"pending approval from admin",
            configuration:"Configuration",
            language:"language",
            titleUser:"List of Users",
            titleClient:"list of clients",
            titleMerchandise:"merchandise list",
            identity:"Identity",
            Provider:"Provider",
            City:"city",
            State:"State",
            pendingCredit:"pending credit",
            availableCredit:"available credit",
            address:"address",
            postalCode:"postal code",
            Add:"Add",
            Modify:"modify",
            addCredit:"Add an amount of credit",
            validate:"validate",
            invoiceId:"invoiceId",
            Amount:"amount",
            status:"status",
            receivedBy:"receivedBy",
            receivedOn:"receivedOn",
            acceptedBy:"acceptedBy",
            acceptedOn:"acceptedOn",
            createdBy:"createdBy",
            createdOn:"createdOn",
            creditedOn:"creditedOn",
            PENDING:"pending",
            ACCEPTED:"accepted",
            option:"Confirm Option",
            duplicate:"Duplicated entry for merchandise",
            currentEntry:"the current entry is",
            newEntry:"the new entry is",
            question:"do you want to",
            sum:"sum",
            upDate:"update",
            cancel:"cancel",
            merchandise: "merchandise",
            quantity:"quantity",
            select:"select merchandise",
            shipment:"create shipments",
            listOfShipment:"list of shipments",
            listOfMerchandise:"list of merchandise",
            category:"category",
            name:"name",
            createMerchandise:"create merchsndise",
            active : "active",
            inactive: "inactive",
            distributor:"distributor",
            customer:"customer",
            operator:"operator",
            stock :"stock received/(boxes)",
            bol:"bol number",
            shipmentNumber:"shipment number",
        },
        notify:{
            error: {
                email: "verify your emial adresse to confirm passcode",
                passCode: 'incorrect passCode',
                passCodeExpiration: "passcode has expired, request a new passcode"
            },
        }

};

export const myRoot = {
    validation :{
        required :"Required field"
    }
}

export default customEnglishMessages