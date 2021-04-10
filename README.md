<h3>Links</h3>
- Manipulating DOM content(used for reading Kindle books and clicking the "next") - https://medium.com/@divakarvenu/lets-create-a-simple-chrome-extension-to-interact-with-dom-7bed17a16f42
- Chrome extension layout(used just to understand how Chrome extensions/permissions work) - https://developer.chrome.com/docs/extensions/mv3/getstarted/, https://stackoverflow.com/questions/10066100/google-chrome-extension-manipulate-dom-of-open-or-current-tab



<h3>Notes</h3>
- Manifest - Contains info about the extension, its permissions etc.
- Content scripts - Run in an environment between a page and Chrome extension, have full access to the page's DOM
    - Not many chome.* APIs work with this
- Background page - DOM not directly accessible, can inject scripts into arbitrary tab using chrome.extension.executeScript