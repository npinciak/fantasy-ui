import { Selector as SelectorNGXS, StateToken } from '@ngxs/store';
import { StateClass } from '@ngxs/store/internals';

export type SelectorFunc<TModel> = (...arg: any) => TModel;
export type TypedSelector<TModel> = StateToken<TModel> | SelectorFunc<TModel>;
export type StateSelector = StateClass<any>;
export type SelectorDef<TModel> = StateSelector | TypedSelector<TModel>;
export type SelectorReturnType<T extends SelectorDef<any>> = T extends StateToken<infer R>
  ? R
  : T extends SelectorFunc<infer R>
  ? R
  : T extends StateClass<any>
  ? unknown
  : never;

export function Selector<T extends SelectorDefTuple>(selectors?: T): SelectorTypedPropertyDescriptor<T> {
  return SelectorNGXS(selectors) as unknown as SelectorTypedPropertyDescriptor<T>;
}

export type SelectorDefTuple = SelectorDef<any>[] | [SelectorDef<any>];

export type ReturnTypeList<T extends SelectorDefTuple> = {
  [K in keyof T]: T[K] extends SelectorDef<any> ? SelectorReturnTypeAny<T[K]> : never;
};

export type DescriptorArg<T extends SelectorDefTuple> = T extends [] ? any[] : ReturnTypeList<T>;

export type SelectorTypedPropertyDescriptor<T extends SelectorDefTuple> = (
  target: any,
  key: string | symbol,
  descriptor: TypedPropertyDescriptor<(...states: DescriptorArg<T>) => any>
) => TypedPropertyDescriptor<(...states: DescriptorArg<T>) => any>;

export type SelectorReturnTypeAny<T extends SelectorDef<any>> = T extends StateClass<any> ? any : SelectorReturnType<T>;
