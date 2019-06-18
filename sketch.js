 // Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
KNN Classification on Webcam Images with mobileNet. Built with p5.js
=== */

let video;

const knnClassifier = ml5.KNNClassifier();

let featureExtractor;

function setup() {

  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  
  noCanvas();

  var constraints = {
    audio: false,
    video: {
      facingMode: "environment"
    }
  };  
  
    
  video = createCapture(constraints);
    
  // Append it to the videoContainer DOM element
  video.parent('videoContainer');
  // Create the UI buttons
  createButtons();
    
  loadMyKNN();

    
}

function modelReady(){
    
  //select('#status').html('FeatureExtractor(mobileNet model) Loaded')
    
}


function addExample(label) {

  const features = featureExtractor.infer(video);

  knnClassifier.addExample(features, label);
    
  updateCounts();
    
}


function classify() {

  const numLabels = knnClassifier.getNumLabels();
    
  if (numLabels <= 0) {
    console.error('There is no examples in any label');
    return;
  }

  const features = featureExtractor.infer(video);

  knnClassifier.classify(features, gotResults);

}


function createButtons() {
  
  // Predict button
  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(classify);

}

// Show the results
function gotResults(err, result) {
  // Display any error
  if (err) {
    console.error(err);
  }

  if (result.confidencesByLabel) {
    const confidences = result.confidencesByLabel;
    
    if (result.label) {
      select('#result').html(result.label);
      select('#confidence').html(`${confidences[result.label] * 100} %`);
    }

    select('#confidenceRock').html(`${confidences['Rock'] ? confidences['Rock'] * 100 : 0} %`);
    select('#confidencePaper').html(`${confidences['Paper'] ? confidences['Paper'] * 100 : 0} %`);
    select('#confidenceScissor').html(`${confidences['Scissor'] ? confidences['Scissor'] * 100 : 0} %`);
  }

  classify();
}

// Update the example count for each label	
function updateCounts() {
  const counts = knnClassifier.getCountByLabel();

  select('#exampleRock').html(counts['Rock'] || 0);
  select('#examplePaper').html(counts['Paper'] || 0);
  select('#exampleScissor').html(counts['Scissor'] || 0);
}

// Load dataset to the classifier
function loadMyKNN() {
  knnClassifier.load('./myKNNDataset.json', updateCounts);
}