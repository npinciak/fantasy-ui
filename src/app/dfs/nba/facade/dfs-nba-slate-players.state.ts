import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { DfsNbaSlatePlayerSelectors } from '../selectors/dfs-nba-slate-players.selectors';

export class DfsNbaSlatePlayerFacade extends GenericFacade(DfsNbaSlatePlayerSelectors) {}
