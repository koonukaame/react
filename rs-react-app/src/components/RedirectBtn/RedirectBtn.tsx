import { useNavigate } from 'react-router';
import { BTN_STYLES } from '../../shared';

type Props = {
  url: string;
  locationText: string;
};

export function RedirectBtn({ url, locationText }: Props) {
  const navigate = useNavigate();

  function _onClick() {
    navigate(url);
  }

  return (
    <button
      onClick={_onClick}
      className={BTN_STYLES}
    >{`Back to ${locationText}`}</button>
  );
}
