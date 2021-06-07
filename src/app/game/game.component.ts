import { Component } from '@angular/core';
import { Game } from './game.service';

@Component({
  selector: 'dbg-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  public constructor(public game: Game) {}
}
