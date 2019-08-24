import base64 from 'react-native-base64'

personalityRequest = (input) => {
        let body = {
          payload: input
          
        };

        
        return fetch("https://eu-gb.functions.cloud.ibm.com/api/v1/web/ucabjs2%40ucl.ac.uk_dev/default/jmsav1pi2.json", {
          method: 'POST',
          headers: {
        //     'Authorization': "Basic " + base64.encode("084217a1-0343-4bf4-9899-9355e903a56b:MEpTSoJOVQjgwhd4lzom0ffzJysW2M5v9ukEWDXYqu0bSKwyneXuKhiiiHNIR5HD"),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            
          },
          body: JSON.stringify(body),
        })
        .then((response) => response.json())
        .then((responseJson) => {
      
          return responseJson;
        })
        .catch((error) => {
          console.error(error);
        });
      
}



module.exports = {
    personalityRequest
}

