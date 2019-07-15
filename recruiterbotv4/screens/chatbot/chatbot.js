import base64 from 'react-native-base64'
import { ASSISTANT_IAM_APIKEY, ASSISTANT_URL, SKILL_ID } from 'react-native-dotenv'

MessageRequest = (input, context = {}) => {
  let body = {
    alternate_intents: true,
    input: {
      'text': input
    }
  };
  if (context) {
    body.context = context;
  }
  return fetch(ASSISTANT_URL + '/v1/workspaces/' + SKILL_ID + '/message?version=2018-07-10', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + base64.encode("apikey:"+ASSISTANT_IAM_APIKEY),
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then((response) => response.json())
  .then((responseJson) => {
    console.log("Checking reponseJson")
    console.log(responseJson);
    console.log("END OF RESPONSE JSON CHECK")
    return responseJson;
  })
  .catch((error) => {
    console.error(error);
  });

}

module.exports = {
  MessageRequest
}