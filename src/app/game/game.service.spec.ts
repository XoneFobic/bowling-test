import { TestBed } from '@angular/core/testing';

import { Game } from './game.service';

describe('Game', () => {
  let game: Game;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    game = TestBed.inject(Game);
    game.newGame();
  });

  it('should be created', () => expect(game).toBeTruthy());

  describe('Bowling Game', () => {
    it('should score `0` for a gutter game', () => {
      stubRollMany(20, 0);

      expect(game.score()).toBe(0);
    });

    it('should score `20` if all rolls are `1`', () => {
      stubRollMany(20, 1);

      expect(game.score()).toBe(20);
    });

    it('should score `16` for a spare followed by a `3` ball', () => {
      stubRollSpare();
      game.roll(3);

      expect(game.score()).toBe(16);
    });

    it('should score `24` for a strike followed by a `3` and a `4` ball', () => {
      stubRollStrike();
      game.roll(3);
      game.roll(4);

      expect(game.score()).toBe(24);
    });

    it('should score `300` when playing a perfect game', () => {
      stubRollMany(12, 10);
      expect(game.score()).toBe(300);
    });

    it('should be a `strike` when played a `10`', () => {
      game.roll(10);

      expect(game.isStrike(0)).toBeTruthy();
    });

    it('should be a `spare` when played a `4` and a `6`', () => {
      game.roll(4);
      game.roll(6);

      expect(game.isSpare(0)).toBeTruthy();
    });

    it('should NOT be a `strike` when played a `4` and a `6`', () => {
      game.roll(4);
      game.roll(6);

      expect(game.isStrike(0)).toBeFalse();
    });

    it('should NOT be a `spare` when played a `10`', () => {
      game.roll(10);

      expect(game.isSpare(0)).toBeFalse();
    });

    it('should score two rolls properly', () => {
      let attempts = [
        { first: 0, second: 0, total: 0 },
        { first: 1, second: 2, total: 3 },
        { first: 5, second: 2, total: 7 },
        { first: 8, second: 1, total: 9 },
        { first: 5, second: 5, total: 10 }
      ];

      attempts.forEach(attempt => {
        game.newGame();
        game.roll(attempt.first);
        game.roll(attempt.second);

        expect(game.score()).toBe(attempt.total);
      });
    });

    it('should throw error if rolled higher than `10`', () => {
      expect(() => game.roll(11)).toThrowError('Stay in your own lane please. Thank you.');
    });

    function stubRollMany(rolls: number, pins: number) {
      for (let i = 0; i < rolls; i++) {
        game.roll(pins);
      }
    }

    function stubRollSpare() {
      game.roll(5);
      game.roll(5);
    }

    function stubRollStrike() {
      game.roll(10);
    }
  });
});
