import {
  ADD_AVAILABLE_GAME,
  EMPTY_AVAILABLE_GAMES
} from './types';
export const initialState = {
  hosts: []
};
export default function(lobbyState = initialState, action) {
  switch (action.type) {
    case ADD_AVAILABLE_GAME:
      return {
        hosts: [...lobbyState.hosts, action.hostUsername]
      };
    case EMPTY_AVAILABLE_GAMES:
      return {
        hosts: []
      };
    default:
      return lobbyState;
  }
}
