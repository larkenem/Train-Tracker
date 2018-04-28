// $(document).ready(function() {

var config = {
    apiKey: "AIzaSyBNMQpsYPcERKLRleZ-ILYffKwaEHnhi-8",
    authDomain: "train-tracker-3f502.firebaseapp.com",
    databaseURL: "https://train-tracker-3f502.firebaseio.com",
    projectId: "train-tracker-3f502",
    storageBucket: "",
    messagingSenderId: "200876954706"
  };

  firebase.initializeApp(config);
  
  var database = firebase.database();

  // var name = "";
  // var destination = "";
  // var time = "";
  // var frequency = 0;

$("#submitButton").on("click", function() {
  event.preventDefault();

  var trainName = $("#inputName").val().trim();
  var trainDestination = $("#inputDestination").val().trim();
  //come back to this and work in "moments" for time calculation
  var trainTime = $("#inputTime").val().trim();
  var trainFrequency = $("#inputFreq").val().trim();

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,   
    frequency: trainFrequency
};

database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  $("#inputName").val("");
  $("#inputDestination").val("");
  $("#inputTime").val("");
  $("#inputFreq").val("");

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var name = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var time = childSnapshot.val().time;
  var frequency = childSnapshot.val().frequency;
  

  console.log(Name); 
  console.log(destination);
  console.log(time);
  console.log(frequency);

  //time of first train converted to military time
  var firstTrain = moment(trainTime, "HH:mm");

  //current time
  var timeNow = moment();

 //difference 
  var firstArrive = timeNow.diff(firstTrain, 'minutes');


  var last = arrive  % frequency;


  var away = frequency - last;


  var nextArriveTime = timeNow.add(away, 'minutes');

  //formatting next train arrival time
  var displayTime = nextArriveTime.format("HH:mm");

 
// adding data to table
$(".table").append("<tr><td>" + trainname + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrivaltime + "</td><td>" + awayTrain + "</td>");

// Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

// });



