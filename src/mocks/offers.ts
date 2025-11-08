import { Card } from '../types/card.type.tsx';

export const offerCards: Card[] = [
  {
    id: 1,
    isPremium: true,
    imageLink: 'img/apartment-01.jpg',
    cost: 120,
    description: 'Beautiful & luxurious apartment at great location',
    isInFavorites: false,
    rating: 80,
    housingType: 'Apartment',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 16
      }
    }
  },
  {
    id: 2,
    isPremium: false,
    imageLink: 'img/room.jpg',
    cost: 80,
    description: 'Wood and stone place',
    isInFavorites: true,
    rating: 80,
    housingType: 'Room',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3609553943508,
        longitude: 4.85309666406198,
        zoom: 16
      }
    }
  },
  {
    id: 3,
    isPremium: false,
    imageLink: 'img/apartment-02.jpg',
    cost: 132,
    description: 'Canal View Prinsengracht',
    isInFavorites: false,
    rating: 80,
    housingType: 'Apartment',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.929309666406198,
        zoom: 16
      }
    }
  },
  {
    id: 4,
    isPremium: true,
    imageLink: 'img/apartment-03.jpg',
    cost: 180,
    description: 'Nice, cozy, warm big bed apartment',
    isInFavorites: false,
    rating: 100,
    housingType: 'Apartment',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 16
      }
    }
  }
];

export default offerCards;
