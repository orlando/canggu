import { combineReducers } from 'redux';
import { containers } from './containers';
import { selectedContainer } from './selectedContainer';
import { stats } from './stats';


export default combineReducers({
  containers,
  selectedContainer,
  stats
});
