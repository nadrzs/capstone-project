var video = document.querySelector("#wc");

// minta izin user
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

const gizi_nilailemak = document.querySelector('#nilailemak')
const gizi_nilaikalori = document.querySelector('#nilaikalori')
const gizi_nilaikolesterol = document.querySelector('#nilaikolesterol')
const gizi_nilaiprotein = document.querySelector('#nilaiprotein')
const gizi_nilaikarbohidrat = document.querySelector('#nilaikarbohidrat')
const gizi_nilaisodium = document.querySelector('#nilaisodium')
const gizi_nilaikalium = document.querySelector('#nilaikalium')

const card_lemak = document.querySelector('#card_lemak')
const card_karbohidrat = document.querySelector('#card_karbohidrat')
const card_kalori = document.querySelector('#card_kalori')
const card_kolesterol = document.querySelector('#card_kolesterol')
const card_protein = document.querySelector('#card_protein')
const card_sodium = document.querySelector('#card_sodium')
const card_kalium = document.querySelector('#card_kalium')

var OAUTH_CONSUMER_KEY = 'd2d1e00ebe2140f2b7391ceccc677e7b';
var SHARED_SECRET = 'dbcd6ffd697d4c5898d1cb3127aa1501';
var REQUEST_URL = 'https://cors.bridged.cc/http://platform.fatsecret.com/rest/server.api';
var REQUEST_URL_ENCODED = 'http%3A%2F%2Fplatform.fatsecret.com%2Frest%2Fserver.api';
var REQUEST_METHOD = 'GET';
var OAUTH_SIGNATURE_METHOD = 'HMAC-SHA1';
var OAUTH_VERSION = '1.0';
var FORMAT = 'json';

var karbo, kalori, kolesterol;



// jika user memberikan izin
if (navigator.getUserMedia) {
    // jalankan fungsi handleVideo, dan videoError jika izin ditolak
    navigator.getUserMedia({ video: true }, handleVideo, videoError);
}

// fungsi ini akan dieksekusi jika  izin telah diberikan
function handleVideo(stream) {
    video.srcObject = stream;
}

// fungsi ini akan dieksekusi kalau user menolak izin
function videoError(e) {
    // do something
    alert("Izinkan menggunakan webcam untuk demo!")
}

function takeSnapshot() {
    var img = document.createElement('img');
    var context;
    var width = video.offsetWidth
            , height = video.offsetHeight;

    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, width, height);

    const warning = document.querySelector('#card')
    const nama_makanan = document.querySelector('#nama_makanan')

    nama_makanan.classList.remove("hidden")
    template()
    test()
}


    /*function peringatan_gizi() {
        const nilaikalori = document.querySelector('#nilaikalori')
        const nilaikolesterol = document.querySelector('#nilaikolesterol')
        const nilaiprotein = document.querySelector('#nilaiprotein')
        const nilaikarbohidrat = document.querySelector('#nilaikarbohidrat')
        const nilaisodium = document.querySelector('#nilaisodium')
        const nilaikalium = document.querySelector('#nilaikalium')
    }
    const nilailemak = document.querySelector('#nilailemak').textContent
    console.log(nilailemak)*/




    var calculateOAuthSignature = function(BASE_STRING, SHARED_SECRET) {
    var OAUTH_SIGNATURE_BASE64 = encodeURIComponent(CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(BASE_STRING, SHARED_SECRET)).replace('+',' ').replace('\\',' '));
    // console.log('OAUTH_SIGNATURE_BASE64: '+OAUTH_SIGNATURE_BASE64);
    return OAUTH_SIGNATURE_BASE64;

}

// Optional

// console.log(food_id);

const getRecipeDetails = (RECIPE_ID) =>{

    OAUTH_TIMESTAMP = Math.floor(Date. now() / 1000);
    OAUTH_NONCE = Math.random().toString(36).replace(/[^a-z]/, '').substr(2);
    var METHOD = 'food.get';

    console.log('OAUTH_NONCE recipe: '+OAUTH_NONCE);

    // Create a Signature Base String

    // var REQUEST_URL_ENCODED = encodeURIComponent(REQUEST_URL);
    var NORMALISED_PARAMETERS = '';

    NORMALISED_PARAMETERS += 'food_id='+RECIPE_ID;
    NORMALISED_PARAMETERS += '&format='+FORMAT;
    // console.log(NORMALISED_PARAMETERS);

    NORMALISED_PARAMETERS += '&method='+METHOD;

    NORMALISED_PARAMETERS += '&oauth_consumer_key='+OAUTH_CONSUMER_KEY;

    NORMALISED_PARAMETERS += '&oauth_nonce='+OAUTH_NONCE;

    NORMALISED_PARAMETERS += '&oauth_signature_method='+OAUTH_SIGNATURE_METHOD;

    NORMALISED_PARAMETERS += '&oauth_timestamp='+OAUTH_TIMESTAMP;

    NORMALISED_PARAMETERS += '&oauth_version='+OAUTH_VERSION;



    // console.log('--------------------NORMALISED_PARAMETERS: '+NORMALISED_PARAMETERS);



    NORMALISED_PARAMETERS_ENCODED = encodeURIComponent(NORMALISED_PARAMETERS);
    var BASE_STRING = `${REQUEST_METHOD}&${REQUEST_URL_ENCODED}&${NORMALISED_PARAMETERS_ENCODED}`;
    // console.log('NORMALISED_PARAMETERS_ENCODED: '+NORMALISED_PARAMETERS_ENCODED);
    // console.log('----BASE_STRING: '+BASE_STRING);
    // Calculate the Signature value
    SHARED_SECRET+='&'; // no user, & needed
    var OAUTH_SIGNATURE_BASE64 = calculateOAuthSignature(BASE_STRING, SHARED_SECRET);
    var OAUTH_REQUEST_URL = `${REQUEST_URL}?${NORMALISED_PARAMETERS}&oauth_signature=${OAUTH_SIGNATURE_BASE64}`;
    // console.log('OAUTH_REQUEST_URL: '+OAUTH_REQUEST_URL);
    // Send the Request
    const fetchApiId = fetch(OAUTH_REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
        console.log('responseData details:');
        console.log(responseData.food.servings.serving.calories);
        console.log(responseData.food.servings.serving.cholesterol);
        console.log(responseData.food.servings.serving.carbohydrate);
        kalori = responseData.food.servings.serving.calories
        kolesterol = responseData.food.servings.serving.cholesterol
        karbo = responseData.food.servings.serving.carbohydrate
        return responseData;
    })
    .catch(function(error){
        alert("fat secret API error")
    })
}

getRecipeDetails(60582)
getRecipeDetails(60582)
getRecipeDetails(60582)

function test() {
       
    if (parseInt(gizi_nilailemak.textContent) > 100) {
        card_lemak.classList.remove("hidden")
    }
    if (parseInt(gizi_nilaikalium.textContent) > 100) {
        card_karbohidrat.classList.remove("hidden")
    }
    if (parseInt(gizi_nilaisodium.textContent) > 100) {
        card_kalori.classList.remove("hidden")
    }
    if (parseInt(gizi_nilaikarbohidrat.textContent) > 100) {
        card_karbohidrat.classList.remove("hidden")
    }
}


function template() {

    let temp = parseInt(gizi_nilaikarbohidrat.textContent)

    temp = temp + parseInt(karbo)
    gizi_nilaikarbohidrat.textContent = temp
}



if (model = "Nasi Goreng") {

    Kalsium = Kalsium + 


}