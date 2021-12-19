//Global variables
    //Pseudonym for current day in header
    var today = $('#currentDay')

    //Get existing saved tasks from local storage or create empty array
    var taskArray = JSON.parse(localstorage.getItem("taskArray")) || [];

//Function to generate array of hour objects with empty tasks
function generateArray(){
    for (i = 8; i < 18; i++) {

        //Set the object's hour property value
        let hour = "";
        if (i < 12) {
            hour = i + "am"; //8am
        }
        else if (i > 12) {
            hour = i - 12 + "pm"; //1pm
        }
        else {
            hour = i + "pm"; //12pm
        }

        //Define empty object for the current loop iteration
        let hourObj = {};

        //Add object property for the current iteration's hour, ie. "time: 8am" etc.
        hourObj.time = hour;

        //Add empty task property for the current iteration's hour --this will be filled when input is received and saved
        hourObj.task ="";

        //Push the current iteration's object into the taskArray
        taskArray.push(hourObj);

        //Store the taskArray to local storage 
        localStorage.setItem("taskArray", JSON.stringify(taskArray));
    }
}