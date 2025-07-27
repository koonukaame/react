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
      msg="Please click on a character to learn more"
      isItemDetails={true}
    />
  ) : (
    <div className="w-2/3 relative pb-6 px-6" data-testid="item-details">
      <div className="flex w-full justify-between border-b border-rose-800 pb-2">
        <h2 className="text-xl font-bold text-rose-800" data-testid="char-name">
          {character.name}
        </h2>
        <button
          onClick={_onClick}
          className="w-5 cursor-pointer mt-1 group"
          data-testid="item-details-close"
        >
          <div className="w-full h-0.5 bg-gray-500 rotate-45 group-hover:bg-rose-800 transition-colors" />
          <div className="w-full h-0.5 bg-gray-500 -rotate-45 -mt-0.5 group-hover:bg-rose-800 transition-colors" />
        </button>
      </div>

      <ul className="space-y-2 pt-2">
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
