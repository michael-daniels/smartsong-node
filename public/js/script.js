
document.getElementById('uploadLyricsOpenDiv').addEventListener('click', function () {
  document.getElementById('uploadLyricsDiv').style.display = "block";
});


let uploadLyricsArray = [];

  document.forms.uploadLyricsForm.uploadLyricsButton.addEventListener('click', function() {
    uploadLyricsArray.push(document.forms.uploadLyricsForm.uploadLyricsInput.value.replace(/\n/g, " ").replace(/\s\s+/g, " ").split(' '));
    console.log(uploadLyricsArray);
    document.getElementById('uploadLyricsDiv').style.display = "none";
  });



localStorage.setItem('smartsong-save196234-0', "storage initialized");

function checkSavedContent() {
  //this function loops to check local storage for save names. As long as the save names continue to be found, they are inserted in the save list for the user to select and have an inline onclick event attached to them. As soon as it returns null for one, break out of the loop which will stop population of the save list.

  for (i = 0; i < Object.keys(localStorage).length; i++) {

    let storageKey = `smartsong-save196234-${i}`;
    let lastCharacterOfStorageKey = storageKey.slice('21');

    if (storageKey.includes('smartsong-save196234-') && storageKey !== "smartsong-save196234-0" && localStorage.getItem(storageKey) !== "deleted") {

      let anchorTag = document.createElement('a');
      anchorTag.href="#";

      let divSaveNumber = document.createElement('div');
      divSaveNumber.id = `save-${lastCharacterOfStorageKey}`;
      divSaveNumber.classList.add('save-list-item');
      divSaveNumber.onclick = function(){
        populateSavedContentOnSaveClick(lastCharacterOfStorageKey);
      }
      divSaveNumber.innerText = `Song ${lastCharacterOfStorageKey}`;

      let closeTabDiv = document.createElement('div');
      closeTabDiv.id = `closeTab-${lastCharacterOfStorageKey}`;
      closeTabDiv.classList.add('close-tab-div');
      closeTabDiv.innerText = "x";
      closeTabDiv.onclick = function closeTabFunction() {
        localStorage.setItem(`smartsong-save196234-${lastCharacterOfStorageKey}`, "deleted");
        let theSaveList = document.getElementById('saveList');
        theSaveList.removeChild(document.getElementById(`save-${lastCharacterOfStorageKey}`));
      };

      closeTabDiv.style.width = "10px";
      closeTabDiv.style.display = "inline-block";

      anchorTag.appendChild(closeTabDiv);
      divSaveNumber.appendChild(anchorTag);
      document.getElementById('saveList').appendChild(divSaveNumber);
    }
  }
}
checkSavedContent();

//Add click listener to plus tab, loop over current local storage keys from least to greatest, once one is not found, create a slot in storage from which a tab will be created.
document.getElementById('createNewTab').addEventListener('click', function(){

    let newTabNumber = localStorage.length - 1;

    newTabNumber = Number(newTabNumber) + 1;

    localStorage.setItem(`smartsong-save196234-${newTabNumber}`, "");

    let anchorTag = document.createElement('a');
    anchorTag.href="#";

    let divSaveNumber = document.createElement('div');
    divSaveNumber.id = `save-${newTabNumber}`;
    divSaveNumber.classList.add('save-list-item');
    divSaveNumber.onclick = function(){
      populateSavedContentOnSaveClick(newTabNumber);
    }
    divSaveNumber.innerText = `Song ${newTabNumber}`;

    let closeTabDiv = document.createElement('div');
    closeTabDiv.id = `closeTab-${newTabNumber}`;
    closeTabDiv.classList.add('close-tab-div');
    closeTabDiv.innerText = "x";
    closeTabDiv.onclick = function closeTabFunction() {

      localStorage.setItem(`smartsong-save196234-${newTabNumber}`, "deleted");
      let theSaveList = document.getElementById('saveList');
      theSaveList.removeChild(document.getElementById(`save-${newTabNumber}`));


      for (i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(`smartsong-save196234-${i}`) !== "deleted" && localStorage.getItem(`smartsong-save196234-${i}`) !== "storage initialized") {
          document.forms.theForm.textInput.value = localStorage.getItem(`smartsong-save196234-${i}`);
          break;
        }
      }

    };

    closeTabDiv.style.width = "10px";
    closeTabDiv.style.display = "inline-block";

    anchorTag.appendChild(closeTabDiv);
    divSaveNumber.appendChild(anchorTag);
    document.getElementById('saveList').appendChild(divSaveNumber);

    let theTabs = document.getElementById('saveList').children;
    for (i = 1; i < theTabs.length; i++) {
      if (theTabs[i].style.backgroundColor !== "ghostwhite") {
        theTabs[i].style.backgroundColor = "#D8D8D8";
      }

    }

});



let lastSaveLoaded = 1;

function populateSavedContentOnLoad() {
  //this function load save number 1 on document load
  // document.forms.theForm.textInput.value = localStorage.getItem(`smartsong-save196234-${lastSaveLoaded}`);

  for (i = 0; i < localStorage.length; i++) {
    if (localStorage.getItem(`smartsong-save196234-${i}`) !== "deleted" && localStorage.getItem(`smartsong-save196234-${i}`) !== "storage initialized") {
      document.forms.theForm.textInput.value = localStorage.getItem(`smartsong-save196234-${i}`);
      break;
    }
  }
}
populateSavedContentOnLoad();

