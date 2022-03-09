import { ClientSlateTypes, SiteSlateEntity, SlateMasterMap } from './daily-fantasy-client.model';

export const MOCK_SITE_SLATE_ENTITY_1: SiteSlateEntity = {
  date: '',
  importId: '13939',
  name: '',
  games: [],
  start: '',
  type: ClientSlateTypes.Classic,
  salaryCap: 0,
  slate_path: '',
  source: '',
  default: false,
  taggable: false,
  hidden: false,
};

export const MOCK_SITE_SLATE_ENTITY_MAP = {
  [MOCK_SITE_SLATE_ENTITY_1.importId]: MOCK_SITE_SLATE_ENTITY_1,
};

export const MOCK_SLATE_MASTER: SlateMasterMap = {
  draftkings: MOCK_SITE_SLATE_ENTITY_MAP,
  fanduel: MOCK_SITE_SLATE_ENTITY_MAP,
  yahoo: MOCK_SITE_SLATE_ENTITY_MAP,
  superdraft: MOCK_SITE_SLATE_ENTITY_MAP,
};
