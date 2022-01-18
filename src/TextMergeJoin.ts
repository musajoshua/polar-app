/**
 * In our app we have regions of text that may or not be contiguous.
 *
 * The text is given back as rectangles with x, y, width, and height properties.
 *
 * If the x, y, width, and height are close enough, we can assume they're the same word.
 *
 * Sometimes our rectangles are word fragments NOT the whole word so we need to join the words
 * again to form entire sentences.
 *
 * The test data has examples of what these partial regions would look like.
 */
export namespace TextMergeJoin {
  export interface IPDFTextWord {
    readonly pageNum: number;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly str: string;
  }

  /**
   *
   */
  export function doMergeWords(
    data: ReadonlyArray<IPDFTextWord>
  ): ReadonlyArray<IPDFTextWord> {
    const datas = Array.from(data);
    const length = datas.length;
    const acc: any[] = [];
    for (let i = 0; i < datas.length; i++) {
      const currentValue = datas[i];
      if (i === length - 1) {
        acc.push(currentValue);
        break;
      }

      const nextWord = data[i + 1];

      if (
        Math.floor(currentValue.x + currentValue.width) ===
        Math.floor(nextWord.x)
      ) {
        const { pageNum, x, y, height } = currentValue;
        const newVal = {
          pageNum,
          y,
          height,
          x,
          width: currentValue.width + nextWord.width,
          str: currentValue.str + nextWord.str,
        };
        acc.push(newVal);
        i += 1;
      } else {
        acc.push(currentValue);
      }
    }
    return acc;
  }
}
