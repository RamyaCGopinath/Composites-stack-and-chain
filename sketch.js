var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Composites = Matter.Composites,
  Composite = Matter.Composite,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  World = Matter.World,
  Constraint = Matter.Constraint,
  Bodies = Matter.Bodies,
  Body = Matter.Body;

// create engine
var engine = Engine.create(), world = engine.world;
console.log(Body);
console.log(Bodies);
// create renderer
var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 800,
    height: 400,
    wireframes: false
  }
});


Engine.run(engine);

Render.run(render);

  //                         xx,  yy,column, row, columnGap, rowGap, callBack
var stack = Composites.stack(550, 100, 5, 1, 0, 0, function(x, y) {
  return Bodies.rectangle(x, y, 40, 10, {
    isStatic:false,
    render: {
      fillStyle: 'orange',
      strokeStyle: 'black',
    }} );
  
});

console.log(stack);

//                    x-offsetA, y-offsetA, x-offsetB, y-offsetB  
var r = Composites.chain(stack, 0.1,0,-1,0, {stiffness: 0.1, length: 0.1, render: {type: 'line'}});
  

Composite.add(stack, Constraint.create({
    pointA: {x:555,y:130},
    bodyB: stack.bodies[0],
    pointB: {x: 25, y: 0},
    length:1,
    stiffness: 0.1
  }));


var lstack = Composites.stack(50, 100, 15, 10, 0, 0, function(x, y) {
  return Bodies.rectangle(x, y, 30, 50, {
    render: {
      fillStyle: 'red',
      strokeStyle: 'black'
    }
  });
});

World.add(world, [
  stack,
  lstack,
  // walls
  Bodies.rectangle(400, 0, 810, 30, { isStatic: true }),
  Bodies.rectangle(400, 400, 810, 30, { isStatic: true }),
  Bodies.rectangle(800, 200, 30, 420, { isStatic: true }),
  Bodies.rectangle(0, 200, 30, 420, { isStatic: true })
]);


function draw(){
    background(255)
    text(mouseX+", "+mouseY,mouseX,mouseY);
}