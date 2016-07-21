'use strict';

export function stats(state = [], action) {
  if (action.type === 'CONTAINER_SELECTED') {
    return [];
  }

  if (action.type === 'CONTAINER_STATS_TICK') {
    const { payload } = action
    const { data, id } = payload;
    let newState = [...state];

    const tick = JSON.parse(data.toString())

    newState.push(tick);

    if (newState.length >= 15) {
      newState.shift();
    }

    return newState;
  }

  return state;
}
