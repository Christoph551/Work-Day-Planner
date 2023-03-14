const $containerFluid = $('.container-fluid')
const currentDate = dayjs().format('MMMM D YYYY')
const $currentDate = $('#currentDay')

// Prints Current Date
$currentDate.append(currentDate)

const currentTime = dayjs().hour()

// Setting up an array of timeslots for the 9-5 workday
let workDay = [
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
]

for (i=0; i < workDay.length; i++) {
  // Define
  let hourListDiv = $('<div>'); 
  let hourListChild = $('<div>');
  let hourListTextArea = $('<textarea>');
  let hourListSaveBtn = $('<button>');
  let saveBtnIcon = $('<i>');

  // Classes Text Content Attributes
  hourListDiv.addClass('row time-block past');
  hourListTextArea.attr('id', 'hour-'+ workDay[i]);
  hourListTextArea.addClass('textInput');

  if (workDay[i] == currentTime) {
    hourListDiv.addClass('row time-block present');
  } else if (workDay[i] > currentTime ) {
    hourListDiv.addClass('row time-block future');
  } else if (workDay[i] < currentTime) {
    hourListDiv.addClass('row time-block past');
  }

  hourListChild.addClass('col-2 col-md-1 hour text-center py-3');
  hourListTextArea.addClass('col-8 col-md-10 description');
  hourListSaveBtn.addClass('btn saveBtn col-2 col-md-1');
  saveBtnIcon.addClass('fas fa-save');

  // Converts 24 hour clock to 12 hour
  if (workDay[i] < 12 ) {
    hourListChild.text(workDay[i]+"AM")
  } else if (workDay[i] >= 13) {
    let convertTime = (workDay[i]-12);
    hourListChild.text(convertTime+"PM")
  } else if (workDay[i] >= 12 ) {
    hourListChild.text(workDay[i]+"PM")
  } 

  // Where to Display on the page
  $containerFluid.append(hourListDiv)
  hourListDiv.append(hourListChild)
  hourListDiv.append(hourListTextArea)
  hourListDiv.append(hourListSaveBtn)
  hourListSaveBtn.append(saveBtnIcon)

}

$(document).ready (function () {

  $('.saveBtn').on("click", function(e){
    let note = $(this).siblings(".textInput").val();
    let timeSlot = $(this).siblings(".textInput").attr("id");

    localStorage.setItem(timeSlot, note);
  });
  

// Pull note from local storage
for (i=9; i<=17; i++) {
  $("#hour-"+i).text(localStorage.getItem("hour-"+i))
}
});

