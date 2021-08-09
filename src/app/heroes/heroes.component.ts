import { Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable} from 'rxjs';
import { Hero } from "../hero";
import { HeroState } from "../store/heroes.state"
import { AddHero, DeleteHero, GetHeroes } from "../store/heroes.actions";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"]
})
export class HeroesComponent implements OnInit {
  @Select(HeroState.heroes) heroes$: Observable<Hero[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.store.dispatch(new GetHeroes());
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.store.dispatch(new AddHero({ name } as Hero));
  }

  delete(hero: Hero): void {
    this.store.dispatch(new DeleteHero(hero));
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
