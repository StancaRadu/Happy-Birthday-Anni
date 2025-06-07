/* ------------------------------ cursor trail ------------------------------ */

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
        '#FF6F61', // coral red
        '#FFA500', // bright orange
        '#32CD99', // medium turquoise
        '#3B82F6', // vivid blue
        '#A23E48', // deep raspberry
        '#F2C94C', // sunflower yellow
    ]
}


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
        star.addEventListener('animationend', () => { star.remove(); }); // Deletes the element from DOM 
        
        document.body.appendChild(star);
    }
}

document.addEventListener('mousemove', (e) => {
    leaveTrail(e);
});
document.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    leaveTrail(t);
});