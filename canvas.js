const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

// //gradient
// //linear
// const grdL = ctx.createLinearGradient(0, 0, 200, 0);
// grdL.addColorStop(0, "red");
// grdL.addColorStop(1, "white");

// //radial
// const grdR = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
// grdR.addColorStop(0, "red");
// grdR.addColorStop(1, "white");

// //line
// ctx.beginPath();
// ctx.moveTo(300, 100);
// ctx.strokeStyle = "black";
// ctx.lineTo(600, 300);
// ctx.lineTo(400, 300);
// ctx.stroke();
// ctx.beginPath();
// ctx.strokeStyle = "yellow";
// ctx.moveTo(400, 300);
// ctx.lineTo(800, 600);
// ctx.stroke();

// //rect

// ctx.fillStyle = "rgba(255,0,0,.5)";
// ctx.fillRect(100, 100, 100, 100);
// ctx.fillStyle = "rgba(0,255,0,.5)";
// ctx.fillRect(10, 10, 150, 80);
// ctx.fillStyle = "rgba(0,0,255,.5)";
// ctx.fillRect(300, 300, 100, 100);

// //circle

// ctx.beginPath();
// ctx.arc(800,600,50,0,2* Math.PI,false);
// ctx.strokeStyle= 'gray';
// ctx.stroke();

// //text
// //fill
// ctx.font = "30px sans-serif";
// ctx.textAlign = "center";
// ctx.fillText("redhotmagma", canvas.width / 2, canvas.height / 2);

// //stroke
// ctx.font = "30px sans-serif";
// ctx.strokeStyle = "black";
// ctx.strokeText("redhotmagma", 1000, 160);

// //multiple elements with loops e.g. circle

// for (let i = 0; i < 100; i++) {
//   const x = Math.random() * canvas.width;
//   const y = Math.random() * canvas.height;

//   ctx.beginPath();
//   ctx.arc(x, y, 50, 0, 2 * Math.PI, false);
//   ctx.strokeStyle = "hotpink";
//   ctx.stroke();
// }



//eventListener for interactivity
const mouse = {
    x: undefined,
    y: undefined
}

const maxRadius = 50;

const colorArray = [
    '#003547',
    '#005E54',
    '#C2BB00',
    '#E1523D',
    '#ED8B16'
]

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;

    console.log(mouse.x, mouse.y)
})

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    initCircles()
})


//Animation
const newCircle = (x, y, dx, dy, radius, color) => {
    return {
        x,
        y,
        dx,
        dy,
        radius,
        color,
        minRadius: radius,
        draw() {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
            // ctx.strokeStyle = 'rgba(255,0,0,1)';
            // ctx.stroke();
            ctx.fillStyle = color;
            ctx.fill();
        },
        update() {
            if (x + radius > innerWidth || x - radius < 0) {
                dx = -dx;
            }
            x += dx

            if (y + radius > innerHeight || y - radius < 0) {
                dy = -dy;
            }
            y += dy

            //interactivty
            if (mouse.x - x < 50 && mouse.x - x > -50 && mouse.y - y < 50 && mouse.y - y > -50) {
                if (radius < maxRadius) {
                    radius += 1;
                }

            } else if (radius > this.minRadius) {
                radius -= 1
            }

            this.draw()
        }
    }
}


let circleArray = [];

const initCircles = () => {

    circleArray = []

    for (let i = 0; i < 1000; i++) {

        let radius = Math.random() * 5 + 1;
        let randomX = Math.random() * (innerWidth - radius * 2) + radius;
        let randomY = Math.random() * (innerHeight - radius * 2) + radius;
        let randomDX = (Math.random() - 0.5);
        let randomDY = (Math.random() - 0.5);
        let color = colorArray[Math.floor(Math.random() * (colorArray.length))];


        circleArray.push(newCircle(randomX, randomY, randomDX, randomDY, radius, color)
        )

    }
}


const animate = () => {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, innerWidth, innerHeight)

    circleArray.map((circle) => {
        circle.update()
    })

}


initCircles()
animate()


