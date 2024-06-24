// poke-search.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-poke-search',
  templateUrl: './poke-search.component.html',
  styleUrls: ['./poke-search.component.scss']
})
export class PokeSearchComponent implements OnInit {
  @Output() public emitSearch: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  public search(value: string): void {
    this.emitSearch.emit(value);
  }
}
