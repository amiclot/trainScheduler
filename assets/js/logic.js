var config = {
    apiKey: "AIzaSyAxfiFMFKoTqvyg8BgyZFFkqiuEpOKLU8E",
    authDomain: "data-management-cb6aa.firebaseapp.com",
    databaseURL: "https://data-management-cb6aa.firebaseio.com",
    projectId: "data-management-cb6aa",
    storageBucket: "",
    messagingSenderId: "677338790965"
  };
  firebase.initializeApp(config);

var database = firebase.database();


$("#addTrain").on("click", function(){


  event.preventDefault();
  
  var trainName = $("#trainNameInput").val().trim();
  var traindestination = $("#destinationInput").val().trim();
  var trainStart = moment($("#startInput").val().trim(), "HH:mm").format("X");
  var trainFrequency = $("#frequencyInput").val().trim();




  var newTrain = {
    name:  trainName,
    destination: traindestination,
    start: trainStart,
    frequency: trainFrequency
  }


  database.ref().push(newTrain);


  // Clears all of the text-boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#startInput").val("");
  $("#frequencyInput").val("");

 
});



database.ref().orderByChild("trainStart").limitToLast(10).on("child_added", function(childSnapshot){


  console.log(childSnapshot.val());


  var trainName = childSnapshot.val().name;
  var traindestination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  console.log("this is train start " + trainStart);
  var trainFrequency = childSnapshot.val().frequency;

  //pushed back 1 year to make sure it comes before current time for diff calc
  

  var trainStartUnix = moment(trainStart, "X").subtract(1, "years");
  console.log("this is train start converted " + trainStartUnix);


  var currentTime = moment();
  console.log(moment(currentTime).format("X"));

  
  var diffTime = moment(currentTime).diff(moment(trainStartUnix), "X");
  console.log("diff: " + diffTime);

 
  var remainder = diffTime % trainFrequency;
  console.log(remainder);

  
  var minutesTillTrain = trainFrequency - remainder;
  console.log("minutes till next train: " + minutesTillTrain);


  var nextTrain = moment().add(minutesTillTrain, "minutes")
  console.log("next Train time: " + moment(nextTrain).format("HH:mm"));
  nextTrainConverted = moment(nextTrain).format("hh:mm A");

 
  console.log(trainName);
  console.log(traindestination);
  console.log(trainStartUnix);
  console.log(trainFrequency);


  var trainStartConverted = moment.unix(trainStartUnix).format("HH:mm");

  
  $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + traindestination + "</td><td>" + trainFrequency + "</td><td>" + nextTrainConverted + "</td><td>" + minutesTillTrain);

});