import { City } from './city.type';
import { Location } from './location.type';


export type OfferCard = {
  id: string;
  title: string;
  previewImage : string;
  isPremium : boolean;
  price : number;
  isFavorite : boolean;
  rating : number;
  type : string;
  city: City;
  location: Location;
  images: string[];
}
