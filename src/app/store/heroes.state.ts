import { State, Action, StateContext, StateToken, Selector } from '@ngxs/store';
import {
  AddHero,
  StoreHeroes,
  DeleteHero,
  GetHeroes,
  HeroSearch,
  ClearSearch,
  SelectHero,
  UpdateHero
} from './heroes.actions';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface HeroStateModel {
  heroes: Hero[];
  heroesSearchResults: Hero[];
  selectedHero: Hero;
}

export const HERO_STATE_TOKEN = new StateToken<HeroStateModel>('hero');

@State<HeroStateModel>({
  name: HERO_STATE_TOKEN,
  defaults: {
    heroes: [],
    heroesSearchResults: undefined,
    selectedHero: undefined
  }
})
export class HeroState {
  constructor(private heroService: HeroService, private router: Router) {}

  @Selector()
  static heroes(state: HeroStateModel): Hero[] {
    return state.heroes;
  }

  @Selector()
  static heroesSearch(state: HeroStateModel): Hero[] {
    return state.heroesSearchResults;
  }

  @Selector()
  static selectedHero(state: HeroStateModel): Hero {
    return state.selectedHero;
  }

  @Action(SelectHero)
  selectHero(ctx: StateContext<HeroStateModel>, action: SelectHero) {
    if (ctx.getState().selectedHero.id === action.heroId) {
      return;
    }
    return this.heroService.getHero(action.heroId).pipe(
      tap(hero => ctx.patchState({ selectedHero: hero })),
      tap(hero => this.router.navigate([`/detail/${hero.id}`]))
    );
  }

  @Action(UpdateHero)
  updateHero(ctx: StateContext<HeroStateModel>, action: UpdateHero) {
    return this.heroService
      .updateHero(action.hero)
      .pipe(tap(() => ctx.patchState({ selectedHero: action.hero })));
  }

  @Action(ClearSearch)
  clearSearch(ctx: StateContext<HeroStateModel>) {
    ctx.patchState({
      heroesSearchResults: undefined
    });
  }

  @Action(HeroSearch, { cancelUncompleted: true })
  searchHero(ctx: StateContext<HeroStateModel>, action: HeroSearch) {
    if (!action.searchToken) {
      return ctx.dispatch(new ClearSearch());
    }
    return this.heroService
      .searchHeroes(action.searchToken)
      .pipe(tap(heroes => ctx.patchState({ heroesSearchResults: heroes })));
  }

  @Action(GetHeroes)
  getHeroes(ctx: StateContext<HeroStateModel>) {
    return this.heroService
      .getHeroes()
      .pipe(tap(heroes => ctx.dispatch(new StoreHeroes(heroes, true))));
  }

  @Action(StoreHeroes)
  storeHero(ctx: StateContext<HeroStateModel>, action: StoreHeroes): void {
    const state = ctx.getState();
    const heroes = action.overwrite
      ? action.heroes
      : [...state.heroes, ...action.heroes];
    ctx.setState({
      ...state,
      heroes
    });
  }

  @Action(AddHero)
  addHero(ctx: StateContext<HeroStateModel>, action: AddHero) {
    return this.heroService
      .addHero(action.hero)
      .pipe(tap(hero => ctx.dispatch(new StoreHeroes([hero]))));
  }

  @Action(DeleteHero)
  deleteHero(ctx: StateContext<HeroStateModel>, action: DeleteHero) {
    return this.heroService.deleteHero(action.hero).pipe(
      tap(() => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          heroes: state.heroes.filter(h => h.id !== action.hero.id)
        });
      })
    );
  }
}
