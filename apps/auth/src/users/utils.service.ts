import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  compose<R>(fn1: (a: R) => R, ...fns: Array<(a: R) => R>) {
    return fns.reduce(
      (prevFn, nextFn) => (value) => prevFn(nextFn(value)),
      fn1,
    );
  }

  pipe<T, U, V, Y>(
    f: (x: T) => U,
    g: (y: U) => V,
    h: (z: V) => Y,
  ): (x: T) => Y {
    return (x: T) => h(g(f(x)));
  }
}
