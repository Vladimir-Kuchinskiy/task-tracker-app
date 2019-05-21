import { connect } from 'react-redux';

import CardModal from '../../components/Board/Cards/CardModal';

const mapStateToProps = ({ board }, { cardId }) => {
  return { card: board.cards[cardId] };
};

export default connect(mapStateToProps)(CardModal);
