const kaloriValue = document.querySelector('.kalori-value');
const karbohidratValue = document.querySelector('.karbohidrat-value');
const lemakValue = document.querySelector('.lemak-value');
const proteinValue = document.querySelector('.protein-value');
const kolesterolValue = document.querySelector('.kolesterol-value');
const sodiumValue = document.querySelector('.sodium-value');

const namaMakanan = document.querySelector('.namaMakanan')
const ageValue = document.querySelector('#usia');
const genderMale = document.querySelector("#male");
const genderFemale = document.querySelector("#female");
const warningCard = document.querySelector('.warning-card');

const card_lemak = document.querySelector('#card_lemak')
const card_karbohidrat = document.querySelector('#card_karbohidrat')
const card_kalori = document.querySelector('#card_kalori')
const card_kolesterol = document.querySelector('#card_kolesterol')
const card_protein = document.querySelector('#card_protein')
const card_sodium = document.querySelector('#card_sodium')





$('.predicting-progress-bar').hide();

$("#image-selector").change(function () {
	let reader = new FileReader();
	reader.onload = function () {
		let dataURL = reader.result;
		$("#selected-image").attr("src", dataURL);
	}
	
	let file = $("#image-selector").prop('files')[0];
	reader.readAsDataURL(file);
});

let model;
$( document ).ready(async function () {
	$('.loading-progress-bar').show();
    console.log( "Loading model..." );
    model = await tf.loadLayersModel('https://raw.githubusercontent.com/nadrzs/capstone-project/machine-learning/ml-web-prototype/model/model.json');
    console.log( "Model loaded." );
	$('.loading-progress-bar').hide();
});

$("#predict-button").click(async function () {    
    const age = parseInt(ageValue.value)
    if(age < 19 || age > 65){
        document.querySelector('#ageWarning').classList.remove('d-none')
    } else {
        document.querySelector('#ageWarning').classList.add('d-none')
        let image = $('#selected-image').get(0);
	
        // Pre-process the image
        let tensor = tf.browser.fromPixels(image)
            .resizeNearestNeighbor([150,150]) // change the image size here
            .toFloat()
            .div(tf.scalar(255.0))
            .expandDims();
        console.log('predicting food');
        $('.predicting-progress-bar').show();
        let predictions = await model.predict(tensor).data();
        let top5 = Array.from(predictions)
            .map(function (p, i) { // this is Array.map
                return {
                    probability: p,
                    className: TARGET_CLASSES[i] // we are selecting the value from the obj
                };
            }).sort(function (a, b) {
                return b.probability - a.probability;
            }).slice(0, 2);

        $("#prediction-list").empty();
        console.log(top5[0].className);
            fetchFoodApi(top5[0].className, age);
    }
});

let foodCalorie, foodCarbo, foodFat, foodProtein, foodCholesterol, foodSodium;

const fetchFoodApi = async (query, age) => {
    const appIdFood = 'b63501a9';
    const appKeyFood = 'd8ca959e7cabd19dcbe09f00a85cd96b';
    const api = await fetch(`https://cors.bridged.cc/https://api.edamam.com/search?q=${query}&app_id=${appIdFood}&app_key=${appKeyFood}`)
    const response = await api.json();
    
    $('.predicting-progress-bar').hide();
    console.log(response);

    foodCalorie = Math.round(response.hits[1].recipe.calories)
    foodCarbo = Math.round(response.hits[1].recipe.totalNutrients.CHOCDF.quantity)
    foodFat = Math.round(response.hits[1].recipe.totalNutrients.FAT.quantity)
    foodProtein = Math.round(response.hits[1].recipe.totalNutrients.PROCNT.quantity)
    foodCholesterol = Math.round(response.hits[1].recipe.totalNutrients.CHOLE.quantity)
    foodSodium = Math.round(response.hits[1].recipe.totalNutrients.NA.quantity);

    console.log(`kalori: ${foodCalorie}`);
    console.log(`karbohidrat: ${foodCarbo}`);
    console.log(`Lemak: ${foodFat}`);
    console.log(`Protein: ${foodProtein}`);
    console.log(`Kolestrol: ${foodCholesterol}`);
    console.log(`Sodium: ${foodSodium}`);

    var gender;
	if (genderMale.checked) {
		gender = genderMale.value
	}
	else if (genderFemale.checked) {
		gender = genderFemale.value
	}
    console.log(gender)
    console.log(age);
    console.log(kalkulasi(gender, age, foodCalorie, foodCarbo, foodFat, foodProtein,foodCholesterol, foodSodium))
    
    namaMakanan.style = "display: block"
    namaMakanan.textContent = response.q;

    

}

var show_kalori = 0;
var show_karbo = 0;
var show_lemak = 0;
var show_protein = 0;
var show_kolesterol = 0;
var show_sodium = 0;




// checker for threshold

