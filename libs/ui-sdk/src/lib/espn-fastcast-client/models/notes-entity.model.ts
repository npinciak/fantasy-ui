export interface NotesEntity {
  type: string;
  text: string;
  headline?: string | null;
  date?: string | null;
  source?: string | null;
}
