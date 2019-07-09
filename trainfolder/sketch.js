

let image;

const knnClassifier = ml5.KNNClassifier();

let featureExtractor;

function setup() {
  
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  
  noCanvas();

  createButtons();
    
 
    
}


//add from file
function addExamplefromfile() {
    
       for (i = 1; i < 5; i++) {

         console.log(document.getElementById("image" + i))
    
         const image = document.getElementById("image" + i);
   
         const features = featureExtractor.infer(image);

         knnClassifier.addExample(features, 'stress fracture');
       
       }
    
       //console.log(document.getElementById("image1"))
    
       //const image = document.getElementById('image1');
   
       //const features = featureExtractor.infer(image);

       //knnClassifier.addExample(features, 'stress fracture');
  
  
}


function createButtons() {

  // Get classifier dataset
  buttonGetData = select('#save');
  buttonGetData.mousePressed(saveMyKNN);
    
}


// Save dataset as myKNNDataset.json
function saveMyKNN() {
  knnClassifier.save('myKNNDataset');
}

