import { describe, it, expect } from 'vitest';
import { reducer } from './reducer';
import {
  changeCity,
  loadOffers,
  requireAuth,
  setOffersLoadingStatus,
  setReviews,
  setCurrentOffer,
  setNearbyOffers,
  setOfferLoadingStatus,
  setOfferError
} from './action';
import { SortType } from '../enums/sort-options.enum';
import { AuthStatus } from '../enums/auth-status.enum';

describe('Reducer', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      city: {
        name: 'Paris',
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 16,
        }
      },
      offers: [],
      reviews: [],
      sortType: SortType.Popular,
      areOffersLoading: false,
      authStatus: AuthStatus.Unknown,
      currentOffer: null,
      nearbyOffers: [],
      isOfferLoading: false,
      hasOfferError: false,
    };

    const result = reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should change city with "changeCity" action', () => {
    const initialState = {
      city: {
        name: 'Paris',
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 16,
        }
      },
      offers: [],
      reviews: [],
      sortType: SortType.Popular,
      areOffersLoading: false,
      authStatus: AuthStatus.Unknown,
      currentOffer: null,
      nearbyOffers: [],
      isOfferLoading: false,
      hasOfferError: false,
    };

    const newCity = {
      name: 'Amsterdam',
      location: {
        latitude: 52.3676,
        longitude: 4.9041,
        zoom: 13,
      }
    };

    const result = reducer(initialState, changeCity(newCity));

    expect(result.city).toEqual(newCity);
  });

  it('should load offers with "loadOffers" action', () => {
    const initialState = {
      city: {
        name: 'Paris',
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 16,
        }
      },
      offers: [],
      reviews: [],
      sortType: SortType.Popular,
      areOffersLoading: false,
      authStatus: AuthStatus.Unknown,
      currentOffer: null,
      nearbyOffers: [],
      isOfferLoading: false,
      hasOfferError: false,
    };

    const mockOffers = [
      {
        id: '1',
        title: 'Test Offer',
        previewImage: 'test.jpg',
        isPremium: false,
        price: 100,
        isFavorite: false,
        rating: 4,
        type: 'apartment',
        city: {
          name: 'Paris',
          location: {
            latitude: 48.85661,
            longitude: 2.351499,
            zoom: 16,
          }
        },
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 16,
        },
        images: ['test.jpg'],
      }
    ];

    const result = reducer(initialState, loadOffers(mockOffers));

    expect(result.offers).toEqual(mockOffers);
  });

  it('should set offers loading status with "setOffersLoadingStatus" action', () => {
    const initialState = {
      city: {
        name: 'Paris',
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 16,
        }
      },
      offers: [],
      reviews: [],
      sortType: SortType.Popular,
      areOffersLoading: false,
      authStatus: AuthStatus.Unknown,
      currentOffer: null,
      nearbyOffers: [],
      isOfferLoading: false,
      hasOfferError: false,
    };

    const result = reducer(initialState, setOffersLoadingStatus(true));

    expect(result.areOffersLoading).toBe(true);
  });

  it('should set reviews with "setReviews" action', () => {
    const initialState = {
      city: {
        name: 'Paris',
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 16,
        }
      },
      offers: [],
      reviews: [],
      sortType: SortType.Popular,
      areOffersLoading: false,
      authStatus: AuthStatus.Unknown,
      currentOffer: null,
      nearbyOffers: [],
      isOfferLoading: false,
      hasOfferError: false,
    };

    const mockReviews = [
      {
        id: 1,
        offerId: '1',
        user: {
          name: 'User',
          email: 'user@test.com',
          avatarUrl: 'avatar.jpg',
          isPro: false,
          token: 'token',
        },
        comment: 'Great place!',
        date: '2023-10-01',
        rating: 5,
      }
    ];

    const result = reducer(initialState, setReviews(mockReviews));

    expect(result.reviews).toEqual(mockReviews);
  });

  it('should set auth status with "requireAuth" action', () => {
    const initialState = {
      city: {
        name: 'Paris',
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 16,
        }
      },
      offers: [],
      reviews: [],
      sortType: SortType.Popular,
      areOffersLoading: false,
      authStatus: AuthStatus.Unknown,
      currentOffer: null,
      nearbyOffers: [],
      isOfferLoading: false,
      hasOfferError: false,
    };

    const result = reducer(initialState, requireAuth(AuthStatus.Auth));

    expect(result.authStatus).toBe(AuthStatus.Auth);
  });

  it('should set current offer with "setCurrentOffer" action', () => {
    const initialState = {
      city: {
        name: 'Paris',
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 16,
        }
      },
      offers: [],
      reviews: [],
      sortType: SortType.Popular,
      areOffersLoading: false,
      authStatus: AuthStatus.Unknown,
      currentOffer: null,
      nearbyOffers: [],
      isOfferLoading: false,
      hasOfferError: false,
    };

    const mockOffer = {
      id: '1',
      title: 'Test Offer',
      previewImage: 'test.jpg',
      isPremium: true,
      price: 200,
      isFavorite: true,
      rating: 5,
      type: 'hotel',
      city: {
        name: 'Paris',
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 16,
        }
      },
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 16,
      },
      images: ['test.jpg'],
    };

    const result = reducer(initialState, setCurrentOffer(mockOffer));

    expect(result.currentOffer).toEqual(mockOffer);
  });

  it('should set nearby offers with "setNearbyOffers" action', () => {
    const initialState = {
      city: {
        name: 'Paris',
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 16,
        }
      },
      offers: [],
      reviews: [],
      sortType: SortType.Popular,
      areOffersLoading: false,
      authStatus: AuthStatus.Unknown,
      currentOffer: null,
      nearbyOffers: [],
      isOfferLoading: false,
      hasOfferError: false,
    };

    const mockNearbyOffers = [
      {
        id: '2',
        title: 'Nearby Offer',
        previewImage: 'nearby.jpg',
        isPremium: false,
        price: 150,
        isFavorite: false,
        rating: 4,
        type: 'apartment',
        city: {
          name: 'Paris',
          location: {
            latitude: 48.85661,
            longitude: 2.351499,
            zoom: 16,
          }
        },
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 16,
        },
        images: ['nearby.jpg'],
      }
    ];

    const result = reducer(initialState, setNearbyOffers(mockNearbyOffers));

    expect(result.nearbyOffers).toEqual(mockNearbyOffers);
  });

  it('should set offer loading status with "setOfferLoadingStatus" action', () => {
    const initialState = {
      city: {
        name: 'Paris',
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 16,
        }
      },
      offers: [],
      reviews: [],
      sortType: SortType.Popular,
      areOffersLoading: false,
      authStatus: AuthStatus.Unknown,
      currentOffer: null,
      nearbyOffers: [],
      isOfferLoading: false,
      hasOfferError: false,
    };

    const result = reducer(initialState, setOfferLoadingStatus(true));

    expect(result.isOfferLoading).toBe(true);
  });

  it('should set offer error with "setOfferError" action', () => {
    const initialState = {
      city: {
        name: 'Paris',
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 16,
        }
      },
      offers: [],
      reviews: [],
      sortType: SortType.Popular,
      areOffersLoading: false,
      authStatus: AuthStatus.Unknown,
      currentOffer: null,
      nearbyOffers: [],
      isOfferLoading: false,
      hasOfferError: false,
    };

    const result = reducer(initialState, setOfferError(true));

    expect(result.hasOfferError).toBe(true);
  });
});
