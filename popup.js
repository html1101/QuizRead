const associate = [
    ["your_books", "your_books_page"],
    ["progress_dashboard", "progress_dash"],
    ["words_learned", "words_learned_page"],
    ["crown", "level_page"],
    ["bell", "Notifications"],
    ["user", "profile_page"],
    ["home", "home_choose_book"],
    ["groupA", "join_group_page"]
]

threshold_complexity = 3 // Anything at or above this complexity we test for

for(let i = 0; i < associate.length; i++) {
    document.getElementById(associate[i][1]).style.marginTop = "var(--height-top-bar)"
    document.getElementById(associate[i][0]).addEventListener("click", () => {
        for(let ii = 0; ii < associate.length; ii++) {
            if(i == ii) {
                document.getElementById(associate[i][1]).style.display = "block";
            } else {
                document.getElementById(associate[ii][1]).style.display = "none";
            }
        }
    })
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(sender.tab)
    console.log(request)
    document.body.innerHTML += request
    sendResponse(1) // Words have been received
})


/**
 * ,
    "web_accessible_resources": [
        {
        "resources": [ "html1101/4be0624215ffa1465c6c29ef4a28b45c/raw/8e25347ddb349f701fed219b2778f7b27e44c207/lexicon.tsv"],
        "matches": [ "https://gist.githubusercontent.com/*", "https://api.dictionaryapi.dev/api/v2/entries/en_US/*"]
        }
    ]
 */
/*
// Waits for when 
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type:"getPrettified"}, function(response){
        // document.body.innerHTML = tabs[0].id
        // document.body.innerHTML += JSON.stringify(response)
    })
})


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
  
  let dictionary_response;
  let xhttp = new XMLHttpRequest();
  // This is a sample of what we're dealing with.
  
  const updateQuestions = (complexity) => {
      // Given the list of words and the threshold, return the words that fit and ask the questions for them.
      // Look for dictionary API
      let currentKey,
          chooseRanWord,
          keys = Object.entries(response.data).filter((val) => {
              return val[1] >= complexity;
          });
      xhttp.onreadystatechange = function () {
          if (this.status == 200 && this.readyState == 4) {
              dictionary_response = JSON.parse(this.responseText)[0].meanings[0]
                  .definitions[0];
              console.log(currentKey);
              console.log(dictionary_response);
              let options_to_make = [`<input type="radio" id="correct" name="quiz-${currentKey}" value="${currentKey}">${currentKey} - correct`],
              // Choose 3 other random words to use similar in difficulty
              otherWords = [];
              keys.splice(keys.indexOf(currentKey));
              console.log(currentKey)
              document.body.innerHTML += dictionary_response.definition
              if(keys.length >= 3) {
                  for(let i = 0; i < 3; i++) {
                      randomK = Math.floor(Math.random() * keys.length)
                      if(keys[randomK]) {
                          console.log(keys[randomK])
                          options_to_make.push(`<input type="radio" id="incorrect" name="quiz-${currentKey}" value="${keys[randomK][0]}">${keys[randomK][0]} - incorrect`)
                      }
                      keys.splice(randomK)
                  }
              } else {
                  complexity -= 1
                  keys = Object.entries(response.data).filter((val) => {
              return val[1] >= complexity;
          });
                  if(keys.length >= 3) {
                      for(let i = 0; i < 3; i++) {
                          randomK = Math.floor(Math.random() * keys.length)
                          console.log(keys[randomK], "H")
                          options_to_make.push(`<input type="radio" id="incorrect" name="quiz-${currentKey}" value="${keys[randomK][0].toString()}">${keys[randomK][0].toString()} - incorrect`)
                          keys.splice(randomK)
                      }
              }
              }
              document.body.innerHTML += "<br>" + shuffle(options_to_make).join("<br>") + "<br>"
          }
      };
      let keyK = JSON.parse(JSON.stringify(keys))
      for (let i = 0; i < 75; i++) { // keys.length
          if(keyK[i]) {
              currentKey = keyK[i][0];
              xhttp.open(
                  "GET",
                  `https://api.dictionaryapi.dev/api/v2/entries/en_US/${currentKey}`,
                  false
              );
              xhttp.send();
          }
      }
  };
  origiDoc = document.body.innerHTML
  lvl_handler = document.getElementById("lvlR");
  lvl_handler.addEventListener("change", () => {
      lvl_to_use = JSON.parse(JSON.stringify(lvl_handler.value))
      document.body.innerHTML = origiDoc
      document.getElementById("lvl").innerHTML = `Level ${lvl_to_use}`;
      document.getElementById("lvlR").value = lvl_to_use
      updateQuestions(lvl_to_use);
  });
*/