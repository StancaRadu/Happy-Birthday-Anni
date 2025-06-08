let CX = 0;
let CY = 0;

const trail = {
    colors:  [
        "#F7C6C7", // Pastel Pink
        "#FFF5BA", // Soft Yellow
        "#B8E3C7", // Mint Green
        "#D6CDEA", // Light Lavender
        "#A8D0E6", // Baby Blue
        "#F9D5B3"  // Peach
    ],
}

const envelope = {
    bgColors: [
        '#B2675E', '#A68BAF', '#5E8C6A', '#7A9E9F',
        '#D4A373', '#6C91BF', '#B07A7C', '#A0A583',
        '#C79293', '#6A9A8B', '#A798C9', '#C4A287',
        '#7A7A96', '#BDAD9E', '#8796A1', '#A97D7C',
        '#6D8B74', '#AD9BAA', '#B29B7F', '#7E90A3',
        '#A48E7F', '#698996', '#A8808A', '#8DA48F'
    ],
    photos: photoList, // Assuming photoList is defined elsewhere
    html: document.getElementById('envelope'),
    top: document.getElementById('envelope-top'),
    hearts: ['img/heart blue.png', 'img/heart red.png', 'img/heart pink.png']
}

function randomArray(max) {
  return [...Array(max + 1).keys()]
    .sort(() => Math.random() - 0.5);
}
const photoOrder = randomArray(envelope.photos.length - 1);
let photos = [];
let photoIndex = envelope.photos.length - 1; // Start with the last photo
let photoZIndex = 0; // Index for the random order of photos

function leaveTrail(e) {
    let TCX = e.clientX;
    let TCY = e.clientY;

    if (Math.abs(CX - TCX) > 25 || Math.abs(CY - TCY) > 25 ) {
        CX = TCX;
        CY = TCY;
        const star = document.createElement('div');
        star.classList.add('trail-graphic');

        // STYLE
        star.style.backgroundColor = trail.colors[Math.floor(Math.random() * trail.colors.length)];

        // POSITION
        let randomOffsetX = Math.floor(Math.random() * 20) - 10; // Random offset between -10 and 10
        let randomOffsetY = Math.floor(Math.random() * 20) - 10; // Random offset between -10 and 10
        let randomFallDistance = Math.floor(Math.random() * 100) + 50; // Random fall distance between 50 and 150 pixels
        star.style.left = `${CX + randomOffsetX}px`;
        star.style.top = `${CY + randomOffsetY}px`;
        // star.style.left = `${CX}px`;
        // star.style.top = `${CY}px`;

        // ANIMATION
        star.style.setProperty('--fall-distance', `${randomFallDistance}px`);
        star.style.setProperty('--fall-duration', `${Math.random() * 1.2 + .8}s`); // Random duration between .8s and 2s
        star.style.setProperty('--fall-scale', `${Math.random() * 0.5 + 1.5}`); // Random scale between 0.5 and 2
        star.addEventListener('animationend', () => { star.remove(); }); // Deletes the element from DOM 
        
        document.body.appendChild(star);
    }
}


function createAddPhotos(){
    for (let index = 0; index < envelope.photos.length; index++) {
        const photo = document.createElement('div');
        photo.classList.add('photo');

        const randomX = Math.floor(Math.random() * 10 - 55);
        const randomY = Math.floor(Math.random() * 10 - 47);
        const randomZ = Math.floor(Math.random() * 10 - 5);

        photo.style.setProperty('--x', `${randomX}%`);
        photo.style.setProperty('--y', `${randomY}%`);
        photo.style.setProperty('--z', `${randomZ}deg`);

        photo.style.backgroundColor = envelope.bgColors[Math.floor(Math.random() * envelope.bgColors.length)];
        photo.style.transform = `translate(var(--x), var(--y)) rotateZ(var(--z))`

        const img = document.createElement('img');
        img.src = envelope.photos[photoOrder[index]];

        photo.appendChild(img);

        // photo.style.backgroundImage = `url('${envelope.photos[photoOrder[index]]}')`;
        
        envelope.html.appendChild(photo);
        photos.push(photo);
    }
}
createAddPhotos();
document.addEventListener('mousemove', (e) => {
        leaveTrail(e);
    });
    document.addEventListener('touchmove', (e) => {
        e.preventDefault();
        leaveTrail(e.touches[0]);
    }, { passive: false });

window.addEventListener('load', () => {
    console.log('All images and resources are loaded');
    document.getElementById('loading').innerHTML = 'OPEN MAIL';

    

    document.getElementById('envelope').addEventListener('click', () => {
        if (!envelope.top.classList.contains('opened')) {
            envelope.top.classList.add('opened');
            document.getElementById('loading').remove();
            return
        }
        if (photoIndex == - 1) {
            document.getElementById('message').classList.add('photo-animation');
            document.getElementById('message').style.setProperty('--order-z', photoZIndex + 7);
        }
        if (photoIndex < 0)  return

        photos[photoIndex].classList.add('photo-animation');
        photos[photoIndex].style.setProperty('--order-z', photoZIndex + 6);
        photoIndex--;
        photoZIndex++;
    });

    setInterval(() => {
        const heart = document.createElement('div');

        const randomX = Math.floor(Math.random() * 100); // Random X position between -50 and 50
        const randomY = Math.floor(Math.random() * 50 + 20); // Random Y position between -50 and 50

        heart.style.setProperty('--x', `${randomX}%`);
        heart.style.setProperty('--y', `${randomY}%`);
        heart.style.left = `${randomX}%`;
        heart.style.top = `${randomY}%`;

        heart.style.backgroundImage = `url('${envelope.hearts[Math.floor(Math.random() * envelope.hearts.length)]}')`;



        heart.classList.add('heart');
        document.getElementById('message').appendChild(heart);
        heart.addEventListener('animationend', () => { heart.remove(); }); // Deletes the element from DOM 
    },  200);
});

