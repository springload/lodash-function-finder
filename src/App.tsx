import React, { useState, useCallback, Fragment, useEffect } from "react";
import lodash from "lodash";
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
    [setInput, setLodashFunctions, setInputError, setOutputError]
  );

  const handleOutputChanged = useCallback(
    (output: string) => {
      setOutput(output);
    },
    [setInput, setLodashFunctions, setInputError, setOutputError]
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
  }, [input, output, setInput, setOutput])

  return (
    <div className="App">
      <h1>Lodash Function Finder</h1>
      <p>
        Lodash has about {lodashFns.length} functions and it can be hard to
        remember all of them.
      </p>
      <p>
        Enter the expected <span className="code">input</span> and{" "}
        <span className="code">output</span> and we'll show Lodash functions
        that match.
      </p>
      <p>To see more example inputs and outputs, click the button below.</p>
      <button onClick={handleExampleChanged}>Random Example</button>
      <h2>Input</h2>
      <Editor
        defaultValue={input}
        handleValueChanged={handleInputChanged}
        prefix="someLodashFunction("
        suffix=");"
        error={inputError}
      />
      <h2>Output</h2>
      <Editor
        defaultValue={output}
        handleValueChanged={handleOutputChanged}
        error={outputError}
      />
      <h2>Matching Lodash Functions</h2>

      {lodashFunctions.length > 0 ? (
        <div aria-live="polite">
          Found {lodashFunctions.length} match
          {lodashFunctions.length > 1 ? "es" : ""}
          {": "}
          {lodashFunctions.map((fn, index, arr) => (
            <Fragment>
              <a
                href={`https://lodash.com/docs/#${fn}`}
                key={fn}
                target="_blank"
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
  );
};

const lodashFns = Object.keys(lodash).filter(fnName => {
  // @ts-ignore
  const lodashFn = lodash[fnName];
  return typeof lodashFn === "function";
});

export default App;
