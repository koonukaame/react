import type { AppDispatch, RootState } from '@app';
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';

export const useFormsDispatch = () => useDispatch<AppDispatch>();
export const useFormsSelector: TypedUseSelectorHook<RootState> = useSelector;
