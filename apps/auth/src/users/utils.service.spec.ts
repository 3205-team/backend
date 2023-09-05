import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let utilsService: UtilsService;

  beforeEach(async () => {
    utilsService = new UtilsService();
  });

  describe('compose()', () => {
    it('should composes functions', () => {
      const fn1 = (val: string) => `fn1(${val})`;
      const fn2 = (val: string) => `fn2(${val})`;
      const fn3 = (val: string) => `fn3(${val})`;
      const composedFunction = utilsService.compose(fn1, fn2, fn3);
      expect(composedFunction('inner')).toBe('fn1(fn2(fn3(inner)))');
    });
  });
});
