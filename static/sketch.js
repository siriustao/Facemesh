let facemesh;
let video;
let predictions = [];

let modelIsReady = false;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  facemesh = ml5.facemesh(video, modelReady);

  facemesh.on("predict", results => {
    predictions = results;
  });
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
  modelIsReady = true;
}

function draw() {
    image(video, 0, 0, width, height);
    drawKeypoints();
    printAnnotations();

}

function printAnnotations(){
  if (predictions.length > 0) {
    console.log(Object.keys(predictions[0].annotations))

    const midEyes = predictions[0].annotations.midwayBetweenEyes[0];
    let x =  midEyes[0];
    let y = midEyes[1];
    console.log(midEyes)
    fill(255);
    ellipse(x+40,y+7,25,25);
    ellipse(x-40,y+7,25,25);
    fill(0);
    ellipse(x+40,y+10,12,12);
    ellipse(x-40,y+5,12,12);
  }
}





function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;
    // Draw facial keypoints.
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];
      fill(0, 255, 0);
      ellipse(x, y, 5, 5);

    }
  }
}
