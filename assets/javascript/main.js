

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

$("#submitButton").on("click", function() {
  event.preventDefault();
  //assigning variable to inputs from html
  var trainName = $("#inputName").val().trim();
  var trainDestination = $("#inputDestination").val().trim();
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
//getting data from inputs to display in firebase
  var name = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var time = childSnapshot.val().time;
  var frequency = childSnapshot.val().frequency;
  

  console.log(name); 
  console.log(destination);
  console.log(time);
  console.log(frequency);

  //time of first train converted to military time
  var firstTrain = moment(time, "HH:mm");

  //current time
  var timeNow = moment();

  //calculates in min diff between first train and now 
  var firstArrive = timeNow.diff(firstTrain, 'minutes');

  //calculates last train time
  var last = firstArrive  % frequency;

  //calculates how far away next train is
  var minAway = frequency - last;

  //calculates in min how far away the train is from now
  var nextArriveTime = timeNow.add(minAway, 'minutes');

  //actually disaplys in mins how many min away the next train is
  var displayTime = nextArriveTime.format("HH:mm");

 
// adding data to table
$(".table").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + displayTime + "</td><td>" + minAway + "</td>");

// Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

// });



