const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const pA = [];
let hue = 0; 
let txtOp = 1; 
const clkBtn = document.getElementById('clockButton');
let showclk= false;
clkBtn.addEventListener('click', function() 
{
    showclk = true;
    clkBtn.style.display= 'none';
});
const bgTexts= [];
for (let i = 0; i < 15; i++) 
{
    bgTexts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 1 + 0.5
    });
}
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
    for(let i=0;i<10;i++) 
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
        this.size = Math.random()*7+5; 
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
        ctx.shadowColor = 'rgba(13, 7, 11, 0.86)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
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
        for(let j=i;j<pA.length;j++)
        {
            const dx= pA[i].x - pA[j].x;
            const dy= pA[i].y - pA[j].y;
            const dist= Math.sqrt(dx*dx + dy*dy);
            if(dist<100)
            {
                ctx.beginPath();
                ctx.strokeStyle= pA[i].color;
                ctx.moveTo(pA[i].x, pA[i].y);
                ctx.lineTo(pA[j].x , pA[j].y);
                ctx.stroke();
            }
        }
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
function bgtext()
{
    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.font = 'bold 40px Arial';
    ctx.fillStyle = '#ff69b4';
    ctx.textAlign = 'center';
    for (let i = 0; i < bgTexts.length; i++) 
    {
        bgTexts[i].y += bgTexts[i].speed;
        ctx.fillText(
            'HAPPY HOLI',
            bgTexts[i].x,
            bgTexts[i].y
        );
        if (bgTexts[i].y > canvas.height + 50) 
        {
            bgTexts[i].y = -50;
        }
    }
    ctx.restore();;
}
function clk()
{
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight-now;
    const ts = Math.floor(diff / 1000);
    const h = Math.floor(ts / 3600);
    const mins = Math.floor((ts % 3600) / 60);
    const sec = ts % 60;
    const time =
        String(h).padStart(2, '0') + ':' +
        String(mins).padStart(2, '0') + ':' +
        String(sec).padStart(2, '0');
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.textAlign = 'center';
    ctx.font = 'bold 80px Arial';
    ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 20;
    ctx.fillText(time, canvas.width / 2, canvas.height / 2);
    ctx.restore();
}
function clkring() 
{
    const now= new Date();
    const seconds= now.getSeconds();
    const centerX= canvas.width / 2;
    const centerY= canvas.height / 2;
    const radius= 180;
    const startAngle= -Math.PI / 2;
    const endAngle= startAngle + (seconds / 60) * Math.PI * 2;
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle= 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth= 5;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle= 'hsl(' + hue + ', 100%, 50%)';
    ctx.lineWidth= 5;
    ctx.shadowColor= ctx.strokeStyle;
    ctx.shadowBlur= 15;
    ctx.stroke();
    ctx.restore();
}
function animate() 
{
    ctx.fillStyle = 'rgba(20, 9, 38, 0.65)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    bgtext();
    if(showclk)
    {
        clk();
        clkring();
    }
    else
    {
        
        Holimsg();
        handleParticles();

    }
    hue += 5;
    requestAnimationFrame(animate);
}
animate();