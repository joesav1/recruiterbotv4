import base64 from 'react-native-base64'

personalityRequest = (input) => {
        let body = {
          payload: input
          
        };

        let body2 = input
        console.log("checking what body gives me, personality.js")
        console.log(body)
        console.log("end of personality.js body check")
        console.log("checking body but json stringified")
        console.log(JSON.stringify(body))
        console.log("end of body json stringieified chjeck")
        console.log("checking what body2 gives me, personality.js")
        console.log(body2)
        console.log("end of personality.js body2 check")
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
      
          console.log("Checking reponseJson personality.js")
          console.log(responseJson)
 
          console.log("END OF RESPONSE JSON CHECK personality.js")
          return responseJson;
        })
        .catch((error) => {
          console.error(error);
        });
      
}

//     var options = {
//         "method": "POST",
//         "hostname": "eu-gb.functions.cloud.ibm.com",
//         "port":null,
//         "path":"/api/v1/namespaces/ucabjs2%40ucl.ac.uk_dev/actions/jmsav1pi2?blocking=true",
//         "headers": {
//             "accept": "application/json",
//             "authorization": "084217a1-0343-4bf4-9899-9355e903a56b:MEpTSoJOVQjgwhd4lzom0ffzJysW2M5v9ukEWDXYqu0bSKwyneXuKhiiiHNIR5HD",
//             "content-type":"application/json"
//         }

//     };

//     var req = http.request(options, function (res) {
//         var chunks = [];
//         res.on("data", function (chunk) {
//             chunks.push(chunk);
//         });

//         res.on("end", function (){
//             var body = Buffer.concat(chunks);
//             console.log(body.toString());
//           });
//         })

//     req.end();
// }

module.exports = {
    personalityRequest
}

