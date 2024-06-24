import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';

  public pokemon: any;
  public weaknesses: any[] = [];
  public evolutions: any[] = [];
  public isLoading: boolean = false;
  public apiError: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeApiService: PokeApiService
  ) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  public getPokemon() {
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.pokeApiService.apiGetPokemon(`${this.urlPokemon}/${id}`);
    const name = this.pokeApiService.apiGetPokemon(`${this.urlName}/${id}`);

    return forkJoin([pokemon, name]).subscribe(
      (res: any) => {
        this.pokemon = res;
        this.isLoading = true;
        this.calculateWeaknesses();
        this.getEvolutionChain(res[1].evolution_chain.url);
      },
      (error: any) => {
        this.apiError = true;
      }
    );
  }

  calculateWeaknesses(): void {
    const typeUrls: string[] = this.pokemon[0].types.map((type: any) => type.type.url);
    let weaknessesSet = new Set<string>();
    let observables = typeUrls.map((url: string) => this.pokeApiService.getTypeDetails(url));
    forkJoin(observables).subscribe(
      (results: any[]) => {
        results.forEach((res: any) => {
          res.damage_relations.double_damage_from.forEach((weakness: any) => {
            weaknessesSet.add(weakness.name);
          });
        });
        this.weaknesses = Array.from(weaknessesSet);
      },
      (error: any) => {
        console.error('Failed to fetch type details', error);
      }
    );
  }

  getEvolutionChain(url: string): void {
    this.pokeApiService.getEvolutionChain(url).subscribe(
      (res: any) => {
        this.evolutions = this.extractEvolutions(res.chain);
      },
      (error: any) => {
        console.error('Failed to fetch evolution chain', error);
      }
    );
  }

  extractEvolutions(chain: any): any[] {
    let evolutions = [];
    let current = chain;
    while (current) {
      evolutions.push(current.species);
      if (current.evolves_to.length > 0) {
        current = current.evolves_to[0];
      } else {
        current = null;
      }
    }
    return evolutions;
  }

  getPokemonTypeColor(type: string): string {
    const typeColorMap: { [key: string]: string } = {
      grass: '#9bcc50',
      water: '#4592c4',
      fire: '#fd7d24',
      bug: '#729f3f',
      normal: '#a4acaf',
      poison: '#b97fc9',
      electric: '#eed535',
      ground: '#ab9842',
      fairy: '#fdb9e9',
      fighting: '#d56723',
      psychic: '#f366b9',
      rock: '#a38c21',
      ghost: '#7b62a3',
      ice: '#51c4e7',
      dragon: '#004666',
      dark: '#707070',
      steel: '#9eb7b8',
      flying: '#3dc7ef'
    };
    return typeColorMap[type] || 'black';
  }

  getPokemonId(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }
}
