import { CharacterResponse } from '../model';

type CharacterSearchSuccess = {
  data: CharacterResponse;
  ok: true;
};

type CharacterSearchError = {
  message: string;
  ok: false;
};

type CharacterSearchResult = CharacterSearchSuccess | CharacterSearchError;

export const getInitialCharacters =
  async (): Promise<CharacterSearchResult> => {
    try {
      const response = await fetch(
        'https://stapi.co/api/v1/rest/character/search'
      );

      const data = await response.json();
      const result = CharacterResponse.safeParse(data);

      if (!response.ok) {
        return {
          message: `API failed with error ${response.status}: ${response.statusText}`,
          ok: false,
        };
      }

      if (!result.success) {
        return {
          message: 'Response data do not satisfies CharacterResponse schema',
          ok: false,
        };
      }
      return {
        data: result.data,
        ok: true,
      };
    } catch (error) {
      return {
        message: error instanceof Error ? error.message : 'Unknown error',
        ok: false,
      };
    }
  };
