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
function handleParticles() 
{
    for (let i=0;i<pA.length;i++) 
    {
        pA[i].update();
        pA[i].draw();
        if (pA[i].size <= 0.2) 
        {
            pA.splice(i, 1);
            i--;
        }
    }
}
function Holimsg() 
{
    if (txtOp<=0) 
        return;
    ctx.save();
    ctx.globalAlpha = txtOp;
    ctx.textAlign = 'center';
    ctx.font = 'bold 70px Arial';
    ctx.fillStyle = '#dd7eae';
    ctx.fillText('HAPPY HOLI', canvas.width/2, canvas.height/2-90);
    ctx.font = 'bold 50px Arial';
    ctx.fillStyle = '#ff3366';
    ctx.fillText('Spread the Joy!', canvas.width/2, canvas.height/2-20);
    ctx.font = '20px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Click or move your cursor to enjoy the colors', canvas.width/2, canvas.height/2+30);
    ctx.restore();
}
function animate() 
{
    ctx.fillStyle = 'rgba(17, 17, 17, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    Holimsg();
    handleParticles();
    hue += 5;
    requestAnimationFrame(animate);
}
animate();