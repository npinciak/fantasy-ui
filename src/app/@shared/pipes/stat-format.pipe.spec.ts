import { StatPipe } from './stat-format.pipe';

describe('statFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new StatPipe();
    expect(pipe).toBeTruthy();
  });
});
