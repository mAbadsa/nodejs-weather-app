


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const summary = document.querySelector('.summary');
const temp = document.querySelector('.temp');
const maxTemp = document.querySelector('.max-temp');
const minTemp = document.querySelector('.min-temp');
const time = document.querySelector('.time');

weatherForm.addEventListener('submit', e => {
    e.preventDefault();
    const location = search.value || 'gaza';
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    fetch(`/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                temp.textContent = data.error;
            } else {
                temp.textContent = data.temperature;
                summary.textContent = data.summary;
                maxTemp.textContent = data.maxTemp;
                minTemp.textContent = data.minTemp;
                
                const date = new Date(data.time3);
                const day = date.setDate();
                const a = `${days[date.getDay()]}-${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`;
                time.textContent = a;
                console.log(day);
            }

            console.log("mkmdvkmv");

        });
    });
});


