

const knnClassifier = ml5.KNNClassifier();

let featureExtractor;

function setup() {
  
  featureExtractor = ml5.featureExtractor('MobileNet');
  
  noCanvas();

  createButtons();
    
}


//add from file
function addExamplefromfile() {
    
  
     var downloadingImage = new Image();
    
     for (i = 1; i < 11; i++) {
         
         downloadingImage.src = "https://rsalibian.github.io/CSF/trainfolder/images/case" + i + ".jpg";
         
         downloadingImage.onload = function(){
           
            const features = featureExtractor.infer(downloadingImage);

            knnClassifier.addExample(features, 'Calcaneal Stress Fracture');
                 
         }
         
         console.log(downloadingImage.src);
        
     }
    
    
    for (i = 1; i < 11; i++) {
         
         downloadingImage.src = "https://rsalibian.github.io/CSF/trainfolder/images/normalcase" + i + ".jpg";
         
         downloadingImage.onload = function(){
           
            const features = featureExtractor.infer(downloadingImage);

            knnClassifier.addExample(features, 'No Calcaneal Stress Fracture');
                 
         }
         
         console.log(downloadingImage.src);
        
     }
  
  
}


function createButtons() {

  // Get classifier dataset
  buttonGetData = select('#save');
  buttonGetData.mousePressed(saveMyKNN);
    
}


// Save dataset as myKNNDataset.json
function saveMyKNN() {
  knnClassifier.save('CSFknnDataSet');
}

