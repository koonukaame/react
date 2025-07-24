import type { Character } from '../../entities';
import { CHAR_MAP } from '../../shared';
import { MsgBlock } from '../MsgBlock';

type Props = {
  character: Character | null;
  _onClick: () => void;
};

export function ItemDetails({ character, _onClick }: Props) {
  return !character ? (
    <MsgBlock
      title="No chosen character"
      msg="Please choose a character to learn more about them"
      isItemDetails={true}
    />
  ) : (
    <div className="w-2/3 relative pb-6 px-6">
      <button
        onClick={_onClick}
        className="absolute right-6 text-gray-500 hover:text-rose-800 text-xl transition-colors"
      >
        X
      </button>
      <h2 className="text-xl font-bold text-rose-800 mb-4 border-b border-rose-800 pb-2">
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
