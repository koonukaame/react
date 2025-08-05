import { Spinner } from '@components';
import { getCharacter, type Character, CharacterDetails } from '@entities';
import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router';

export const CharacterWidget = () => {
  const { uid } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);

  const fetchChar = useCallback(async (uid: string) => {
    setIsLoading(true);
    const result = await getCharacter(uid);
    setIsLoading(false);
    if (!result.ok) {
      setSelectedChar(null);
      return;
    }

    const { character } = result;
    setSelectedChar(character);
  }, []);

  useEffect(() => {
    if (!uid) {
      setSelectedChar(null);
      return;
    }

    fetchChar(uid);
  }, [fetchChar, uid]);

  return isLoading ? (
    <div className="relative flex-grow">
      <Spinner isFullScreen={false} />
    </div>
  ) : selectedChar ? (
    <CharacterDetails character={selectedChar} />
  ) : null;
};
