import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app';
import { unselectAll } from '../../features';

export const Flyout = () => {
  const characters = useSelector((state: RootState) => state.select);
  const dispatch = useDispatch();

  const handleDownload = () => {
    const headers = Object.keys(characters[0] || {}).join(', ');

    const formattedData = characters.map((item) =>
      Object.values(item)
        .map((value) => (value === null ? 'Unknown' : value))
        .join(', ')
    );

    const csv = [headers, formattedData].join('\n');

    const blob = new Blob([csv], {
      type: 'text/csv',
    });

    return URL.createObjectURL(blob);
  };

  return characters.length > 0 ? (
    <div className="fixed left-6 bottom-6">
      <div>
        {`${characters.length} `}
        {characters.length === 1 ? 'item is ' : 'items are '}selected
      </div>
      <div className="flex gap-2 flex-col">
        <button>
          <a
            href={handleDownload()}
            download={`${characters.length}_item${characters.length !== 1 ? 's' : ''}.csv`}
          >
            Download CSV
          </a>
        </button>
        <button onClick={() => dispatch(unselectAll())}>Unselect All</button>
      </div>
    </div>
  ) : null;
};
