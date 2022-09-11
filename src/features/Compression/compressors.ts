"use-strict";

interface Compressor { }

export class LZ77 implements Compressor {
  static compress(
    str: string,
    searchBufferSize: number,
    lookAheadSize: number
  ): string {
    if (searchBufferSize <= 0 || lookAheadSize <= 0) {
      return ""
    }

    const splittedStr = str.split("");
    let currentLookAhead: Array<string> = splittedStr.slice(0, Math.min(splittedStr.length, lookAheadSize));
    let remainingChars = splittedStr.slice(Math.min(lookAheadSize, splittedStr.length));
    let searchBuffer: Array<string> = [];
    const result = [];

    while (currentLookAhead.length > 0) {
      let matchLength: number;
      const [offset, length] = this.matchString(searchBuffer, currentLookAhead);

      if (!offset && !length) {
        matchLength = 1;
        result.push(...currentLookAhead.slice(0, matchLength));
      } else {
        matchLength = length! as number;
        result.push(`<${offset},${length}>`);
      }

      if (searchBuffer.length >= searchBufferSize) {
        for (let i = 0; i < matchLength; i++) {
          searchBuffer.shift();
        }
      }

      searchBuffer.push(...currentLookAhead.slice(0, matchLength));
      currentLookAhead = currentLookAhead.slice(matchLength);
      currentLookAhead.push(...remainingChars.slice(0, matchLength));
      remainingChars = remainingChars.slice(matchLength);
      const difference = searchBuffer.length - searchBufferSize;
      for (let i = 0; i <= (difference); i++) {
        searchBuffer.shift();
      }
    }
    return result.join("");
  }

  static matchString(searchBuffer: string[], currentlookAhead: string[]) {

    const joinedSearchBuffer = searchBuffer.join("");
    let length: number;

    for (length = 1; length <= searchBuffer.length; length++) {
      if (!(currentlookAhead.length >= length) || !joinedSearchBuffer.includes(currentlookAhead.slice(0, length).join(""))) {
        break;
      }
    }

    if (length <= 1) {
      return [null, null, null];
    }

    return [
      searchBuffer.length - joinedSearchBuffer.indexOf(currentlookAhead.slice(0, length - 1).join(""))
      , length - 1,
      currentlookAhead[length]
    ]
  }

  static decompress(str: string) {
    const stringSplitByBracket = str.split("<").reduce((prev, curr) => {
      prev.push(...curr.split(">"))
      return prev;
    }, [] as Array<string>).filter(item => item !== "");
    const result: Array<string> = [];
    let idx = 0;

    for (let i = 0; i < stringSplitByBracket.length; i++) {
      if (stringSplitByBracket[i].includes(",")) {
        const currentSubString = stringSplitByBracket[i].split(",");
        const [start, end] = currentSubString.map(item => parseInt(item));
        result.push(...result.slice(idx - start, idx - start + end));
        idx += end;
      } else {
        idx += stringSplitByBracket[i].length;
        result.push(...stringSplitByBracket[i].split(""));
      }
    }
    return result.join("");
  }
}