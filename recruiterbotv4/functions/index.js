const functions = require('firebase-functions');
const admin = require('firebase-admin')
const sgMail = require('@sendgrid/mail')
const sgClient = require('@sendgrid/client')


admin.initializeApp(functions.config().firebase);

// Initialize SendGrid
sgClient.setApiKey(functions.config().sendgrid.key);
sgMail.setApiKey(functions.config().sendgrid.key);

exports.addSingleRecipientToList = functions.firestore.document(`users/{userList}/campaigns/{campaign}`)
                                          .onCreate(async (snap, context) => {

    const userList = context.params.userList;
    console.log('Checking userList ' + userList)
    
    const campaign = context.params.campaign;
    console.log('Checking campaign: ' + campaign)
    let recipient_id;
    let list_id;

    // First see if we already have a list_id for the emailList
    try {
        // const doc = await admin.firestore().collection('sendgrid').doc('lists').get();
        const doc = await admin.firestore().doc(`users/${userList}/campaigns/${campaign}`).get();
        console.log("Checking doc:" + doc)
        if(doc.exists){
            const getFullDoc = doc.data()
            console.log('FIREBASE CLOUD FUNCTION:' + getFullDoc);
            //Note for the morning doc.id not doc.get('id')
            console.log('FIREBASE CLOUD FUNCTION: List ' + doc.get('title') + ' already exists: ', doc.get('id'));
            list_id = doc.get('id');
        }
    } catch (error) {
        console.log('FIREBASE CLOUD FUNCTION: List error: ', error);
    }

});



