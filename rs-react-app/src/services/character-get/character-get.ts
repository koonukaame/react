import type { Character } from '../../entities';

export const getCharacter = async (
  uid: string
): Promise<{ character: Character }> => {
  const response = await fetch(
    `https://stapi.co/api/v1/rest/character?uid=${uid}`
  );

  if (response.ok) {
    return await response.json();
  }

  throw new Error(
    `Api error response ${response.status} ${response.statusText}`
  );
};
