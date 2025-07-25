import type { Character } from '../../entities';

export const SEARCH_KEY = 'search';
export const PAGE_OFFSET = 1;

export const BTN_STYLES =
  'bg-rose-700/80 hover:bg-rose-800 text-white font-medium px-6 py-2 rounded-full shadow transition cursor-pointer';

type CharMapType = {
  key: string;
  title: string;
  dataToRender: keyof Character;
}[];

export const CHAR_MAP: CharMapType = [
  { key: 'name', title: 'Name', dataToRender: 'name' },
  { key: 'gender', title: 'Gender', dataToRender: 'gender' },
  { key: 'birth', title: 'Birth', dataToRender: 'yearOfBirth' },
  { key: 'death', title: 'Death', dataToRender: 'yearOfDeath' },
  {
    key: 'placeOfBirth',
    title: 'Place of Birth',
    dataToRender: 'placeOfBirth',
  },
  {
    key: 'placeOfDeath',
    title: 'Place of Death',
    dataToRender: 'placeOfDeath',
  },
  {
    key: 'height',
    title: 'Height',
    dataToRender: 'height',
  },
  {
    key: 'weight',
    title: 'Weight',
    dataToRender: 'weight',
  },
  {
    key: 'status',
    title: 'Status',
    dataToRender: 'deceased',
  },
];
