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

//Main function
function calendar() {

    //Fill taskArray with objects for each hour if array is empty; if not, the existing populated array will be used afterwards to fill in the timeblocks
    if (taskArray.length === 0){
        generateArray();
    }

    //Show current day in the header
    let currentDay = moment().format("MMMM DD, YYYY");
    let currentDate = $("<span>").addclass("date");
    currentDate.text(currentDay);
    today.append(currentDate);

    //Create timeblock row elements - loop to generate all rows
    for (let index = 0; index < taskArray.length; index++) {

        //Main row container
        let timeBlock = $("<div").addClass("time-block row");
        $(".container").append(timeBlock);

        //Hour display
        let hourVal = (taskArray[index].time);
        let hourDisplay = $("<div").addClass("hour").attr("data-value", "hour" + index);
        let hourLabel = $("<span>").attr("display", "inline-block").attr("vertical-align", "middle").text(hourVal);
        hourDisplay.append(hourLabel);
        timeBlock.append(hourDisplay);

        //Task input field
        let taskBlock = $("<textarea").attr("placeholder", "Add task...").attr("cols", "40").attr("id", hourVal);
        taskBlock.text(taskArray[index].task);
        timeBlock.append(taskBlock);

        //Save button
        let saveButton = $("<button>").addClass("saveBtn").attr("data-index", index).attr("data-hour", hourVal).text("Save");

        //Disabled save button for past hours
        let disabledSave = $("<button>").addClass("saveBtnDisabled").attr("type", "button").attr("disabled", true).text("Save");

        //Add 8 to index to match the timeblock index with the array index that starts at 8 for 8 am to set an index number that matches 24-hour format
        let hourFull = index + 8;

        //Get current hour in 24-hour format
        let currentHourRaw = moment().format("H");

        //Update text-area styling with the 'present' class for the row that corresponds to the current hour and append live save button
        if (currentHourRaw == hourFull) {
            taskBlock.addClass("present");
            timeBlock.append(saveButton);
        }

        //Update text-area styling with the 'past' class for any rows that correspond to past hours and disabled save button
        else if (currentHourRaw > hourFull) {
            taskBlock.addClass("past");
            taskBlock.removeAttr("placeholder");
            timeBlock.append(disabledSave);
        }
    
    }

    //Event listener for the live save button to save text-area input to the corresponding hour's object in the array
    $(".saveBtn").click(function(event){
        event.preventDefault();
        let targetObj = $(this).attr("data-index");
        taskArray[targetObj].task = $("#" + $(this).attr("data-hour")).val();
        localStorage.setItem("taskArray", JSON.stringify(taskArray));
    
    })

    //Event listener for reset schedule button - empty local storage and refresh to re-create the array with empty tasks
    $(".resetBtn").click(function(){
        localStorage.clear();
        location.reload();

        })
    }

    //Initiate function
    calendar();