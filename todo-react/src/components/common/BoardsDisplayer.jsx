import React from 'react';
import PropTypes from 'prop-types';

import BoardItem from '../Boards/BoardItem';
import AddBoard from '../Boards/AddBoard';

const BoardsDisplayer = ({ title, boards, isCreator, isMember, boardsLimit, ...rest }) => {
  const canAddBoard = isMember || boards.length < boardsLimit;
  return (
    <React.Fragment>
      <h2 className="row">{title}</h2>
      <div className="row">
        {boards.map(board => {
          return <BoardItem board={board} key={board.id} {...rest} />;
        })}
        {canAddBoard && isCreator && <AddBoard {...rest} />}
      </div>
    </React.Fragment>
  );
};

BoardsDisplayer.propTypes = {
  title: PropTypes.string,
  boards: PropTypes.array.isRequired
};

export default BoardsDisplayer;
