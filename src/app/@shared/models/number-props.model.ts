export type Number<T> = {
  [P in keyof T]: number;
};

export type NumberProps<T> = T extends Function
  ? T
  : T extends Array<infer U>
  ? T
  : {
      [K in keyof T]: number;
    };
