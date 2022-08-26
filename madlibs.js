const OUR_REGEX = /(?<word>\w+)(?<pos>\[[nva]\])?(?<punctuation>[\.,])?/;
console.log(OUR_REGEX)

const POS = {
  n: "noun",
  v: "verb",
  a: "adj",
};
function findPOS(pos) {
  const fixedPOS = pos.replace("[", "").replace("]", "");
  return POS[fixedPOS];
}

function parseStory(rawStory) {
  const arrStory = rawStory.split(" ");

  const fixedArray = [];
  for (let el of arrStory) {
    const group = OUR_REGEX.exec(el).groups;

    if (group.pos != undefined && group.punc == undefined) {
      fixedArray.push({
        word: group.word,
        pos: findPOS(group.pos),
      });
    } else if (group.pos == undefined && group.punc != undefined) {
      fixedArray.push({
        word: group.word,
      });
      fixedArray.push({
        word: group.punc,
      });
    } else if (group.pos != undefined && group.punc != undefined) {
      fixedArray.push({
        word: group.word,
        pos: findPOS(group.pos),
      });
      fixedArray.push({
        word: group.punc,
      });
    } else {
      fixedArray.push({
        word: group.word,
      });
    }
  }
  console.log(fixedArray);
  return fixedArray;
}

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    const editDiv = document.querySelector(".madLibsEdit");
    const previewDiv = document.querySelector(".madLibsPreview");
    const storyEdit = document.createElement("p");
    const storyPreview = document.createElement("p");
    editDiv.append(storyEdit);
    previewDiv.append(storyPreview);
    storyEdit.className = "edit"
    storyPreview.className = "edit"

    for (let word of processedStory) {
      if (word.pos != undefined) {
        const inputEdit = document.createElement("input");
        const inputPreview = document.createElement("input");

        storyEdit.append(inputEdit);
        storyPreview.append(inputPreview);
        inputEdit.placeholder = word.pos;
        inputPreview.placeholder = word.pos;
        inputEdit.maxLength = 20;
        inputPreview.readOnly = true;
        inputEdit.className = "input";
        inputPreview.className = "input";


        inputEdit.addEventListener("input", () => {
          inputPreview.value = inputEdit.value;
        });

        inputEdit.addEventListener("keydown", (event) => {
          if (event.keyCode === 13) {
            let input = inputEdit.nextElementSibling;

            if (input != null) {
              if (inputEdit.nodeName == "INPUT") {
                input.focus();
              }
            } else {
              alert("Game Done!");
            }
          }
        });
      } else {
        storyEdit.append(`${word.word} `);
        storyPreview.append(`${word.word} `);
      }
    }

    console.log(processedStory);
  });