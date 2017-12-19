$(document).ready(function(){
//Initialize Firebase
    var config = {
        apiKey: "AIzaSyD9U43iEPQmRl97nNLyZsKp_Zk_e-reTA4",
        authDomain: "train-schedule-106ab.firebaseapp.com",
        databaseURL: "https://train-schedule-106ab.firebaseio.com",
        projectId: "train-schedule-106ab",
        storageBucket: "",
        messagingSenderId: "813608720457"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
   // var userRef = database.ref().child("routes");

$("#submit").on("click", function(event){
    event.preventDefault();
    let name = $("#trainName").val().trim();
    let place = $("#destination").val().trim();
    let time = $("#trainTime").val().trim();
    let frequency = $("#frequency").val().trim();

    var userRef = database.ref().child("routes");

    userRef.push().set({
        train: name,
        destination: place,
        time: time,
        frequency: frequency,
         });
    });

    database.ref("routes").on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());
        //set information taken from firebase to newRow in table using JQuery
        let newRow = $("<tr>");
        let name = $("<td>").html(childSnapshot.val().train);
        let place = $("<td>").html(childSnapshot.val().destination);
        let time = $("<td>").html(childSnapshot.val().time);
        let frequency = $("<td>").html(childSnapshot.val().frequency);
        //display new row and append coloumns
        
        $(newRow)
            .append(name)
            .append(place)
            .append(time)
            .append(frequency)
        $(".table").append(newRow);
    })

});