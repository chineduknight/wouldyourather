export const convertParamsToString = (
  url: string,
  urlVariables: Record<string, string>,
): string => {
  let finalURL = url;

  for (const [key, value] of Object.entries(urlVariables)) {
    finalURL = finalURL.replace(`:${key}`, value);
  }

  return finalURL;
};
