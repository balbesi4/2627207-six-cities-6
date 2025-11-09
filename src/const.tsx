import { CardType as OfferCardType } from './enums/card-type.enum';

export const Settings = {
  cardCount: 5
};

export const URL_MARKER_DEFAULT = '/img/pin.svg';
export const URL_MARKER_CURRENT = '/img/pin-active.svg';

export const OfferCardImageWrapperClass = {
  [OfferCardType.Regular]: 'cities__image-wrapper',
  [OfferCardType.Nearest]: 'near-places__image-wrapper',
  [OfferCardType.Favorites]: 'favorites__image-wrapper',
};

export const MapClassName = {
  Offer: 'offer__map map',
  Main: 'cities__map map',
};

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
