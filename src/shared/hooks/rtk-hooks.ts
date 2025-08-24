import type { AppDispatch, RootState } from '@app';
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';

export const useMainDispatch = () => useDispatch<AppDispatch>();
export const useMainSelector: TypedUseSelectorHook<RootState> = useSelector;
