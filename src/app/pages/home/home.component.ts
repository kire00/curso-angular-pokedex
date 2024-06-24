// home.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public types: string[] = ['grass', 'water', 'fire', 'bug', 'normal', 'poison', 'electric', 'ground', 'fairy', 'fighting', 'psychic', 'rock', 'ghost', 'ice', 'dragon', 'dark', 'steel', 'flying'];
  public generations: string[] = ['generation-i', 'generation-ii', 'generation-iii', 'generation-iv', 'generation-v'];
  public searchQuery: string = '';
  public filterType: string = '';
  public filterGeneration: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  handleSearchEvent(query: string): void {
    this.searchQuery = query;
    this.applyFilters();
  }

  updateFilterType(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.filterType = selectElement.value;
    this.applyFilters();
  }

  updateFilterGeneration(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.filterGeneration = selectElement.value;
    this.applyFilters();
  }

  applyFilters(): void {
    console.log('Aplicando filtros:', {
      searchQuery: this.searchQuery,
      filterType: this.filterType,
      filterGeneration: this.filterGeneration
    });
  }
}
