export interface Ballpark {
  [id: number]: {
    team: string;
    name: string;
    img: string;
    lat: number;
    lng: number;
  };
}
