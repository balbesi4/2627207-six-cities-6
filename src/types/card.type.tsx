import { City } from './city.type';

export type Card = {
  id: number;
  imageLink : string;
  isPremium : boolean;
  cost : number;
  isInFavorites : boolean;
  rating : number;
  description : string;
  housingType : string;
  city: City;
}
