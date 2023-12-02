import colors from 'picocolors';

export const println = (...textMap: any[]) => {
  console.log(colors.bgMagenta(colors.white(`[+] logs: ${textMap.toString()}`)));
};
