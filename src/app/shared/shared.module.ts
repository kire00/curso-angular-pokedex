import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { PokeHeaderComponent } from './poke-header/poke-header.component';
import { PokeSearchComponent } from './poke-search/poke-search.component';
import { PokeListComponent } from './poke-list/poke-list.component';

// Pipes
import { PadNumberPipe } from '../pad-number.pipe';
import { CapitalizePipe } from '../capitalize.pipe';

@NgModule({
  declarations: [
    PokeHeaderComponent,
    PokeSearchComponent,
    PokeListComponent,
    PadNumberPipe,
    CapitalizePipe
  ],
  exports: [
    PokeHeaderComponent,
    PokeSearchComponent,
    PokeListComponent,
    CapitalizePipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
