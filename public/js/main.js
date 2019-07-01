


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const summary = document.querySelector('.summary');
const temp = document.querySelector('.temp');
const maxTemp = document.querySelector('.max-temp');
const minTemp = document.querySelector('.min-temp');

weatherForm.addEventListener('submit', e => {
    e.preventDefault();
    const location = search.value;

    fetch(`/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                temp.textContent = data.error;
            } else {
                temp.textContent = data.temperature;
                summary.textContent = data.summary;
                maxTemp.textContent = data.maxTemp;
                minTemp.textContent = data.minTemp;
            }
            console.log("mkmdvkmv")
        });
    });
});


