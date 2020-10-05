export type Primitive = string | number;

export type ObjectItem = { [key: string]: Primitive };
export type OptionItem = Primitive | ObjectItem;

export const KEYS = {
  esc: 27,
  enter: 13,
  down: 40,
  up: 38
};

export const isMobile = () =>
  /iphone|ipod|android|ie|blackberry|fennec/.test(
    navigator.userAgent.toLowerCase()
  );
