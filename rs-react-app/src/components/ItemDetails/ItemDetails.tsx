import type { Character } from '../../entities';
import { CHAR_MAP } from '../../shared/constants';
import { MsgBlock } from '../MsgBlock';

type Props = {
  character: Character | null;
};

export function ItemDetails({ character }: Props) {
  return !character ? (
    <MsgBlock
      title="No chosen character"
      msg="Please choose a character to learn more about them"
      isItemDetails={true}
    />
  ) : (
    <div className="w-2/3 pb-6 px-6">
      <h2 className="text-xl font-bold text-rose-800 mb-4 border-b pb-2">
        {character.name}
      </h2>
      <ul className="space-y-2">
        {CHAR_MAP.map((char) => (
          <li
            key={char.key}
            className="flex justify-between text-sm text-gray-700"
          >
            <span className="font-semibold text-rose-700">{char.title}:</span>
            <span>{character[char.dataToRender]?.toString() ?? 'Unknown'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
