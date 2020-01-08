const fs = require("fs");
const path = require("path");
const TJS = require("typescript-json-schema");

const BASE_DIR = path.resolve("node_modules/lodash");

console.log(BASE_DIR);

async function main() {
  const TJSConfig = {
    settings: {
      required: true
    },
    compilerOptions: {
      strictNullChecks: true
    }
  };
  const allLodashFiles = await fs.promises.readdir(BASE_DIR);
  const lodashFiles = allLodashFiles.filter(
    allLodashFile =>
      allLodashFile.endsWith(".js") && !allLodashFile.startsWith("_")
  );

  const typesFileData = await Promise.all(
    lodashFiles.map(async lodashFile => {
      console.log({ lodashFile });
      const friendlyName = lodashFile.replace(/\.d.ts/, "");
      const tsPath = path.resolve(BASE_DIR, lodashFile);

      const program = TJS.getProgramFromFiles(
        [tsPath],
        TJSConfig.compilerOptions,
        BASE_DIR
      );

      console.log({ program });

      const schema = TJS.generateSchema(
        program,
        friendlyName,
        TJSConfig.settings
      );

      console.log({ schema });

      return {
        [friendlyName]: {
          lodashFile,
          schema
        }
      };
    })
  );

  console.log(lodashFile, typesFileData);
}

main();
