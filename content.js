function hideElement(selector, hide, display_value){
    if (selector != null) {
        if (hide){
            selector.style.display = "none"
        } else {
            selector.style.display = display_value
        }
    }
}

// TODO: this could be made better by listening to url change
setInterval( () => {
    mainSelector = document.querySelector("#primary > ytd-rich-grid-renderer")
    playSelector = document.querySelector("#items > ytd-item-section-renderer")
    playSelector2 = document.querySelector("#secondary-inner")

    chrome.storage.local.get(["hideMain", "hidePlay"], function(data){
        hideElement(mainSelector, data?.hideMain, "flex")
        hideElement(playSelector, data?.hidePlay, "block")
        hideElement(playSelector2, data?.hidePlay, "block")
    })
}, 1000)

// check if things are set else set them
chrome.storage.local.get(["hideMain", "hidePlay"], function(data){
    // debugger
    mainSelector = document.querySelector("#primary > ytd-rich-grid-renderer")
    playSelector = document.querySelector("#items > ytd-item-section-renderer")
    playSelector2 = document.querySelector("#secondary-inner")


    if (Object.keys(data).length == 0){
        chrome.storage.local.set({"hideMain": true})
        chrome.storage.local.set({"hidePlay": true})

        hideElement(mainSelector, true, "flex")
        hideElement(playSelector, true, "block")
        hideElement(playSelector2, true, "block")

    }else{
        hideElement(mainSelector, data?.hideMain, "flex")
        hideElement(playSelector, data?.hidePlay, "block")
        hideElement(playSelector2, true, "block")

    }
})

// listen to changes
chrome.storage.onChanged.addListener((changes, area) => {
    mainSelector = document.querySelector("#primary > ytd-rich-grid-renderer")
    playSelector = document.querySelector("#items > ytd-item-section-renderer")
    playSelector2 = document.querySelector("#secondary-inner")


    if (area === 'local'){
        if (changes.hideMain!=null){
            // console.log("In main")
            hideElement(mainSelector, changes.hideMain.newValue, "flex")
        }
        if (changes.hidePlay!=null){
            // console.log("In Play")
            hideElement(playSelector, changes.hidePlay.newValue, "block")
            hideElement(playSelector2, changes.hidePlay.newValue, "block")

        }
    }
});