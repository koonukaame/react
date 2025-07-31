import { Character } from '../../..';

type CharacterSuccessResult = {
  character: Character;
  ok: true;
};

type CharacterErrorResult = {
  message: string;
  ok: false;
};

type CharacterResult = CharacterSuccessResult | CharacterErrorResult;

export const getCharacter = async (uid: string): Promise<CharacterResult> => {
  try {
    const response = await fetch(
      `https://stapi.co/api/v1/rest/character?uid=${uid}`
    );

    if (!response.ok) {
      return { message: 'api error', ok: false }; // TODO: better error message
    }

    const data = await response.json();
    const result = Character.safeParse(data.character);

    if (!result.success) {
      return {
        message: "Response data don't satisfies Character schema",
        ok: false,
      };
    }

    return { character: result.data, ok: true };
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'Unknown error',
      ok: false,
    };
  }
};
