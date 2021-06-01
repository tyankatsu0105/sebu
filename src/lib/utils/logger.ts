import { bright, reset } from "./color";

type Border = {
  bottomLeft: string;
  bottomRight: string;

  horizontal: string;
  topLeft: string;

  topRight: string;
  vertical: string;
};

type BorderStyle = "line";

const getBorderStyle = (style: BorderStyle) => {
  let borderStyle: Border = {
    bottomLeft: "",
    bottomRight: "",

    horizontal: "",
    topLeft: "",

    topRight: "",
    vertical: "",
  };

  switch (style) {
    case "line":
      borderStyle = {
        bottomLeft: "╰",
        bottomRight: "╯",

        horizontal: "─",
        topLeft: "╭",

        topRight: "╮",
        vertical: "│",
      };
      break;

    default:
      borderStyle = {
        bottomLeft: "╰",
        bottomRight: "╯",

        horizontal: "─",
        topLeft: "╭",

        topRight: "╮",
        vertical: "│",
      };
      break;
  }

  return { borderStyle };
};

/**
 * Return letters as splitted by line.
 * @example
 * getSplittedLetters(`
 * sebu is
 * awesome!
 * `)
 * // => ['', 'sebu is', 'awesome!', '']
 */
const getSplittedLetters = (letter: string) => {
  const regexp = /^.*$/gm;

  const splittedLetters = [...letter.matchAll(regexp)].flat();

  return { splittedLetters };
};

/**
 * Return string length that most longer in letter.
 * @example
 * getLonguestLetterCount(`
 * sebu is
 * awesome!
 * `)
 * // => 8
 */
const getLonguestLetterCount = (letter: string) => {
  const { splittedLetters } = getSplittedLetters(letter);

  const longuestLetterCount = splittedLetters.reduce((acc, current) => {
    acc = acc > current.length ? acc : current.length;
    return acc;
  }, 0);

  return { longuestLetterCount };
};

/**
 * Create Log Box
 * Can't use emoji
 *
 */
const createLogBox = (params: {
  color: string;
  content: string;
  margin?: number;
  padding?: number;
  style: BorderStyle;
}) => {
  const padding = params.padding ?? 1;
  const margin = params.margin ?? 1;
  const { longuestLetterCount } = getLonguestLetterCount(params.content);
  const repeatCount = longuestLetterCount + padding * 2;
  const { splittedLetters } = getSplittedLetters(params.content);
  const { borderStyle } = getBorderStyle(params.style);
  const space = " ";

  // margin
  for (let index = 0; index < margin; index++) {
    console.log();
  }

  console.log(params.color);
  // top
  console.log(
    `${borderStyle.topLeft}${borderStyle.horizontal.repeat(repeatCount)}${
      borderStyle.topRight
    }`
  );
  // padding
  for (let index = 0; index < padding; index++) {
    console.log(
      borderStyle.vertical + space.repeat(repeatCount) + borderStyle.vertical
    );
  }

  splittedLetters.forEach((letter) => {
    let result = "";
    result += borderStyle.vertical;
    result += space.repeat(padding);

    if (letter.length < longuestLetterCount) {
      result += letter + space.repeat(longuestLetterCount - letter.length);
    } else {
      result += letter;
    }

    result += space.repeat(padding);
    result += borderStyle.vertical;

    console.log(result);
  });

  // padding
  for (let index = 0; index < padding; index++) {
    console.log(
      borderStyle.vertical + space.repeat(repeatCount) + borderStyle.vertical
    );
  }
  // bottom
  console.log(
    `${borderStyle.bottomLeft}${borderStyle.horizontal.repeat(repeatCount)}${
      borderStyle.bottomRight
    }`
  );
  console.log(reset);

  // margin
  for (let index = 0; index < margin; index++) {
    console.log();
  }
};

export const info = (content: string) => {
  createLogBox({
    color: bright.cyan,
    content,
    style: "line",
  });
};
