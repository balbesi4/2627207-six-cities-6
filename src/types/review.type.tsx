import { User } from './user.type';

export type Review = {
    id: number;
    offerId: string;
    author: User;
    text: string;
    date: Date;
    rating: number;
};
