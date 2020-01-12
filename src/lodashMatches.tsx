import lodash from "lodash";
import JSON5 from "json5";

export default function(input: string, output: string): LodashFnsResponse {
  const inputJSString = `[${input}]`;
  const outputJSONString = `${output}`;
  let inputArgs: any[] = [];
  let inputError = null;
  let outputError = null;
  try {
    // See https://github.com/springload/lodash-function-finder/pull/6
    // for justification for eval().
    // We should NEVER rehydrate input from url args.
    // eslint-disable-next-line no-eval
    inputArgs = eval(inputJSString);
  } catch (e) {
    inputError = `Problem parsing: ${e.toString()}`;
  }

  let outputValue: any;
  try {
    outputValue = JSON5.parse(outputJSONString);
  } catch (e) {
    outputError = `Problem parsing: ${removeJSON5(e.toString())}`;
  }

  if (inputError || outputError) {
    return {
      matchingFns: [],
      inputError,
      outputError
    };
  }
  const outputObjString = JSON5.stringify(outputValue);

  const fns = Object.keys(lodash);
  const matchingFns = fns.filter(fn => {
    // @ts-ignore
    const lodashFn = lodash[fn];
    if (typeof lodashFn !== "function") {
      return false;
    }
    const inputValue = lodash.cloneDeep(inputArgs);

    try {
      const actualOutputObj = lodashFn(...inputValue);
      const actualOutputObjString = JSON5.stringify(actualOutputObj);
      return actualOutputObjString === outputObjString;
    } catch (e) {
      // ignore error
      return false;
    }
  });
  return {
    matchingFns,
    inputError: null,
    outputError: null
  };
}

type LodashFnsResponse = {
  matchingFns: string[];
  inputError: null | string;
  outputError: null | string;
};

function removeJSON5(str: string): string {
  return str.replace(/JSON5:?/gi, "");
}