function populateSavedContentOnSaveClick(numberPassedFromSaveList) {
  //this takes the dynamically created save number from the save list that the user clicked on and will retrieve that saved content from local storage and populate it into the text area for editing
  lastSaveLoaded = numberPassedFromSaveList;

  let theTabs = document.getElementById('saveList').children;
  for (i = 1; i < theTabs.length; i++) {
    theTabs[i].style.backgroundColor = "#D8D8D8";
  }

  document.getElementById(`save-${numberPassedFromSaveList}`).style.backgroundColor = "ghostwhite";

  document.forms.theForm.textInput.value = localStorage.getItem(`smartsong-save196234-${lastSaveLoaded}`);
}

//This event autosaves the tab contents to local storage every time the contents of the text area are changed. It uses the variable lastSaveLoaded to track which save was last clicked by the user to determine which local storage key to save the content to.
document.forms.theForm.textInput.addEventListener('input', function() {

  let theTextAreaContent = document.forms.theForm.textInput.value;
  localStorage.setItem(`smartsong-save196234-${lastSaveLoaded}`, theTextAreaContent);

  if (document.getElementById('saveList').childElementCount < 2) {
    let newTabNumber = localStorage.length;

    localStorage.setItem(`smartsong-save196234-${newTabNumber}`, "");

    let anchorTag = document.createElement('a');
    anchorTag.href="#";

    let divSaveNumber = document.createElement('div');
    divSaveNumber.id = `save-${newTabNumber}`;
    divSaveNumber.classList.add('save-list-item');
    divSaveNumber.onclick = function(){
      populateSavedContentOnSaveClick(newTabNumber);
    }
    divSaveNumber.innerText = `Song ${newTabNumber}`;

    anchorTag.appendChild(divSaveNumber);
    document.getElementById('saveList').appendChild(anchorTag);
  }

});

//This function gets the word that the user clicks from the results and inserts it where the users cursor was last placed in the text area.
function getClickedWord(wordId) {
  let theClickedWord = document.getElementById(wordId).innerHTML;
  let selStart = document.forms.theForm.textInput.selectionStart;
  //let selEnd = document.forms.theForm.textInput.selectionEnd;

  console.log(selStart);
  //console.log(selEnd);

  let textAreaArray = document.forms.theForm.textInput.value.split('');

  console.log(textAreaArray);
  console.log(theClickedWord);
  textAreaArray[selStart] = theClickedWord + " ";

  console.log(textAreaArray);

  document.forms.theForm.textInput.value = textAreaArray.join('');


}

//feature toggle - these events toggle which feature is showing on click of the features button and also perform the API fetch and returns the results.
document.getElementById('rhymeButton').addEventListener('click', function() {
  document.getElementById('nextWordRow').style.display = "none";
  document.getElementById('rhymeRow').style.display = "block";
  document.getElementById('rhymeRow').innerHTML = "";

  let wordToRhyme = document.getSelection().toString();

  let wordLastTyped;
  wordLastTyped = document.forms.theForm.textInput.value.split(' ');
  wordLastTyped = wordLastTyped[wordLastTyped.length - 1];

  console.log("Word to rhyme: ", wordToRhyme);
  console.log("Last word typed: ", wordLastTyped);
  //console.log("API Call URL",`https://api.datamuse.com/words?rel_rhy=${wordToRhyme}&lc=${wordLastTyped}`)

  fetch(`https://api.datamuse.com/words?rel_rhy=${wordToRhyme}&lc=${wordLastTyped}`)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        response.json().then(function(data) {
          //console.log(data);

          if (data.length === 0) {
            document.getElementById('rhymeRow').innerHTML = "No results found..."
          } else {

            for (i = 0; i < data.length; i++) {
              let rhymeRowTemplate = ` <a id="rhyme${i + 1}" href="#" class="rhyme-row-template" onclick="getClickedWord('rhyme${i + 1}')">${data[i].word}</a> |`;
              //console.log(rhymeRowTemplate);
              document.getElementById('rhymeRow').innerHTML += rhymeRowTemplate;
            }

          }



        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });

});

document.getElementById('nextWordButton').addEventListener('click', function() {
  document.getElementById('nextWordRow').style.display = "block";
  document.getElementById('rhymeRow').style.display = "none";
  document.getElementById('nextWordRow').innerHTML = "";

  let nextWordSuggestion = document.getSelection().toString();
  let customNextWord = [];

  if (uploadLyricsArray[0] !== undefined) {

    for (i = 0; i < uploadLyricsArray.length; i++) {

      for (j = 0; j < uploadLyricsArray[i].length; j++) {

        if (uploadLyricsArray[i][j] === nextWordSuggestion && uploadLyricsArray[i][j + 1] !== undefined ) {
          customNextWord.push(uploadLyricsArray[i][j + 1]);
          console.log(customNextWord);
        }

      }

    }

  }


  fetch('https://api.datamuse.com/words?lc=' + nextWordSuggestion)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        response.json().then(function(data) {

          if (data.length === 0 && customNextWord === []) {
            document.getElementById('nextWordRow').innerHTML = "No results found..."
          } else {

          let customNextWordLength = customNextWord.length;

          if (customNextWord !== []) {
              for (let l = 0; l < customNextWord.length; l++) {
                  document.getElementById('nextWordRow').innerHTML += ` <a id="nextWord${l + 1}" href="#" class="next-word-row-template" onclick="getClickedWord('nextWord${l + 1}')">${customNextWord[l]}</a> |`
              }

          }

          for (let i = 1; i < data.length; i++) {
            var nextWordRowTemplate = ` <a id="nextWord${i + customNextWordLength}" href="#" class="next-word-row-template" onclick="getClickedWord('nextWord${i + customNextWordLength}')">${data[i].word}</a> |`;
            //console.log(nextWordRowTemplate);
            document.getElementById('nextWordRow').innerHTML += nextWordRowTemplate;
          }

        }

        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });

});
