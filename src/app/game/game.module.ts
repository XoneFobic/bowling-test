import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { Game } from './game.service';
import { PinsNumber } from './pins-number.pipe';

@NgModule({
  declarations: [GameComponent, PinsNumber],
  imports: [CommonModule, GameRoutingModule],
  providers: [Game]
})
export class GameModule {}
