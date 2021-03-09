class Bird extends Base
{
    constructor(x, y)
    {
        super(x,y,50,50);
        this.img=loadImage("sprites/bird.png");
        this.smoke_img=loadImage("sprites/smoke.png");
        this.path=[];
    }
    display()
    {
        super.display();
        if(this.body.velocity.x>10 && this.body.position.x>150)
        {
            var pos=[this.body.position.x,this.body.position.y];
            this.path.push(pos);
        }
        for(var i=0; i<this.path.length; i=i+1)
        {
            image(this.smoke_img,this.path[i][0],this.path[i][1]);
        }
    }
}