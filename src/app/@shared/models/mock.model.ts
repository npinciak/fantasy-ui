export type Mock<T> = { [key in keyof T]: T[key] };
