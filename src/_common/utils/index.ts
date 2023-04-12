export const isProd = (): boolean => process.env.NODE_ENV === "production";
export const isDev = (): boolean => process.env.NODE_ENV === "development";

export const isValidURL = (value: string): boolean => {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(value);
};

export const toHex = (value: string): string => {
  return Buffer.from(value).toString("hex");
};

export const fromHex = (value: string): string => {
  return Buffer.from(value, "hex").toString("ascii");
};

export const isLongThanOneDay = (d1: Date, d2: Date): boolean => {
  if (d1 === null) return true;
  const d1MS: number = d1.getTime();
  const d2MS: number = d2.getTime();
  const ONE_DAY_MS: number = 86400000;
  return d2MS - d1MS >= ONE_DAY_MS;
}

export const getNameFromUrl = (url: string): string | null => {
  if (!url) return null;

  const url_parts: string[] = url.split("/");

  if (!url_parts.length) return null;

  return url_parts.slice(-1)[0];
};