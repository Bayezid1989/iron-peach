import fs from "fs";

export const writeObjInJson = (
  obj: Record<string, any>,
  fileName = "output",
) => {
  // convertDatetimes(obj);
  const data = JSON.stringify(obj, null, 4);
  fs.writeFile(`${fileName}.json`, data, (error) => {
    console.log(error || "JSON file created");
  });
};
