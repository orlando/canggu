'use strict';

export function containers(state = [], action) {
  if (action.type === 'FETCH_CONTAINERS') {
    return action.payload.containers;
  }

  return state;
}
