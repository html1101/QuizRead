// This page essentially can communicate with the Kindle page as if it's a part of it

// https://developer.chrome.com/docs/extensions/reference/runtime/#method-sendMessage


const remove = ["."]
let xhttp = new XMLHttpRequest(), finalSplit = {}
const prettify = (str) => {
    // Using Regex to replace HTML tags in the HTML returned
    let regStr = str.replace( /(<([^>]+)>)/ig, ' '),
    // Then turn it into a string of words through splitting by " " or "\n"
    split_string = regStr.split(" ").join("\n").split("\n")
    // Remove any words with apostrophes in them because those won't be vocab words:
    split_string = split_string.filter((val) => {
        return !val.includes("'")
    }).join("")
    // Then replace special characters(or remove everything except a-z, A-Z, 0-9, and space)
    let removeSpecial = regStr.replace(/[^a-zA-Z ]/g, "").toLowerCase().split(" "),
    // Then remove duplicate words
    uniqueStrs = [...new Set(removeSpecial)]
    return uniqueStrs;
}

// Wait for page onload, then prettify HTML
let words_on_page, init_pg = 0
window.addEventListener("load", function() {
    if(!init_pg) {
        words_on_page = prettify(document.body.innerText || document.body.textContent)
        xhttp.open("GET", "https://gist.githubusercontent.com/html1101/4be0624215ffa1465c6c29ef4a28b45c/raw/8e25347ddb349f701fed219b2778f7b27e44c207/lexicon.tsv")
        xhttp.send()
        
        init_pg = 1
    }
})

xhttp.onreadystatechange = function() {
    console.log(this.readyState, this.status)
    if(this.readyState == 4 && this.status == 200) {
        // Returned lexicon file, split by new lines and then \t.
        res = this.responseText.split("\n"),
        finalRes = {}
        for(let i = 0; i < res.length; i++) {
            spl = res[i].split("\t")
            if(spl.length == 2) {
                finalSplit[spl[0]] = spl[1].toLowerCase()
            }
        }
        for(let i = 0; i < words_on_page.length; i++) {
            console.log(words_on_page[i] + ": " + finalSplit[words_on_page[i]] || "ERROR!")
            if(finalSplit[words_on_page[i]]) {
                // This is in the tsv, and it's on the page.
                // We will send this to finalRes => the page.
                finalRes[words_on_page[i]] = Number(finalSplit[words_on_page[i]])
            }
        }
        // Add listener for when popup sends over a message
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            console.log({
                href: document.querySelector("title").innerText || window.location.href,
                data: finalRes
            })
            sendResponse({
                href: document.querySelector("title").innerText || window.location.href,
                data: finalRes
            })
        })
    }
}