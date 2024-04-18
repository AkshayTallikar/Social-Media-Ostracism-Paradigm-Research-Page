var metas = document.getElementsByTagName('meta');
var i;
if (navigator.userAgent.match(/iPhone/i)) {
  for (i=0; i<metas.length; i++) {
    if (metas[i].name == "viewport") {
      metas[i].content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
    }
  }
  document.addEventListener("gesturestart", gestureStart, false);
}
function gestureStart() {
  for (i=0; i<metas.length; i++) {
    if (metas[i].name == "viewport") {
      metas[i].content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6";
    }
  }
}
// Get slider input elements and value displays
const sliderInputs = document.querySelectorAll('.slider-input');
const sliderValues = document.querySelectorAll('.slider-value');

// Update value displays when sliders are moved
sliderInputs.forEach((slider, index) => {
  slider.addEventListener('input', () => {
    sliderValues[index].textContent = slider.value;
  });
});

// Get create button, popup, and selected values list elements
const createBtn = document.getElementById('create-btn');
const popup = document.getElementById('popup');
const closeBtn = document.querySelector('.close-btn');
const selectedValuesList = document.getElementById('selected-values');

const createConditionBtn = document.getElementById('create-btn2');
const popup2 = document.getElementById('popup2');
const closeBtn2 = document.querySelector('.close-btn2');

document.getElementById("create-btn2").addEventListener("click", function() {
  var textInputValue = document.getElementById("textInput2").value;
  var textInputValue2 = document.getElementById("textInput3").value;
  console.log(textInputValue);
  console.log(textInputValue2);

  document.getElementById("textInput2").value = "";
  document.getElementById("textInput3").value = "";

});
document.getElementById("create-btn3").addEventListener("click", function() {

  document.getElementById("popup2").style.display = "block";
});


// Function to generate random times
function generateRandomTimes(count, duration) {
  let times = [];
  for (let i = 0; i < count; i++) {
    times.push(Math.floor(Math.random() * duration));
  }
  return times.sort((a, b) => a - b);
}

// Show popup and display selected values when create button is clicked
document.getElementById("create-btn").addEventListener("click", function() {
  var slider1Value = document.getElementById("slider1").value;
  var slider2Value = document.getElementById("slider2").value;
  var slider3Value = parseInt(document.getElementById("slider3").value);
  var textInputValue = parseInt(document.getElementById("textInput").value);

  // Likes/dislikes
  var likesInput = document.getElementById("textInput2").value.split(',');
  var dislikesInput = document.getElementById("textInput3").value.split(',');

  // Generate random times for likes and dislikes
  var totalDuration = slider2Value;
  var likesTimes = generateRandomTimes(likesCount, totalDuration * 10000);
  var dislikesTimes = generateRandomTimes(dislikesCount, totalDuration * 10000);

  var likesInputString = '[' + likesInput + ']';
  var dislikesInputString = '[' + dislikesInput + ']';

  // Names for likes and dislikes
  var namesForLikes = ['Ky', 'Arjen', 'AncaD', 'Nick', 'Heather', 'Jane', 'Georgeee', 'John', 'Mary', 'Lauren', 'Sarah'];
  var namesForDislikes = ['Lauren', 'Arjen', 'Jane', 'Ky', 'AncaD', 'Nick', 'Heather', 'Georgeee', 'John', 'Mary', 'Sarah'];


  // Creating the function set_settings() dynamically
  var codestring = '$(function() {\n';
  codestring += '  //GLOBAL VARIABLES\n';
  codestring += '  var totalLink = \'' + textInputValue + '\';\n';
  codestring += '  var globalUsername = "";\n';
  codestring += '  var globalAvatar = "";\n';
  codestring += '  var globalDescription = "";\n';
  codestring += '  var countlike = 0;\n';
  codestring += '  var countDislike = 0;\n';
  codestring += '  var conditions = {\n';
  codestring += '    // Condition 1 settings\n';
  codestring += '    1: { likes: ' + likesInputString + ', dislikes: ' + dislikesInputString + ' },\n';
  codestring += '    // Condition 2 settings\n';
  codestring += '    2: { likes: ' + likesInputString + ', dislikes: [] },\n';
  codestring += '    // Condition 3 settings\n';
  codestring += '    3: { likes: [10000,12000,13000], dislikes: [11111,12222,13333] },\n';
  codestring += '    // Condition 4 settings\n';
  codestring += '    4: { likes: [], dislikes: [10000,35000,80000,100000,132000,150000] },\n';
  codestring += '  };\n';
  codestring += '  var assignedConditionNumber = ' + slider3Value + ';\n';
  codestring += ' function set_settings() {\n';
  codestring += '  window.settings = [];\n';
  codestring += '  settings.numberofavatars = ' + slider1Value + '; \n';
  codestring += '  settings.tasklength = ' + slider2Value * 60000 + ';\n';
  codestring += '  window.others.posts[1].likes = [12000,14000,15000,35000,80000];\n';
  codestring += '  window.others.posts[1].Dislikes = [12000,14000,15000,35000,80000];\n';
  codestring += '  settings.likes_by = [\'Ky\', \'Arjen\', \'AncaD\', \'Nick\', \'Heather\', \'Jane\', \'Georgeee\', \'John\',  \'Mary\', \'Lauren\', \'Sarah\'];\n';
  codestring += '  settings.Dislikes_by = [\'Lauren\', \'Arjen\', \'Jane\',  \'Ky\', \'AncaD\', \'Nick\', \'Heather\', \'Georgeee\', \'John\', \'Mary\', \'Sarah\'];\n';
  codestring += '  window.query_string = null;\n';
  codestring += '}';


  // Displaying the codestring
  var codestringElement = document.createElement("pre");
  codestringElement.textContent = codestring;
  document.getElementById("selected-values").innerHTML = ''; // Clear previous content
  document.getElementById("selected-values").appendChild(codestringElement);

  // Displaying the popup
  document.getElementById("popup").style.display = "block";


  // Add event listener for the copy button (only once)
  var copyBtn = document.getElementById("copy-btn");
  var copyBtnEventAdded = false;

  if (!copyBtnEventAdded) {
    copyBtn.addEventListener("click", function() {
      navigator.clipboard.writeText(codestring)
        .then(() => {
          showTopAlert("Code copied to clipboard!");
        })
        .catch((err) => {
          showTopAlert("Failed to copy code: " + err);
        });
    });
    copyBtnEventAdded = true;
  }
});




// Function to show an alert at the top of the screen
function showTopAlert(message) {
  // Create a new div element for the alert
  var alertDiv = document.createElement("div");
  alertDiv.style.position = "fixed";
  alertDiv.style.top = "0";
  alertDiv.style.left = "50%";
  alertDiv.style.transform = "translateX(-50%)";
  alertDiv.style.padding = "10px";
  alertDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  alertDiv.style.color = "white";
  alertDiv.style.zIndex = "9999";
  alertDiv.textContent = message;

  // Append the alert div to the document body
  document.body.appendChild(alertDiv);

  // Remove the alert after 3 seconds
  setTimeout(function() {
    alertDiv.remove();
  }, 3000);
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



// Hide popup when close button is clicked
closeBtn.addEventListener('click', () => {
  popup.style.display = 'none';
});

// Hide popup when user clicks outside of the popup content
window.addEventListener('click', (event) => {
  if (event.target === popup) {
    popup.style.display = 'none';
  }
});
