import mapKeys from 'lodash/mapKeys';

export const mapBoardContent = ({ data: { id, attributes }, included }) => {
  const { title, isCreator, members, listIds } = attributes;
  return {
    board: { id, title },
    lists: mapLists(id, included),
    cards: mapCards(included),
    members: members.map(member => {
      member.avatarUrl = member.avatarUrl || require('../images/avatar-placeholder.png');
      return member;
    }),
    isCreator,
    listIds
  };
};

export const mapTeamContent = ({ data: { id, attributes }, included }) => {
  const { name, userEmails, isCreator } = attributes;
  return {
    team: { id, name },
    isCreator,
    userEmails: mapUserEmails(userEmails),
    members: mapMembers(included),
    boards: mapBoardsForTeam(included)
  };
};

export const mapBoard = ({ data: { id, attributes } }) => {
  return { id, title: attributes.title };
};

export const mapTeam = ({ data: { id, attributes } }) => {
  return { id, name: attributes.name };
};

export const mapList = ({ data: { id, attributes, relationships } }) => {
  return { id, ...attributes, boardId: relationships.board.data.id };
};

export const mapCard = ({ data: { id, attributes, relationships } }) => {
  return { id, ...attributes, listId: relationships.list.data.id, assignments: {} };
};

export const mapInvite = ({ data: { id }, included }) => {
  const team = { id: included[0].id, name: included[0].attributes.name };
  return { inviteId: id, team };
};

export const mapProfile = ({ data: { id, attributes } }) => {
  const isDefaultAvatar = attributes.avatarUrl === '';
  const avatar = {
    url: isDefaultAvatar ? require('../images/avatar-placeholder.png') : attributes.avatarUrl,
    isDefaultAvatar
  };
  const finalAttributes = { id, ...attributes, avatar };
  return { ...finalAttributes };
};

export const mapSubscription = ({ data }) => {
  return data ? { id: data.id, ...data.attributes } : null;
};

export const mapAssignment = ({ data: { id, attributes, relationships } }) => {
  return { id, cardId: relationships.card.data.id, ...attributes };
};

export const mapBoards = ({ data }) => {
  const boards = data.map(o => ({ id: o.id, title: o.attributes.title }));
  return mapKeys(boards, 'id');
};

export const mapTeams = ({ data }) => {
  const teams = data.map(o => ({ id: o.id, name: o.attributes.name }));
  return mapKeys(teams, 'id');
};

const mapLists = (boardId, included) => {
  const lists = included
    .map(({ id, type, attributes }) => {
      if (type === 'list') {
        return { id, boardId, ...attributes };
      }
      return undefined;
    })
    .filter(Boolean);
  return mapKeys(lists, 'id');
};

const mapCards = included => {
  const cards = included
    .map(({ id, type, relationships: { list }, attributes }) => {
      if (type === 'card') {
        return {
          id,
          listId: list.data.id,
          assignments: mapAssignments(id, included),
          ...attributes
        };
      }
      return undefined;
    })
    .filter(Boolean);
  return mapKeys(cards, 'id');
};

const mapAssignments = (cardId, included) => {
  const assignments = included
    .map(({ id, type, relationships: { card }, attributes }) => {
      if (type === 'userCard' && card.data.id === cardId) {
        return {
          id,
          cardId: card.data.id,
          ...attributes
        };
      }
      return undefined;
    })
    .filter(Boolean);
  return mapKeys(assignments, 'id');
};

const mapMembers = included => {
  let members = included
    .map(({ id, type, attributes }) => {
      if (type === 'user') {
        return { id, roles: findRoles(id, included), ...attributes };
      }
      return undefined;
    })
    .filter(Boolean);
  return mapKeys(members, 'id');
};

export const mapInvites = ({ data }) => {
  const invites = data.map(o => ({ id: o.id, ...o.attributes }));
  return mapKeys(invites, 'id');
};

const mapBoardsForTeam = included => {
  let boards = included
    .map(({ id, type, attributes }) => {
      if (type === 'board') {
        return { id, ...attributes };
      }
      return undefined;
    })
    .filter(Boolean);
  return mapKeys(boards, 'id');
};

const mapUserEmails = userEmails => {
  return userEmails.map(({ email, is_invited }) => ({ email, isInvited: is_invited }));
};

const findRoles = (userId, included) => {
  let roles = null;
  included.map(({ type, attributes }) => {
    if (type === 'user_team' && attributes.user_id.toString() === userId) {
      roles = attributes.roles;
    }
    return undefined;
  });
  return roles;
};
