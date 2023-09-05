import { FilterService } from './filter.service';

describe('FilterService', () => {
  let filterService: FilterService;

  beforeEach(async () => {
    filterService = new FilterService();
  });

  describe('build(key)(query)', () => {
    it('In the second argument query, if there is a key as the first argument, an object containing the key must be returned.', () => {
      expect(filterService.build('name')({ name: 'name' })).toStrictEqual({
        name: 'name',
      });

      expect(filterService.build('name')({})).toStrictEqual({});
    });
  });
});
