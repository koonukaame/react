export type Character = {
  uid: string;
  name: string;
  gender: string | null;
  yearOfBirth: number | null;
  yearOfDeath: number | null;
  placeOfBirth: string | null;
  placeOfDeath: string | null;
  height: number | null;
  weight: number | null;
  deceased: boolean | null;
};
