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
    const campaign = context.params.campaign;
    let recipient_id;
    let list_id;

    // First see if we already have a list_id for the emailList
    try {
        // const doc = await admin.firestore().collection('sendgrid').doc('lists').get();
        const doc = await admin.firestore().doc(`users/${userList}/campaigns/${campaign}`).get();
        if(doc.exists){
            console.log('FIREBASE CLOUD FUNCTION: List ' + doc.get('title') + ' already exists: ', doc.get('id'));
            list_id = doc.get('id');
        }
    } catch (error) {
        console.log('FIREBASE CLOUD FUNCTION: List error: ', error);
    }

});



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
