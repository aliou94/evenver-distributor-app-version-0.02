
import frenchMessages from 'ra-language-french';

const customFrenchMessages = {
    ...frenchMessages,

        link: {
            resetPassword: 'Mot de passe oublié ?',
            register:'Créer un compte'
        },
        action: {
            verify:'Vérifier',
            required: 'ce champ est requis',
            requestPassCode:"envoyer un code d'accès temporaire",
            changePassword:" Modifier votre mot de passe"
        },
    dashboard:{
        welcome:"application cree pour siruis holding avec pour objectif la gestion de la logistique",
        profile:"Mon profile",
        clients:"Client",
        users:"Utilisateur",
        welcomeM:"Bienvenue sur la démo de Even-distributor-app",
        merchandise:"Marchandise",
        shipments:"Debarquement",
        distribution:"Distribution"
    },
        auth:{
            email:'Email',
            password:'Nouveau mot de passe',
            firstName : "Prénom",
            cell:"mobile",
            land: "fixe",
            office:"bureau",
            phoneNumber:"Numero de Tel",
            lastName : "nom de famille ",
            fullName:"Nom",
            confirmPassword:"confirmer le Mot de passe",
        },
        help:{
            forgotPassword: 'Mot de passe oublié?',
            resetHeader:'réinitialisation du mot de passe',
            reset:'réinitialiser le mot de passe ici',
            email:"entrer votre adresse mail",
            sign_in:"Vous avez déjà un compte?",
            password:'mot de passe',
            verify: "Vérifier le Mot de passe",
            verifyInstructions:"Vérifier le Mot de passe ici",
            passCode: "Mots de passe temporaire",
            update:"Mot de passe modifié",
            misMatch:"Mot de passe invalide, essayer encore",
            retry: "Problèmes rencontrés réessayer",
            approval: "En attente de validation par l'administrateur",
            configuration:"Configuration",
            language:"Langue",
            titleUser: "liste des utilisateurs",
            titleClient:"Liste des clients",
            titleMerchandise: "liste de marchandises",
            identity:"Identité",
            Provider:"Operateur",
            City:"Ville",
            State:"Etat/province",
            pendingCredit:"crédit en attente",
            availableCredit:"credit disponible",
            address:"address",
            postalCode:"code postal",
            Add:"Ajouter",
            Modify:"modifier",
            addCredit:"Ajouter un montant de crédit",
            validate:"valider",
            invoiceId: "identifiant de la facture",
            Amount:"montant",
            status:"statu",
            receivedBy:"reçu par",
            receivedOn:"reçu le",
            acceptedBy:"accepté par",
            acceptedOn:"accepted le",
            createdBy:"créer par",
            createdOn:"créer le",
            creditedOn:"crédité le",
            PENDING:"En attente",
            ACCEPTED:"Accepté",
            option:"Confirmer l'option",
            duplicate: "Donées dupliquée pour la marchandise",
            currentEntry:"l'entrée actuelle est",
            newEntry:"la nouvelle entrée est",
            question:"Voulez vous",
            sum:"additioner",
            upDate:"remplacer",
            cancel:"Annuler",
            merchandise:"marchandise",
            quantity:"quantité",
            select:"sélectionner la marchandise",
            shipment:"créer un debarquement",
            listOfShipment:"liste des debarquements",
            listOfMerchandise:"liste de merchandise",
            category:"categorie",
            name:"nom",
            createMerchandise:"créer une marchandise",
            active:"actif",
            inactive:"inactif",
            distributor:"distributeur",
            customer:"client",
            operator:"operateur",
            stock :"stock reçu/(cartons)",
            bol:"numero de borderau",
            shipmentNumber:"numéro d'embarquement",
            price:"prix",
            currency:"monnaie",
            merchandiseUnit:"unité",
            selectCustomer:"Selectionner la Clientelle",
            validatecredit:"Validation du credit Applicable"

        },
        notify:{
            error: {
                email: 'verifier votre adresse mail pour confrimation',
                passCode: ' Mots de passe temporaire incorrect',
                passCodeExpiration: "mot de passe expire, essayer a nouveau"
            }
        }

};

export default customFrenchMessages