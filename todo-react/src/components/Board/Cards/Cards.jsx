import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../../containers/Board/Card';

const Cards = ({ cards }) => {
  return cards.map((card, index) => (
    <Card key={card.id} card={card} id={`card-${card.id}`} index={index} />
  ));
};

Cards.propTypes = {
  cards: PropTypes.array.isRequired
};

export default Cards;
