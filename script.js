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
    }
}