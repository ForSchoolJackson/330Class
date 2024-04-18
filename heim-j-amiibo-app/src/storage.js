const storeName = "abc1234-amiibo-app";

const loadJSONFromLocalStorage = () => {
  const string = localStorage.getItem(storeName);
  let json;
  try {
    json = JSON.parse(string);
    if (!json) throw new Error("json is null!");
  } catch (error) {
    console.log(`ERROR: ${error} with string: ${string}`);
    json = {};
  }
  return json;
};

export const writeToLocalStorage = (key, value) => {
  console.log(`Calling writeToLocalStorage(${key},${value})`);
  const json = loadJSONFromLocalStorage();
  json[key] = value;
  localStorage.setItem(storeName, JSON.stringify(json));
};

export const readFromLocalStorage = (key) => {
  const json = loadJSONFromLocalStorage();
  console.log(`Calling readFromLocalStorage(${key}) with value=${json[key]}`);
  return json[key];
}