import { Hero } from '../hero';

export class AddHero {
  static readonly type = '[Hero] Add';
  constructor(public hero: Hero) {}
}

export class StoreHeroes {
  static readonly type = '[Hero] Store';
  constructor(public heroes: Hero[], public overwrite: boolean = false) {}
}

export class DeleteHero {
  static readonly type = '[Hero] Delete';
  constructor(public hero: Hero) {}
}

export class GetHeroes {
  static readonly type = '[Hero] Get all';
}

export class HeroSearch {
  static readonly type = '[Hero] Search';
  constructor(public searchToken: string) {}
}

export class ClearSearch {
  static readonly type = '[Hero] Clear Search';
}

export class SelectHero {
  static readonly type = '[Hero] Select Hero';
  constructor(public heroId: number) {}
}

export class UpdateHero {
  static readonly type = '[Hero] Update Hero';
  constructor(public hero: Hero) {}
}
