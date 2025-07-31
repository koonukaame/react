import { type Character } from '../entities';

export const mockChars: Character[] = [
  {
    uid: '1',
    name: 'Aa',
    gender: 'F',
    yearOfBirth: 1,
    yearOfDeath: 10,
    placeOfBirth: 'hh',
    placeOfDeath: 'zz',
    height: 183,
    weight: 70,
    deceased: true,
  },
  {
    uid: '2',
    name: 'Bb',
    gender: 'M',
    yearOfBirth: 2,
    yearOfDeath: 11,
    placeOfBirth: 'yy',
    placeOfDeath: 'ii',
    height: 4,
    weight: 1,
    deceased: false,
  },
];
