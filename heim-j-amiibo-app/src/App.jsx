import { useEffect, useState, useMemo } from "react";
import './App.css'
import { loadXHR } from "./ajax";
import { readFromLocalStorage, writeToLocalStorage } from "./storage";
import Footer from "./Footer";
import Header from "./Header";
import AmiiboList from "./AmiiboList";
import AmiiboSearchUI from "./AmiiboSearchUI";

// app "globals" and utils
const baseurl = "https://www.amiiboapi.com/api/amiibo/?name=";

const searchAmiibo = (name, callback) => {
  loadXHR(`${baseurl}${name}`, callback);
};

const App = () => {
  const savedTerm = useMemo(() => readFromLocalStorage("term") || "", []);
  const [term, setTerm] = useState(savedTerm);
  const [results, setResults] = useState([]);

  useEffect(() => {
    writeToLocalStorage("term", term);
  }, [term]);

  const parseAmiiboResult = xhr => {
    // get the `.responseText` string
    const string = xhr.responseText;

    // declare a json variable
    let json;

    // try to parse the string into a json object
    try {
      json = JSON.parse(string);

      // log out number of results (length of `json.amiibo`)
      console.log(`Number of results=${json.amiibo.length}`);

      // loop through `json.amiibo` and log out the character name
      for (let obj of json.amiibo) {
        console.log(obj.character)
      }

      setResults(json.amiibo);

    } catch (error) {
      console.error('Error parsing JSON:', error);
    }

  }
  return <>
      <Header title="Amiibo Finder" />
    <main>
      <AmiiboSearchUI
        term={term}
        setTermFunc={setTerm}
        searchFunc={searchAmiibo}
        callbackFunc={parseAmiiboResult}
      />
     <AmiiboList array = {results} />
    </main>
    <hr />
    <Footer
      name="Ace Coder"
      year={new Date().getFullYear()}
    />
  </>;
};


export default App;