import React from 'react';
import { Card } from '../../types/card.type.tsx';
import CardComponent from '../card/card.component.tsx';

type OffersListProps = {
  offerCards: Card[];
}

function OffersList({ offerCards }: OffersListProps): JSX.Element {
  const [, activateOfferId] = React.useState<number | null>(null);

  return (
    <React.Fragment>
      {offerCards.map((offerCard) => (
        <CardComponent key={offerCard.id} {...offerCard} onHover={activateOfferId} />
      ))}
    </React.Fragment>
  );
}

export default OffersList;
