function selectCountry() {
    let countries = document.querySelectorAll('.country')
    let randNum = Math.floor(Math.random() * countries.length)
    alert(countries[randNum].innerText)
}

function selectCountryAnim() {
    const countries = document.querySelectorAll('.country');
    const arr = [];

    for (let i = 0; i < 20; i++) {
        arr.push(Math.floor(Math.random() * countries.length));
    }

    arr.forEach((idx, i) => {
        setTimeout(() => {
            const item = countries[idx].parentElement;
            item.style.backgroundColor = 'greenyellow';

            setTimeout(() => {
                item.style.backgroundColor = 'transparent';
            }, 200);
        }, i * 200);
    });
    setTimeout(()=>{
        alert(countries[arr.at(-1)].innerText)
    }, arr.length * 200)
}