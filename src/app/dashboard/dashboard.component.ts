import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { HERO_STATE_TOKEN, HeroStateModel } from '../store/heroes.state';
import { GetHeroes } from '../store/heroes.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Select(HERO_STATE_TOKEN) heroes$: Observable<HeroStateModel>;
  heroesSlice$ = this.heroes$.pipe(map(model => model.heroes.slice(1, 5)));

  constructor(private store: Store) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.store.dispatch(new GetHeroes());
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
