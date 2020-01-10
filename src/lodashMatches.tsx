import lodash from "lodash";
import JSON5 from "json5";

export default function(input: string, output: string): LodashFnsResponse {
  const inputJSONString = `[${input}]`;
  const outputJSONString = `${output}`;
  let inputArgs: any[] = [];
  try {
    // eslint-disable-next-line no-eval
    inputArgs = eval(inputJSONString);
  } catch (e) {
    return {
      matchingFns: [],
      inputError: `Problem parsing: ${e.toString()}`,
      outputError: null
    };
  }
  let outputObjString: string;
  try {
    outputObjString = JSON5.stringify(JSON5.parse(outputJSONString));
  } catch (e) {
    return {
      matchingFns: [],
      inputError: null,
      outputError: `Problem parsing: ${removeJSON5(e.toString())}`
    };
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
