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
        pA.push(new Particle());
    }
});
window.addEventListener('click', function(event)
{
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i=0;i<70;i++) 
    {
        pA.push(new Particle());
    }
});
class Particle 
{
    constructor() 
    {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random()*20+5; 
        this.speedX = Math.random()*3-1.5; 
        this.speedY = Math.random()*3-1.5; 
        this.color = 'hsl(' + hue + ', 100%, 50%)'; 
    }
    update()
    {
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size>0.2)
        {
            this.size -= 0.15;
        }
    }
    draw()
    {
        ctx.save();
        ctx.shadowColor = 'rgba(118, 33, 91, 0.86)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
        ctx.restore();
        if(txtOp>0) 
        {
            txtOp-=0.0005;
        }
    }
}