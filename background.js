// Activate extension when clicked Kindle


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(sender.tab.url)
    console.log(request)
})