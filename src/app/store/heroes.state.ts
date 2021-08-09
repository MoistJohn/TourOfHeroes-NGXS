import { State, Action, StateContext, StateToken, Selector } from "@ngxs/store";
import { AddHero, StoreHeroes, DeleteHero, GetHeroes, HeroSearch } from "./heroes.actions";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { catchError, map, tap } from "rxjs/operators";

export interface HeroStateModel {
  heroes: Hero[];
}

export const HERO_STATE_TOKEN = new StateToken<HeroStateModel>("hero");

@State<HeroStateModel>({
  name: HERO_STATE_TOKEN,
  defaults: {
    heroes: []
  }
})
export class HeroState {
  constructor(private heroService: HeroService) {}

  @Selector()
  static heroes(state: HeroStateModel): Hero[] {
    return state.heroes;
  }

  @Action(HeroSearch)
  searchHero(ctx: StateContext<HeroStateModel>, action: HeroSearch) {
    this.heroService.searchHeroes(action.searchToken).pipe(
      const state = ctx.getState();
      for (let h of heroes) {

      }
    )
  }

  @Action(GetHeroes)
  getHeroes(ctx: StateContext<HeroStateModel>) {
    return this.heroService.getHeroes().pipe(
      tap(heroes => ctx.dispatch(new StoreHeroes(heroes, true)))
    )
  }

  @Action(StoreHeroes)
  storeHero(ctx: StateContext<HeroStateModel>, action: StoreHeroes): void {
    const state = ctx.getState();
    const heroes = action.overwrite ? action.heroes : [...state.heroes, ...action.heroes];
    ctx.setState({
      ...state,
      heroes
    });
  }

  @Action(AddHero)
  addHero(ctx: StateContext<HeroStateModel>, action: AddHero) {
    return this.heroService.addHero(action.hero).pipe(
      tap(hero => ctx.dispatch(new StoreHeroes([hero])))
    );
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
