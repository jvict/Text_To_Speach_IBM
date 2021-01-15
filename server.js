const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: '-cu_LPqqJol5I89LoTs110sgaKIRLqxksDDAJPTEyoBr',
  }),
  serviceUrl: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/c6985ca4-9e8f-4401-9444-7794306f1155',
});

const synthesizeParams = {
  text: 'O gato faz Miau e o cachorro faz au au',
  accept: 'audio/wav',
  voice: 'pt-BR_IsabelaVoice',
};

textToSpeech.synthesize(synthesizeParams)
  .then(response => {
    // only necessary for wav formats,
    // otherwise `response.result` can be directly piped to a file
    return textToSpeech.repairWavHeaderStream(response.result);
  })
  .then(buffer => {
    fs.writeFileSync('boa_tarde.wav', buffer);
  })
  .catch(err => {
    console.log('error:', err);
  });