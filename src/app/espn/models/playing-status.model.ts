export enum PlayingStatus {
  Probable = 'PROBABLE',
  NotStarting = 'NOTSTARTING',
  Starting = 'STARTING',
  Active = 'ACTIVE',
}

export const matIconByPlayingStatus: { [key in PlayingStatus]: string } = {
  [PlayingStatus.Active]: 'check_circle',
  [PlayingStatus.NotStarting]: 'error',
  [PlayingStatus.Starting]: 'check_circle',
  [PlayingStatus.Probable]: 'check_circle',
};

export const colorByPlayingStatus: { [key in PlayingStatus]: string } = {
  [PlayingStatus.Active]: '#267851',
  [PlayingStatus.NotStarting]: '#cb0123',
  [PlayingStatus.Starting]: '#267851',
  [PlayingStatus.Probable]: '#267851',
};
