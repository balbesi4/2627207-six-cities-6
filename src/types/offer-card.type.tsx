import { City } from './city.type';
import { User } from './user.type';

export type OfferCard = {
  id: number;
  title: string;
  imageLink : string;
  isPremium : boolean;
  cost : number;
  isInFavorites : boolean;
  rating : number;
  description : string;
  housingType : string;
  city: City;
  bedroomsCount: number;
  author: User;
  maxAdults: number;
  amenities: string[];
  imageLinks: string[];
}
