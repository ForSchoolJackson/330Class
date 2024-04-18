import * as storage from "./storage.js"
let items = ["???!!!"];


// I. declare and implement showItems()
// - this will show the contents of the items array in the <ol>
const showItems = () => {

  // loop though items and stick each array element into an <li>
  // use array.map()!
  const itemsList = items.map((item, index) => `<li key=${index}>${item}</li>`).join('');
 
  
  // update the innerHTML of the <ol> already on the page
  const orderedList = document.querySelector('.ml-4');
  orderedList.innerHTML = "";
  orderedList.innerHTML = itemsList

}


  // II. declare and implement addItem(str)
  // - this will add `str` to the `items` array (so long as `str` is length greater than 0)
  const addItem = str => {

    if (str.length > 0) {
      items.push(str);
      console.log("added: " + str)
    }

    console.log(items)

  };

  // Also:
  // - call `addItem()`` when the button is clicked, and also clear out the <input>
  const addBtn = document.querySelector("#btn-add")
  const input = document.querySelector("#thing-text")
  addBtn.addEventListener("click", () => {
    addItem(input.value);
    input.value = "";
    showItems();
  })
  // - and be sure to update .localStorage by calling `writeToLocalStorage("items",items)`
  storage.writeToLocalStorage("items", items)

// When the page loads:
// - load in the `items` array from storage.js and display the current items
// you might want to double-check that you loaded an array ...
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
// ... and if you didn't, set `items` to an empty array

// Got it working? 
// - Add a "Clear List" button that empties the items array
const clearBtn = document.querySelector("#btn-clear");
clearBtn.addEventListener("click", () => {
  
})