async function kalkulasi(gender, usia, kalori, karbo, lemak, protein, kolesterol, sodium){

    if (gender == "Male" && usia >= 19 && usia <= 29) {
        var batas_lemak = Math.round((lemak / 75) * 100) //done
        var batas_kalori = Math.round((kalori / 2650) * 100) //done
        var batas_karbohidrat = Math.round((karbo / 430) * 100) //done
        var batas_protein = Math.round((protein / 65) * 100) //done
        var batas_sodium = Math.round((sodium / 1500) * 100) // done
        var batas_kolesterol = Math.round((kolesterol / 299 ) * 100) //done
        await penambahan(batas_kalori, batas_karbohidrat, batas_lemak, batas_protein, batas_kolesterol, batas_sodium)
        
        console.log(batas_lemak)
    }
    else if (gender == "Male" && usia >= 30 && usia <= 49) {
        var batas_lemak = Math.round((lemak / 70) * 100) //
        var batas_kalori = Math.round((kalori / 2650) * 100) //
        var batas_karbohidrat = Math.round((lemak / 415) * 100) //
        var batas_protein = Math.round((protein / 65) * 100) // 
        var batas_sodium = Math.round((sodium / 1500) * 100) //done
        var batas_kolesterol = Math.round((kolesterol / 299) * 100) //done
        await penambahan(batas_kalori, batas_karbohidrat, batas_lemak, batas_protein, batas_kolesterol, batas_sodium)
        
    }
    else if (gender == "Male" && usia >= 50 && usia <= 64) {
        var batas_lemak = Math.round((lemak / 60) * 100) //
        var batas_kalori = Math.round((kalori / 2150) * 100) //
        var batas_karbohidrat = Math.round((lemak / 340) * 100) //
        var batas_protein = Math.round((protein / 65) * 100) //
        var batas_sodium = Math.round((sodium / 1300) * 100) //done
        var batas_kolesterol = Math.round((kolesterol / 299) * 100) //done
        await penambahan(batas_kalori, batas_karbohidrat, batas_lemak, batas_protein, batas_kolesterol, batas_sodium)
        
    }
    else if (gender == "Female" && usia >= 19 && usia <= 29) {
        var batas_lemak = Math.round((lemak / 65) * 100) // 
        var batas_kalori = Math.round((kalori / 2250) * 100) //
        var batas_karbohidrat = Math.round((lemak / 360) * 100) //
        var batas_protein = Math.round((protein / 60) * 100) //
        var batas_sodium = Math.round((sodium / 1500) * 100) //dome
        var batas_kolesterol = Math.round((kolesterol / 299) * 100) //done
        await penambahan(batas_kalori, batas_karbohidrat, batas_lemak, batas_protein, batas_kolesterol, batas_sodium)
        
    }
    else if (gender == "Female" && usia >= 30 && usia <= 49) {
        var batas_lemak = Math.round((lemak / 60) * 100) // 
        var batas_kalori = Math.round((kalori / 2150) * 100) //
        var batas_karbohidrat = Math.round((lemak / 340) * 100) //
        var batas_protein = Math.round((protein / 60) * 100) //
        var batas_sodium = Math.round((sodium / 1500) * 100) //
        var batas_kolesterol = Math.round((kolesterol / 299) * 100) //done
        await penambahan(batas_kalori, batas_karbohidrat, batas_lemak, batas_protein, batas_kolesterol, batas_sodium)
        
    }
    else if (gender == "Female" && usia >= 50 && usia <= 64) {
        var batas_lemak = Math.round((lemak / 50) * 100)//
        var batas_kalori = Math.round((kalori / 1800) * 100)//
        var batas_karbohidrat = Math.round((lemak / 280) * 100) //
        var batas_protein = Math.round((protein / 60) * 100)//
        var batas_sodium = Math.round((sodium / 1400) * 100) //
        var batas_kolesterol = Math.round((kolesterol / 299) * 100) //done
        await penambahan(batas_kalori, batas_karbohidrat, batas_lemak, batas_protein, batas_kolesterol, batas_sodium)
        
    }
}

function penambahan(kalori, karbo, lemak, protein, kolesterol, sodium){
	show_kalori = show_kalori + kalori
	show_sodium = show_sodium + sodium
	show_kolesterol = show_kolesterol + kolesterol
	show_protein = show_protein + protein
	show_lemak = show_lemak + lemak
	show_karbo = show_karbo + karbo

    kaloriValue.textContent = show_kalori + " %";
    karbohidratValue.textContent = show_karbo + " %";
    lemakValue.textContent = show_lemak + " %";
    proteinValue.textContent = show_protein + " %";
    kolesterolValue.textContent = show_kolesterol + " %";
    sodiumValue.textContent = show_sodium + " %";

    Show_card(show_lemak, show_kalori, show_karbo, show_protein, show_sodium, show_kolesterol)
    console.log(`Nilai Kalori : ${show_kalori}`)
}


function Show_card(batas_lemak, batas_kalori, batas_karbohidrat, batas_protein, batas_sodium, batas_kolesterol){
    
    

    if (batas_lemak > 100) {
        card_lemak.classList.remove("d-none")
        lemakValue.appendChild(warnIcon('#card_lemak'))
    }
    if (batas_kalori > 100) {
        // kaloriValue.classList.remove('hidden');
        card_kalori.classList.remove("d-none");
        kaloriValue.appendChild(warnIcon('#card_kalori'))
    }
    if (batas_karbohidrat > 100) {
        warningCard.classList.remove('hidden');
        card_karbohidrat.classList.remove("d-none");
        karbohidratValue.appendChild(warnIcon('#card_karbohidrat'))
    }
    if (batas_protein > 100) {
        warningCard.classList.remove('hidden');
        card_protein.classList.remove("d-none");
        proteinValue.appendChild(warnIcon('#card_protein'))
    }
    if (batas_sodium > 100) {
        warningCard.classList.remove('hidden');
        card_sodium.classList.remove("d-none");
        sodiumValue.appendChild(warnIcon('#card_sodium'))
    }
    if (batas_kolesterol > 100) {
        warningCard.classList.remove('hidden');
        card_kolesterol.classList.remove("d-none");
        kolesterolValue.appendChild(warnIcon('#card_kolesterol'))
    }
}

const warnIcon = (attribute) => {
    const spanTag = document.createElement('span');
    const linkTag = document.createElement('a');
    spanTag.append(linkTag)
    linkTag.textContent = '⚠'
    linkTag.setAttribute('href', attribute);

    return spanTag;
}

// console.log(warnIcon('#card_kolesterol'))