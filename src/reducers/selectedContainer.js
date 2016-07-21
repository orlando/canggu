'use strict';

export function selectedContainer(state = {}, action) {
  if (action.type === 'CONTAINER_SELECTED') {
    const payload = action.payload;

    return {
      ...payload
    }
  }

  return state;
}
