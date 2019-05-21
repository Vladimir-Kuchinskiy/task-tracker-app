import React, { useState } from 'react';

import EditCardDescriptionForm from './EditCardDescriptionForm';
import Button from '../../common/Button';
import { elementHeight } from '../../../services/viewHelpers';

const CardDescription = ({ card: { id, description } }) => {
  const [editClicked, setEditClicked] = useState(false);

  const toggleEdit = () => {
    setEditClicked(!editClicked);
  };

  const descriprionContentHeight = elementHeight(document.getElementById('description'));

  const editButton = !editClicked && (
    <Button classes="btn btn-outline-secondary d-inline ml-3" title="Edit" onClick={toggleEdit} />
  );

  const descriptionContent = description && (
    <div className="card-description" id="description" onClick={toggleEdit}>
      {description}
    </div>
  );

  const cardContent = editClicked ? (
    <EditCardDescriptionForm
      form={`EditCardDescriptionForm-${id}`}
      initialValues={{ description }}
      cardId={id}
      descrAreaHeight={descriprionContentHeight}
      onEdit={toggleEdit}
    />
  ) : (
    descriptionContent
  );

  return (
    <React.Fragment>
      <h5 className="d-inline">Description</h5>
      {editButton}
      <div className="mt-4">{cardContent}</div>
    </React.Fragment>
  );
};

export default CardDescription;
