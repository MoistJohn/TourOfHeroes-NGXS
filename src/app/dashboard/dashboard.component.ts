import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { HERO_STATE_TOKEN, HeroStateModel } from '../store/heroes.state';
import { GetHeroes, SelectHero } from '../store/heroes.actions';
import { map } from 'rxjs/operators';
import { Hero } from '../hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Select(HERO_STATE_TOKEN) heroes$: Observable<HeroStateModel>;
  heroesSlice$;

  constructor(private store: Store) {}

  ngOnInit() {
    this.heroesSlice$ = this.heroes$.pipe(
      map(model => model.heroes.slice(1, 5))
    );
    this.getHeroes();
  }

  getHeroes(): void {
    this.store.dispatch(new GetHeroes());
  }
  
  heroClicked(hero: Hero) {
    console.warn(hero);
    this.store.dispatch(new SelectHero(hero.id));
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
