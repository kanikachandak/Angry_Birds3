class Slingshot
{
    constructor(bodyA, pointB)
    {
        var options= {
            bodyA:bodyA,
            pointB:pointB,
            stiffness:0.03,
            length:40
        };
        this.pointB=pointB;
        this.slingshot= Constraint.create(options);
        this.sling1=loadImage("sprites/sling1.png");
        this.sling2=loadImage("sprites/sling2.png");
        this.sling3=loadImage("sprites/sling3.png");
        World.add(world, this.slingshot);
    }
    fly()
    {
        this.slingshot.bodyA=null;
    }
    attach(body)
    {
        this.slingshot.bodyA=body;
    }
    display()
    {
        if(this.slingshot.bodyA)
        {
            var pointA=this.slingshot.bodyA.position;
            var pointB=this.pointB;
            push();
            stroke(77,35,14);
            if(pointA.x<150)
            {
                strokeWeight(5);
                line(pointA.x-25, pointA.y, pointB.x, pointB.y); //wire coordinate
                line(pointA.x-25, pointA.y, pointB.x+35, pointB.y-3);
                image(this.sling3, pointA.x-30, pointA.y-10, 15,30);
            }
            else
            {
                strokeWeight(3);
                line(pointA.x+25, pointA.y, pointB.x, pointB.y); //wire coordinate
                line(pointA.x+25, pointA.y, pointB.x+35, pointB.y-3);
                image(this.sling3, pointA.x+25, pointA.y-10, 15,30);
            }
            pop();
        }
        image(this.sling1,150,60);
        image(this.sling2,120,60);
    }
}