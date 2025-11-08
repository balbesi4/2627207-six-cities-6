import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City } from '../../types/city.type';
import { Card } from '../../types/card.type';
import useMap from '../../hooks/use-map';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';

type MapProps = {
    city: City;
    offerCards: Card[];
    selectedOfferCard: Card | undefined;
  };

const baseIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default function Map(mapProps: MapProps): JSX.Element {
  const { city, offerCards, selectedOfferCard } = mapProps;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (!map) {
      return;
    }
    const layer = layerGroup().addTo(map);
    offerCards.forEach(({ id, city: { location } }) =>
      new Marker([location.latitude, location.longitude])
        .setIcon(id === selectedOfferCard?.id ? currentIcon : baseIcon)
        .addTo(layer)
    );

    return () => {
      map.removeLayer(layer);
    };
  }, [map, offerCards, selectedOfferCard]);

  return <div className="cities__map map" style={{height: '500px'}} ref={mapRef}></div>;
}
