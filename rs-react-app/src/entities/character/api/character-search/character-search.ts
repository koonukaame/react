import type { Character, Page } from '../../..';
import { responseSchema } from '../../model';

export const searchCharacter = async (
  body: FormData,
  pageNumber: number
): Promise<{ characters: Character[]; page: Page }> => {
  const formData = new URLSearchParams();

  for (const [key, value] of body) {
    formData.append(key, value.toString());
  }

  const response = await fetch(
    `https://stapi.co/api/v1/rest/character/search?pageNumber=${pageNumber}`,
    {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  const data = await response.json();
  const result = responseSchema.safeParse(data);

  if (!result.success) {
    console.error(result.error);
    throw new Error('API error');
  }
  return { characters: result.data.characters, page: result.data.page };
};
