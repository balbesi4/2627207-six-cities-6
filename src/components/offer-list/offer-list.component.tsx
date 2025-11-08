import React, { useEffect } from 'react';
import { Card } from '../../types/card.type.tsx';
import CardComponent from '../card/card.component.tsx';

type OffersListProps = {
  offerCards: Card[];
  onActiveOfferChange: (offerId: number | null) => void;
}

function OffersList({ offerCards, onActiveOfferChange }: OffersListProps): JSX.Element {
  const [activeOfferId, activateOfferId] = React.useState<number | null>(null);

  useEffect(() => {
    onActiveOfferChange(activeOfferId);
  }, [activeOfferId, onActiveOfferChange]);

  return (
    <React.Fragment>
      {offerCards.map((offerCard) => (
        <CardComponent key={offerCard.id} {...offerCard} onHover={activateOfferId} />
      ))}
    </React.Fragment>
  );
}

export default OffersList;
