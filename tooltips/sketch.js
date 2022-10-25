let trfeaturesees;

var projection = d3
  .geoMercator()
  .center([8.3090, 47.0502])
  .translate([400, 400])
  .scale(3000000)

let quadtree = d3.quadtree();

let closestTree = null;

function preload() {
  trees = loadJSON("trees.json");
}

function setup() {
  createCanvas(800, 800);

 

  quadtree
    .x(function (d) {
      return d.geometry.coordinates[0]
    })
    .y(function (d) {
      return d.geometry.coordinates[1]
    })
    .addAll(trees.features);

  noLoop();
}

function draw() {
  background(250)

  fill(0,0,255)


  push();
  fill(255,0,0);
  rect(100,100,400,300);
  pop();
  

 // fill(0,255,0);
  rect(200,200,100,50);

  // draw the trees as ellipses
  for (let i = 0; i < trees.features.length; i++) {
    let tree = trees.features[i];
    let coords = tree.geometry.coordinates
    let pos = projection(coords)
    let x = pos[0]
    let y = pos[1]
    let radius = 2
    fill(0)
    noStroke()
    ellipse(x, y, radius, radius)
  }

  if (closestTree) {
    //  console.log(closestTree)
    let coords = closestTree.geometry.coordinates;
    let pos = projection(coords);
    fill(255, 0, 0);
    ellipse(pos[0], pos[1], 5, 5);

    fill(255);
    stroke(0);
    strokeWeight(2);
    rect(pos[0], pos[1] - 30, 200, 50);

    let jahr = "-"
    if (closestTree.properties.PFLANZJAHR) {
      jahr = closestTree.properties.PFLANZJAHR
    }
    textSize(12)
    noStroke()
    fill(0)
    text("Pflanzjahr: " + jahr, pos[0] + 10, pos[1]);

    let hoehe = "-"
    if(closestTree.properties.BAUMHOEHE){
      hoehe = closestTree.properties.BAUMHOEHE
    }
    text("Höhe: " + hoehe + "m", pos[0] + 10, pos[1] +20);


  }

}

function mouseMoved() {
  // console.log('hallo');

  let pos = projection.invert([mouseX, mouseY])

  closestTree = quadtree.find(pos[0], pos[1])
  // console.log(closestTree);


  redraw();

}


