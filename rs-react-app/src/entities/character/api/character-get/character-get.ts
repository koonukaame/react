import type { Character } from '../../..';
import { charSchema } from '../../model';

export const getCharacter = async (
  uid: string
): Promise<{ character: Character }> => {
  const response = await fetch(
    `https://stapi.co/api/v1/rest/character?uid=${uid}`
  );

  const data = await response.json();
  const result = charSchema.safeParse(data.character);

  if (!result.success) {
    throw new Error('Api error response');
  }

  return { character: result.data };
};
