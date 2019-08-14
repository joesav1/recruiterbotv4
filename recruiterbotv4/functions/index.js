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
        
        const doc = await admin.firestore().doc(`users/${userList}/campaigns/${campaign}`).get();
        console.log("Checking doc:")
        console.log(doc)
        console.log('end of checking doc')
        if(doc.exists){
            const getFullDoc = doc.data()
            console.log(getFullDoc);
            //Note for the morning doc.id not doc.get('id')
            console.log('FIREBASE CLOUD FUNCTION: List ' + doc.get('title') + ' already exists: ' + doc.id);
            emailList = doc.get('candidates')
            console.log("checking emailList")
            console.log(emailList)
            for(const email of emailList) {
                console.log("checking emails within emaillist")
                console.log(email)
                const msg = {
                    to: email,
                    from: 'noreply@recruiterbot-f3b6d.firebase.com',
                    templateId: 'd-c5d6b851e1df4901acc1600e6ed184c8',
                    //substitutionWrappers: ['{{', '}}'],
                    dynamic_template_data: {
                        subject:  'New role available: ' + doc.get('title'),
                        //remember to change from email to name here!!
                      name: email
                      // and other custom properties here
                    }
                };

                sgMail.send(msg)
            }
        }
    } catch (error) {
        console.log('FIREBASE CLOUD FUNCTION: List error: ', error);
    }






















});



