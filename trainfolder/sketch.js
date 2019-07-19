

let image;

const knnClassifier = ml5.KNNClassifier();

let featureExtractor;

function setup() {
  
  featureExtractor = ml5.featureExtractor('MobileNet');
  
  noCanvas();

  createButtons();
    
 
    
}


//add from file
function addExamplefromfile() {
    
     var x;
    
     for (i = 1; i < 5; i++) {
    
        
         x = document.createElement("IMG");
         
         x.id = "image1";
         
         document.getElementById("image1").src = "https://rsalibian.github.io/trainfolder/images/case1.jpg";
         
         const features = featureExtractor.infer(x);

         knnClassifier.addExample(features, 'Calcaneal stress fracture');
         
         console.log("added");
             
         //document.getElementById("image1").src = "https://rsalibian.github.io/trainfolder/images/case1.jpg";
    
     }
    
       for (i = 1; i < 5; i++) {

         console.log(document.getElementById("image" + i))
    
         const image = document.getElementById("image" + i);
   
         const features = featureExtractor.infer(image);

         knnClassifier.addExample(features, 'Calcaneal stress fracture');
       
       }
    
       for (j = 1; j < 5; j++) {

         console.log(document.getElementById("nimage" + j))
    
         const nimage = document.getElementById("nimage" + j);
   
         const features2 = featureExtractor.infer(nimage);

         knnClassifier.addExample(features2, 'No calcaneal stress fracture');
       
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

