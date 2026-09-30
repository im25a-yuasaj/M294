let imgs = document.querySelectorAll('.cup');
let winningCup = -1

imgs.forEach((img, index) => {
    if (winningCup === -1) {
            shuffle();
    }
    img.addEventListener('click', () => {
        imgs.forEach((item, index) => {
            if (index === winningCup) {
                item.src = 'assets/cup-open-ball.png';
                item.alt = 'with-ball';
            } else {
                item.src = 'assets/cup.png';
                item.alt = 'closed';
            }
        });

        if (index === winningCup) {
            imgs[winningCup].src = 'assets/cup-open-ball.png';
            alert('Richtig!');
        } else {
            imgs[winningCup].src = 'assets/cup-open-ball.png';
            alert('Falsch!');
        }

        setTimeout(() => {
            shuffle();
        }, 5000);
    });
});

function shuffle() {
    winningCup = Math.floor(Math.random() * imgs.length);

    imgs.forEach(img => {
        img.src = 'assets/cup.png';
        img.alt = 'closed';
    });

    imgs[winningCup].alt = 'with-ball';
}