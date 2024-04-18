// a private (to this module) unique name to store the app data under
// if you put this on banjo, change `abc1234` to your banjo account name
const storeName = "abc1234-list-app";

// a private (to this module) helper function
// it will load in a string from localStorage and convert it to a JSON object
// if the string is empty or otherwise not "parseable" an
// empty object - {} - will be returned
const loadJSONFromLocalStorage = () => {
  const string = localStorage.getItem(storeName);
  let json;
  try{
    json = JSON.parse(string);
    if(!json) throw new Error("json is null!");
  }catch(error){
    console.log(`ERROR: ${error} with string: ${string}`);
    json = {};
  }
  return json;
};

// key:value will be added to the JSON and saved to localStorage
export const writeToLocalStorage = (key, value) => {
  console.log(`Calling writeToLocalStorage(${key},${value})`);
  const json = loadJSONFromLocalStorage();
  json[key] = value;
  localStorage.setItem(storeName, JSON.stringify(json));
};

// the value of `key` will be returned from localStorage
export const readFromLocalStorage = (key) => {
  const json = loadJSONFromLocalStorage();
  console.log(`Calling readFromLocalStorage(${key}) with value=${json[key]}`);
  return json[key];
}
