import React, { useEffect, useCallback, memo } from 'react';
import { OfferCard } from '../../types/offer-card.type.tsx';
import CardComponent from '../card/card.component.tsx';
import { CardType } from '../../enums/card-type.enum.tsx';

type OffersListProps = {
  offerCards: OfferCard[];
  cardType: CardType;
  onActiveOfferChange: (offerId: string | null) => void;
}

function OffersList({ offerCards, cardType, onActiveOfferChange }: OffersListProps): JSX.Element {
  const [activeOfferId, activateOfferId] = React.useState<string | null>(null);

  useEffect(() => {
    onActiveOfferChange(activeOfferId);
  }, [activeOfferId, onActiveOfferChange]);

  const handleHover = useCallback((id: string | null) => {
    activateOfferId(id);
  }, []);

  if (cardType === CardType.Nearest) {
    return (
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {offerCards && offerCards.length > 0 ? (
            offerCards.map((offerCard) => (
              <CardComponent key={offerCard.id} offerCard={offerCard} onHover={handleHover} cardType={cardType}/>
            ))
          ) : (
            <p style={{ textAlign: 'center', fontSize: '32px' }}>No places in the neighbourhood available</p>
          )}
        </div>
      </section>
    );
  }

  return (
    <React.Fragment>
      {offerCards.map((offerCard) => (
        <CardComponent key={offerCard.id} offerCard={offerCard} onHover={handleHover} cardType={cardType} />
      ))}
    </React.Fragment>
  );
}

export default memo(OffersList);
