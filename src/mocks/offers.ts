import { OfferCard } from '../types/offer-card.type.tsx';

export const offerCards: OfferCard[] = [
  {
    id: 1,
    title: 'Beautiful & luxurious apartment at great location',
    isPremium: true,
    previewImage: 'img/apartment-01.jpg',
    price: 120,
    description: 'Beautiful & luxurious apartment at great location',
    isFavorite: false,
    rating: 80,
    type: 'Apartment',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 16
      }
    },
    amenities: [
      'Baby seat',
      'Air conditioning',
      'Kitchen',
      'Breakfast',
      'Fridge',
      'Coffee machine',
      'Cable TV',
    ],
    author: {
      name: 'Alexander',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/2.jpg',
      isPro: true,
      email: 'alexander_sanya_sashok@gmail.com',
    },
    imageLinks: [
      'https://14.design.htmlacademy.pro/static/hotel/8.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/2.jpg',
    ],
    bedroomsCount: 2,
    maxAdults: 4,
  },
  {
    id: 2,
    title: 'Wood and stone place',
    isPremium: false,
    previewImage: 'img/room.jpg',
    price: 80,
    description: 'Wood and stone place',
    isFavorite: true,
    rating: 80,
    type: 'Room',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 16
      }
    },
    amenities: [
      'Kitchen',
      'Fridge',
    ],
    author: {
      name: 'Cristiano',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/9.jpg',
      isPro: false,
      email: 'cr7mentallity@gmail.com',
    },
    imageLinks: [
      'https://14.design.htmlacademy.pro/static/hotel/7.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/8.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/5.jpg',
    ],
    bedroomsCount: 2,
    maxAdults: 3,
  },
  {
    id: 3,
    title: 'Canal View Prinsengracht',
    isPremium: false,
    previewImage: 'img/apartment-02.jpg',
    price: 132,
    description: 'Canal View Prinsengracht',
    isFavorite: false,
    rating: 80,
    type: 'Apartment',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.929309666406198,
        zoom: 16
      }
    },
    amenities: [
      'Kitchen',
      'Breakfast',
      'Fridge',
      'Coffee machine',
      'Cable TV',
    ],
    author: {
      name: 'Virgil',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/6.jpg',
      isPro: true,
      email: 'vandijk@gmail.com',
    },
    imageLinks: [
      'https://14.design.htmlacademy.pro/static/hotel/10.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/11.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/12.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/13.jpg',
    ],
    bedroomsCount: 3,
    maxAdults: 5,
  },
  {
    id: 4,
    title: 'Nice, cozy, warm big bed apartment',
    isPremium: true,
    previewImage: 'img/apartment-03.jpg',
    price: 180,
    description: 'Nice, cozy, warm big bed apartment',
    isFavorite: true,
    rating: 100,
    type: 'Apartment',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 16
      }
    },
    amenities: [
      'Kitchen',
      'Air conditioning',
      'Breakfast',
      'Fridge',
    ],
    author: {
      name: 'Nataly',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/9.jpg',
      isPro: true,
      email: 'nataha@gmail.com',
    },
    imageLinks: [
      'https://14.design.htmlacademy.pro/static/hotel/1.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/2.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/3.jpg',
    ],
    bedroomsCount: 1,
    maxAdults: 2,
  }
];

export default offerCards;
