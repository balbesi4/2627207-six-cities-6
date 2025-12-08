import { SortType } from '../enums/sort-options.enum';
import { OfferCard } from '../types/offer-card.type';

export const getSortComparator = (
  sortOption: SortType
): ((a: OfferCard, b: OfferCard) => number) => {
  const comparators = {
    [SortType.Popular]: () => 0,
    [SortType.PriceLowToHigh]: (a: OfferCard, b: OfferCard) => a.price - b.price,
    [SortType.PriceHighToLow]: (a: OfferCard, b: OfferCard) => b.price - a.price,
    [SortType.TopRated]: (a: OfferCard, b: OfferCard) => b.rating - a.rating,
  };

  return comparators[sortOption];
};

export const sortOffersByOption = (
  offers: OfferCard[],
  sortOption: SortType
): OfferCard[] => [...offers].sort(getSortComparator(sortOption));
