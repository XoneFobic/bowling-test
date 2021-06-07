import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Game } from './game.service';

@NgModule({
  imports: [CommonModule],
  providers: [Game]
})
export class GameModule {}
