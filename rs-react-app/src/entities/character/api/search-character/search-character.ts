import type { ResponsePage } from '../../../../shared';
import { CharacterResponse } from '../../model/character-schema';
import type { Character } from '../../model/character-schema';

type CharacterSearchSuccess = {
  characters: Character[];
  page: ResponsePage;
  ok: true;
};

type CharacterSearchError = {
  message: string;
  ok: false;
};

type CharacterSearchResult = CharacterSearchSuccess | CharacterSearchError;

export const searchCharacter = async (
  name: string,
  pageNumber: number
): Promise<CharacterSearchResult> => {
  try {
    const formData = new URLSearchParams();
    formData.append('name', name);

    const response = await fetch(
      `https://stapi.co/api/v1/rest/character/search?pageNumber=${pageNumber - 1}`,
      {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const data = await response.json();
    const result = CharacterResponse.safeParse(data);

    if (!response.ok) {
      return { message: 'api error', ok: false }; // TODO: better error message
    }

    if (!result.success) {
      return {
        message: 'Response data do not satisfies CharacterResponse schema',
        ok: false,
      };
    }
    return {
      characters: result.data.characters,
      page: {
        ...result.data.page,
        pageNumber: result.data.page.pageNumber + 1,
      },
      ok: true,
    };
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'Unknown error',
      ok: false,
    };
  }
};
