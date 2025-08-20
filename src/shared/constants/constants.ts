import type { Character } from '@entities';

export const SEARCH_KEY = 'search';

type CharMapType = {
  key: string;
  title: string;
  dataToRender: keyof Character;
}[];

export const createCharMap = (t: (key: string) => string): CharMapType => {
  return [
    { key: 'name', title: t('fields.name'), dataToRender: 'name' },
    { key: 'gender', title: t('fields.gender'), dataToRender: 'gender' },
    { key: 'birth', title: t('fields.birth'), dataToRender: 'yearOfBirth' },
    { key: 'death', title: t('fields.death'), dataToRender: 'yearOfDeath' },
    {
      key: 'placeOfBirth',
      title: t('fields.placeOfBirth'),
      dataToRender: 'placeOfBirth',
    },
    {
      key: 'placeOfDeath',
      title: t('fields.placeOfDeath'),
      dataToRender: 'placeOfDeath',
    },
    {
      key: 'height',
      title: t('fields.height'),
      dataToRender: 'height',
    },
    {
      key: 'weight',
      title: t('fields.weight'),
      dataToRender: 'weight',
    },
    {
      key: 'status',
      title: t('fields.status'),
      dataToRender: 'deceased',
    },
  ];
};
