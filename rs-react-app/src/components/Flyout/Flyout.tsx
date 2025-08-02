import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app';
import { unselectAll } from '../../features';
import { useState } from 'react';

export const Flyout = () => {
  const characters = useSelector((state: RootState) => state.select);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

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
    <div
      className="fixed flex flex-col-reverse gap-3 left-6 bottom-6 rounded-xl p-3 bg-white text-white border border-gray-200"
      data-testid="flyout"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-center items-center gap-2">
        <span className="text-gray-700 font-medium text-center">
          {`${characters.length} `}
          {characters.length === 1 ? 'item is ' : 'items are '}selected
        </span>
        <span className="text-sm text-gray-700">{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div className="flex gap-2 flex-col">
          <button
            onClick={() => dispatch(unselectAll())}
            className="bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-rose-200 transition"
          >
            Unselect All
          </button>
          <a
            href={handleDownload()}
            download={`${characters.length}_item${characters.length !== 1 ? 's' : ''}.csv`}
            data-testid="download-file"
            className="bg-rose-700/80 hover:bg-rose-800 text-white text-sm font-semibold px-4 py-2 rounded-xl transition text-center"
          >
            Download CSV
          </a>
        </div>
      )}
    </div>
  ) : null;
};
