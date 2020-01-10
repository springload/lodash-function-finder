import React, { useState, useCallback, Fragment, useEffect } from "react";
import lodash from "lodash";
import 'what-input';
import "./App.css";
import Editor from "./Editor";
import lodashMatches from "./lodashMatches";
import examples from "./constants";

const App: React.FC = () => {
  const [input, setInput] = useState<string>(examples[0].input);
  const [output, setOutput] = useState<string>(examples[0].output);
  const [inputError, setInputError] = useState<string>(null);
  const [outputError, setOutputError] = useState<string>(null);

  const [lodashFunctions, setLodashFunctions] = useState<string[]>([]);

  useEffect(() => {
    const response = lodashMatches(input, output);
    setLodashFunctions(response.matchingFns);
    setInputError(response.inputError);
    setOutputError(response.outputError);
  }, [input, output, setLodashFunctions, setInputError, setOutputError]);

  const handleInputChanged = useCallback(
    (input: string) => {
      setInput(input);
    },
    [setInput]
  );

  const handleOutputChanged = useCallback(
    (output: string) => {
      setOutput(output);
    },
    [setOutput]
  );

  const handleExampleChanged = useCallback(() => {
    let newInput = input;
    let newOutput = output;
    while (input === newInput && output === newOutput) {
      const index = Math.floor(Math.random() * examples.length);
      newInput = examples[index].input;
      newOutput = examples[index].output;
    }
    setInput(newInput);
    setOutput(newOutput);
  }, [input, output, setInput, setOutput]);

  return (
    <div className="App">
      <div className="header">
        <img className="header-logo" src="springload.svg"></img>
      </div>
      <div className="main">
      <h1>Lodash Function Finder</h1>
      <p>
        Lodash has about {lodashFns.length} functions and it can be hard to find
        the one you want.
      </p>
      <p>
        Instead type the expected <code>input</code> and <code>output</code> and{" "}
        <b>Lodash Function Finder</b> will show any Lodash functions that match.
      </p>
      <p>
        Try a <button onClick={handleExampleChanged} className="example-button">Random Example</button> or
        just type your own input/output.
      </p>
      <div className="lff">
        <h2>Input</h2>
        <Editor
          value={input}
          handleValueChanged={handleInputChanged}
          prefix="someLodashFunction("
          suffix=");"
          error={inputError}
        />
        <h2>Output</h2>
        <Editor
          value={output}
          handleValueChanged={handleOutputChanged}
          error={outputError}
        />
        <h2>Matching Lodash Functions</h2>
        {lodashFunctions.length > 0 ? (
          <div aria-live="polite">
            Found {lodashFunctions.length} match
            {lodashFunctions.length > 1 ? "es " : " "}
            for that input+output:{" "}
            {lodashFunctions.map((fn, index, arr) => (
              <Fragment>
                <a
                  href={`https://lodash.com/docs/#${fn}`}
                  key={fn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {fn}
                </a>
                {index < arr.length - 1 ? ", " : "."}
              </Fragment>
            ))}{" "}
          </div>
        ) : (
          "No matching lodash functions :("
        )}
      </div>

      <p>
        <i>Note:</i> The input/output can't include functions.
      </p>
      <footer>
        Brought to you by{" "}
        <a
          href="https://springload.co.nz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Springload
        </a>
        , a web development agency in New Zealand.
      </footer>
    </div>
    </div>
  );
};

const lodashFns = Object.keys(lodash).filter(fnName => {
  // @ts-ignore
  const lodashFn = lodash[fnName];
  return typeof lodashFn === "function";
});

export default App;
