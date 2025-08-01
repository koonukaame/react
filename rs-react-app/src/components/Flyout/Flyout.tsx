import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app';
import { unselectAll } from '../../features';

export const Flyout = () => {
  const uids = useSelector((state: RootState) => state.select);
  const dispatch = useDispatch();

  return uids.length > 0 ? (
    <div className="absolute left-0 bottom-0">
      <div>{uids.length} items are selected</div>
      <div className="flex gap-2 flex-col">
        <button>Download</button>
        <button onClick={() => dispatch(unselectAll())}>Unselect All</button>
      </div>
    </div>
  ) : null;
};
