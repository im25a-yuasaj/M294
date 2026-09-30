const cantons = ['ag', 'ar', 'bl', 'fr', 'gl', 'ju', 'ne', 'ow', 'sh', 'zh'];
const board = document.getElementById('board');
let openTiles = []

function checkTurn(event) {
    console.log(event)
    const clickedTile = event.srcElement.querySelector('.tile');
    clickedTile.classList.replace('invisible', 'visible');
    openTiles.push(clickedTile);
    if (openTiles.length >= 2 && openTiles[0].innerHTML !== openTiles[1].innerHTML) {
        openTiles.forEach(tile => {
            setTimeout(() => {
                tile.classList.replace('visible', 'invisible');
            }, 1000);
        });
        openTiles.length = 0;
    } else {
        alert('found');
        openTiles.length = 0;
    };
}

function createTile(canton) {
    const tileImage = document.createElement('img');
    tileImage.setAttribute('src', 'img/' + canton + '.png');
    tileImage.setAttribute('class', 'tile invisible')
    const tile = document.createElement('button');
    tile.append(tileImage);
    tile.onclick = checkTurn;
    return tile;
}
cantons.sort(() => 0.5 - Math.random())
for (canton of cantons){
    board.append(createTile(canton))
}

cantons.sort(() => 0.5 - Math.random())
for (canton of cantons){
    board.append(createTile(canton))
}
