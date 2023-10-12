import { ClientVegas } from '../daily-fantasy-client/vegas.model';
import { ClientMlbSlateTeamAttributesProperties } from './slate-team-attributes.model';

export type ValueProperties = {
  stack_value: string;
  top_value: string;
  smash_value?: string;
  stack_leverage: string;
  stack_field: string;
  stack_diff: string;
};

export type ClientMlbSlateTeamAttributes = { vegas: ClientVegas } & ClientMlbSlateTeamAttributesProperties;

export type MLBClientTeamAttributes = ClientMlbSlateTeamAttributesProperties & ValueProperties;
