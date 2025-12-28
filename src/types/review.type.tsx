import { User } from './user.type';

export type Review = {
    id: number;
    offerId: string;
    user: User;
    comment: string;
    date: string;
    rating: number;
};
