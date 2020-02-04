window.addEventListener('load', () => {
    const sepalLen = document.querySelector('#sepalLen');
    const sepalWid = document.querySelector('#sepalWid');
    const petalLen = document.querySelector('#petalLen');
    const petalWid = document.querySelector('#petalWid');
    const modelName = document.querySelector('#modelName');
    const submitBtn = document.querySelector('#submitBtn');

    const sepalLen_description = document.querySelector('.sepalLen-value');
    const sepalWid_description = document.querySelector('.sepalWid-value');
    const petalLen_description = document.querySelector('.petalLen-value');
    const petalWid_description = document.querySelector('.petalWid-value');

    const result_name = document.querySelector('.result-name');
    const result_phot = document.querySelector('.photo');
    const result_sl = document.querySelector('.sl-result');
    const result_sw = document.querySelector('.sw-result');
    const result_pl = document.querySelector('.pl-result');
    const result_pw = document.querySelector('.pw-result');
    const result_md = document.querySelector('.md-result');

    sepalLen.addEventListener('input', () => {
        sepalLen_description.innerHTML = `${Number(sepalLen.value).toFixed(1)} cm`;
    });

    sepalWid.addEventListener('input', () => {
        sepalWid_description.innerHTML = `${Number(sepalWid.value).toFixed(1)} cm`;
    });

    petalLen.addEventListener('input', () => {
        petalLen_description.innerHTML = `${Number(petalLen.value).toFixed(1)} cm`;
    });

    petalWid.addEventListener('input', () => {
        petalWid_description.innerHTML = `${Number(petalWid.value).toFixed(1)} cm`;
    });

    // submitBtn.addEventListener('click', event => {
    //     event.preventDefault();

    //     // Predict the flower's class
    //     predict();

    //     document.querySelector('.result').style.display = 'block';

    // });

    function getData() {

    }

    function predict() {
        return new Promise((resolve, reject) => {

            let body = ` { 
            "sepalLen": ${sepalLen.value}, 
            "sepalWid": ${sepalWid.value}, 
            "petalLen": ${petalLen.value}, 
            "petalWid": ${petalWid.value} 
            }`;

            let API = `https://avramaral-iris-api.herokuapp.com/predict?modelName=${modelName.value}`;

            fetch(API, { method: "POST", body: body })
                .then(resp => resp.json())
                .then(data => {
                    console.log(data);
                    let species = '';
                    let nm_file = '';

                    if (data.prediction === 0) { species = 'Iris-Setosa'; nm_file = 'setosa'; }
                    else if (data.prediction === 1) { species = 'Iris-Versicolour'; nm_file = 'versicolor'; }
                    else { species = 'Iris-Virginica'; nm_file = 'virginica'; }

                    // Set DOM's new values
                    result_name.innerHTML = species;
                    result_phot.setAttribute('src', `./images/${nm_file}.png`);
                    result_sl.innerHTML = `${Number(sepalLen.value).toFixed(1)} cm`;
                    result_sw.innerHTML = `${Number(sepalWid.value).toFixed(1)} cm`;
                    result_pl.innerHTML = `${Number(petalLen.value).toFixed(1)} cm`;
                    result_pw.innerHTML = `${Number(petalWid.value).toFixed(1)} cm`;
                    result_md.innerHTML = `${modelName.value.replace(/([RLPVC])/g, ' $1').trim()}`;

                    resolve();
                });
        });
    }

    submitBtn.addEventListener('click', event => {
        event.preventDefault();

        // Predict the flower's class
        predict().then(() => {
            document.querySelector('.result').style.display = 'block';
        });

    });
});
