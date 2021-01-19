var ACCESS_TOKEN = 'API TOKEN HERE';
var SECRET_KEY = 'SECRET KEY HERE';

var payload = {'access_token':ACCESS_TOKEN,'nonce':Date.now()};
var payload_base64 = Utilities.base64Encode(JSON.stringify(payload));
var url = 'https://api.coinone.co.kr/v2/account/balance/';

var signature = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_512, payload_base64, SECRET_KEY.toUpperCase());

var headers = {
  'content-type':'application/json',
  'X-COINONE-PAYLOAD': payload_base64,
  'X-COINONE-SIGNATURE': signature.map(function(chr){return (chr + 256).toString(16).slice(-2)}).join("")
};

var options = {
  "method": "post",
  "headers": headers,
  "payload": payload
};

var response = UrlFetchApp.fetch(url, options);
var result = JSON.parse(response);

function getCoinoneBalance(coin){
  return result[coin]['balance'];
}