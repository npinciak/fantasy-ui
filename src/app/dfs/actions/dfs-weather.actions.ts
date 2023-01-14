import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { Weather } from '../models/weather.model';

export class DfsWeather extends GenericActions<Weather>({
  stateName: 'dfsWeather',
}) {}
