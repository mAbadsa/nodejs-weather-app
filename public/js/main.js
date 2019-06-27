


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const summary = document.querySelector('.summary');
const temp = document.querySelector('.temp');

weatherForm.addEventListener('submit', e => {
    e.preventDefault();
    const location = search.value;

    fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                temp.textContent = data.error;
            } else {
                temp.textContent = data.temperature;
                summary.textContent = data.summary;
                console.log("d,fkv,f,vfkbkmb")
            }
        });
    });
});


