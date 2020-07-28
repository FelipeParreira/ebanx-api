import add from '../../src/utils';

describe('add', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).toEqual(3);
    expect(add(1, 0)).toEqual(1);
    expect(add(1, -1)).toEqual(0);
    expect(add(1, -1)).toEqual(add(-1, 1));
  });
});
