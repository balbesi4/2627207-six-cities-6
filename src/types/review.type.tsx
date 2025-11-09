import { User } from './user.type';

export type Review = {
    id: number;
    offerId: number;
    author: User;
    text: string;
    date: Date;
    rating: number;
};
