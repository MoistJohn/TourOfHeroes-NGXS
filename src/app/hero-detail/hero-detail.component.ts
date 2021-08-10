import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HeroState, HeroStateModel } from '../store/heroes.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SelectHero, UpdateHero } from '../store/heroes.actions';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  @Select(HeroState.selectedHero) hero$: Observable<Hero>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.hero$.pipe(tap(h => (this.hero = h))).subscribe();
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.store.dispatch(new SelectHero(id))
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.store.dispatch(new UpdateHero(this.hero))
    // this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
