/* eslint-disable @typescript-eslint/naming-convention */
export const injuryStatusTypes = {
  ACTIVE: {
    injured: false,
    abbrev: 'ACTIVE',
  },
  PROBABLE: {
    injured: false,
    abbrev: 'PROBABLE',
  },
  QUESTIONABLE: {
    injured: false,
    abbrev: 'QUES',
  },
  DOUBTFUL: {
    injured: false,
    abbrev: 'D',
  },
  OUT: {
    injured: true,
    abbrev: 'O',
  },
  INJURY_RESERVE: {
    injured: true,
    abbrev: 'IR',
  },
  DAY_TO_DAY: {
    injured: false,
    abbrev: 'DTD',
  },
  FIFTEEN_DAY_DL: {
    injured: true,
    abbrev: 'DL10',
  },
  SIXTY_DAY_DL: {
    injured: true,
    abbrev: 'DL60',
  },
  SEVEN_DAY_DL: {
    injured: true,
    abbrev: 'DL7',
  },
  TEN_DAY_DL: {
    injured: true,
    abbrev: 'DL10',
  },
  BEREAVEMENT: {
    injured: true,
    abbrev: 'BRV',
  },
  PATERNITY: {
    injured: true,
    abbrev: 'PAT',
  },
  SUSPENSION: {
    injured: false,
    abbrev: 'SUS',
  },
};
