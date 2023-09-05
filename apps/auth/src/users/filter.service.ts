import { Injectable } from '@nestjs/common';

@Injectable()
export class FilterService {
  build(key: string) {
    return (query: { [property: string]: any }) => {
      if (query.hasOwnProperty(key)) {
        return {
          ...query,
          [key]: query[key],
        };
      }
      return query;
    };
  }
}
