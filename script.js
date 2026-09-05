const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const pA = [];
let hue = 0; 
let txtOp = 1; 
const mouse={
    x: undefined,
    y: undefined
};
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
window.addEventListener('mousemove', function(event)
{
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i=0;i<35;i++) 
    {
        particlesArray.push(new Particle());
    }
});
window.addEventListener('click', function(event)
{
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i=0;i<70;i++) 
    {
        particlesArray.push(new Particle());
    }
});