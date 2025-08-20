import { redirect } from '../src/i18n';

export default function Page() {
  redirect({
    href: '/character',
    locale: 'en',
  });
}
