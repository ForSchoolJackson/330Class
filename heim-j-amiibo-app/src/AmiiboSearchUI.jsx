const AmiiboSearchUI = ({ term, setTermFunc, searchFunc, callbackFunc }) => {
    return (
        <div>
            <button onClick={() => searchFunc(term, callbackFunc)}>Search</button>
            <label>
                Name:
                <input value={term} onChange={e => setTermFunc(e.target.value.trim())} />
            </label>
        </div>
    )
  };

export default AmiiboSearchUI;