import { combineReducers } from 'redux';

import avatar from './profileAvatarReducer';
import info from './profileInfoReducer';
import membership from './membershipReducer';

export default combineReducers({ avatar, info, membership });
