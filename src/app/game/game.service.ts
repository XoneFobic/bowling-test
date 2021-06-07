import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Game { // Normally this should be `GameService`, but for readability I condensed it.
  private rolls: number[] = [];
  private currentRoll: number = 0;

  public constructor() {
    this.newGame();
  }

  public roll(pins: number): void {
    if (pins > 10) {
      throw new Error('Stay in your own lane please. Thank you.');
    }

    this.rolls[this.currentRoll++] = pins;

    // Alternative for readability
    // this.rolls[this.currentRoll] = pins
    // this.currentRoll++;
  }

  public score(): number {
    let score: number = 0;
    let frameIndex: number = 0;

    for (let frame = 0; frame < 10; frame++) {
      if (this.isStrike(frameIndex)) {
        score += 10 + this.strikeBonus(frameIndex);
        frameIndex++;
      } else if (this.isSpare(frameIndex)) {
        score += 10 + this.spareBonus(frameIndex);
        frameIndex += 2;
      } else {
        score += this.sumBallsUsedThisFrame(frameIndex);
        frameIndex += 2;
      }
    }

    return score;
  }

  public newGame(): void {
    this.rolls = new Array(21).fill(0);
    this.currentRoll = 0;
  }

  public isStrike(frameIndex: number): boolean {
    return this.rolls[frameIndex] === 10;
  }

  public isSpare(frameIndex: number): boolean {
    return this.rolls[frameIndex] + this.rolls[frameIndex + 1] === 10 && this.rolls[frameIndex + 1] !== 0;
  }

  public strikeBonus(frameIndex: number): number {
    return this.rolls[frameIndex + 1] + this.rolls[frameIndex + 2];
  }

  public spareBonus(frameIndex: number): number {
    return this.rolls[frameIndex + 2];
  }

  public sumBallsUsedThisFrame(frameIndex: number): number {
    return this.rolls[frameIndex] + this.rolls[frameIndex + 1];
  }
}
