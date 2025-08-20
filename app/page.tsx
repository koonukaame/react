import { redirect } from '../src/i18n';
import './globals.css';

export default function Page() {
  redirect({
    href: '/character',
    locale: 'en',
  });
}
