import { Review } from '../types/review.type';

export const reviews: Review[] = [
  {
    id: 1,
    offerId: 1,
    date: new Date(2025, 1, 15),
    author: {
      name: 'John',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/5.jpg',
      isPro: true,
      email: 'john_pohn@gmail.com',
    },
    rating: 5,
    text: 'I was so excited to stay here!! Pleasant apartment with amazing view! 10/10'
  },
  {
    id: 2,
    offerId: 3,
    date: new Date(2025, 5, 5),
    author: {
      name: 'Zheka',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/3.jpg',
      isPro: true,
      email: 'zheka_killer2004@gmail.com',
    },
    rating: 4,
    text: 'All was good but breakfasts were not good :(((( so will mark this place 4'
  },
];
