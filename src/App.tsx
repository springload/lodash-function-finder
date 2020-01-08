import React, { useState, useCallback, Fragment } from "react";
import "./App.css";
import lodash from "lodash";
import JSON5 from "json5";
import Editor from "./Editor";

const App: React.FC = () => {
  const [input, setInput] = useState<string>(`["a", "b", "c"], "~"`);
  const [output, setOutput] = useState<string>(`"a~b~c"`);
  const [lodashFunctions, setLodashFunctions] = useState<string[]>(
    getMatchingLodashFunctions(input, output)
  );
  const [error, setError] = useState(null);

  const handleInputChanged = useCallback(
    (input: string) => {
      updateLodashFunctions(input, output, setLodashFunctions, setError);
    },
    [output, setLodashFunctions]
  );

  const handleOutputChanged = useCallback(
    (output: string) => {
      updateLodashFunctions(input, output, setLodashFunctions, setError);
    },
    [input, setLodashFunctions]
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lodash Function Finder</h1>
      </header>
      {error}
      <h2>Input</h2>
      <Editor
        defaultValue={input}
        handleValueChanged={handleInputChanged}
        prefix="someLodashFunction("
        suffix=");"
      />
      <h2>Output</h2>
      <Editor defaultValue={output} handleValueChanged={handleOutputChanged} />
      {lodashFunctions.length > 0 ? (
        <Fragment>
          Found {lodashFunctions.length} match
          {lodashFunctions.length > 1 ? "es" : ""}
          {": "}
          {lodashFunctions.map(fn => (
            <a href={`https://lodash.com/docs/#${fn}`} key={fn} target="_blank">
              {fn}
              <br />
            </a>
          ))}{" "}
        </Fragment>
      ) : (
        "No matching lodash functions :("
      )}
    </div>
  );
};

function getMatchingLodashFunctions(input: string, output: string) {
  const inputJSONString = `[${input}]`;
  const outputJSONString = `${output}`;
  let inputArgs: any[] = [];
  try {
    inputArgs = JSON5.parse(inputJSONString);
  } catch (e) {
    throw Error(`Problem parsing string: ${inputJSONString}`);
  }
  let outputObjString: string;
  try {
    outputObjString = JSON5.stringify(JSON5.parse(outputJSONString));
  } catch (e) {
    throw Error(`Problem parsing string: ${outputJSONString}`);
  }

  const fns = Object.keys(lodash);
  const matchingFns = fns.filter(fn => {
    // @ts-ignore
    const lodashFn = lodash[fn];
    if (typeof lodashFn !== "function") {
      return false;
    }
    try {
      const actualOutputObj = lodashFn(...lodash.cloneDeep(inputArgs));
      const actualOutputObjString = JSON5.stringify(actualOutputObj);
      return actualOutputObjString === outputObjString;
    } catch (e) {
      // ignore error
      return false;
    }
  });
  return matchingFns;
}

function updateLodashFunctions(
  input: string,
  output: string,
  setLodashFunctions: Function,
  setError: Function
) {
  try {
    const matchingFns = getMatchingLodashFunctions(input, output);
    setError(null);
    setLodashFunctions(matchingFns);
  } catch (e) {
    setError(e.toString());
  }
}

export default App;
