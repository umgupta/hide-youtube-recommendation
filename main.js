
playOption = document.querySelector("#hide-play > input[type=checkbox]")
mainOption = document.querySelector("#hide-main > input[type=checkbox]")


// Initialize the form with the user's option settings
chrome.storage.local.get(['hideMain', "hidePlay"], (data) => {
  mainOption.checked = Boolean(data.hideMain);
  playOption.checked = Boolean(data.hidePlay);
});


// Immediately persist options changes
mainOption.addEventListener('change', (event) => {
  output = event.target.checked;
  chrome.storage.local.set({"hideMain": output});
});

playOption.addEventListener('change', (event) => {
  output = event.target.checked;
  chrome.storage.local.set({"hidePlay": output});
});
