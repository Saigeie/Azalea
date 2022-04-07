/**
 * Developer - Saige
 * Repo: https://github.com/Saigeie/Ruby
 * Github: https://github.com/Saigeie/
 * 2022
 */

const formatArgs = async (str: string) => {
  let obj: Object = {};
  str.split("-").forEach((value) => {
    let values = value.split("=");
    if (values.length < 2) return;
    obj[values[0].replace(" ", "")] = values[1].trim();
  });
  return obj;
};

export default formatArgs;
