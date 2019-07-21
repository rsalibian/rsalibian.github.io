

const knnClassifier = ml5.KNNClassifier();

let featureExtractor;

function setup() {
  
  featureExtractor = ml5.featureExtractor('MobileNet');
  
  noCanvas();

  createButtons();
    
}


//add from file
function addExamplefromfile() {
    
     var sourceFolder = new Folder("https://rsalibian.github.io/CSF/trainfolder/images");  
    
     var fileList = sourceFolder.getFiles();  
    
    
     for (var i = 0; i < fileList.length; i++) { 
         
         console.log(downloadingImage.src);
    
     }  
    
    
     var downloadingImage = new Image();
    
     for (i = 1; i < 5; i++) {
         
         downloadingImage.src = "https://rsalibian.github.io/CSF/trainfolder/images/case" + i + ".jpg";
         
         downloadingImage.onload = function(){
           
            const features = featureExtractor.infer(downloadingImage);

            knnClassifier.addExample(features, 'Calcaneal stress fracture');
                 
         }
         
         console.log(downloadingImage.src);
        
     }
    
    
    for (i = 1; i < 5; i++) {
         
         downloadingImage.src = "https://rsalibian.github.io/CSF/trainfolder/images/normalcase" + i + ".jpg";
         
         downloadingImage.onload = function(){
           
            const features = featureExtractor.infer(downloadingImage);

            knnClassifier.addExample(features, 'No calcaneal stress fracture');
                 
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
  knnClassifier.save('myKNNDataset');
}

