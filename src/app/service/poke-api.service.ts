import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private baseUrl: string = 'https://pokeapi.co/api/v2';
  private url: string = `${this.baseUrl}/pokemon/?offset=0&limit=649`;

  constructor(
    private http: HttpClient
  ) { }

  get apiListAllPokemons(): Observable<any> {
    return this.http.get<any>(this.url).pipe(
      tap(res => res),
      tap(res => {
        res.results.map((resPokemons: any) => {
          this.apiGetPokemon(resPokemons.url).subscribe(
            res => resPokemons.status = res
          );
        });
      })
    );
  }

  public apiGetPokemon(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      map(res => res)
    );
  }

  public getPokemonDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pokemon/${id}`).pipe(
      map(res => res)
    );
  }

  public getTypeDetails(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      map(res => res)
    );
  }

  public getEvolutionChain(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      map(res => res)
    );
  }

  public getPokemonByType(type: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/type/${type}`).pipe(
      map(res => res.pokemon.map((p: any) => p.pokemon))
    );
  }

  public getPokemonByGeneration(gen: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/generation/${gen}`).pipe(
      map(res => res.pokemon_species)
    );
  }

  public getPokemonTypeColor(type: string): string {
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
}
