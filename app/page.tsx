/* eslint-disable react-refresh/only-export-components */
import { redirect } from 'next/navigation';
import './globals.css';

// export function generateStaticParams() {
//   return [{ slug: [''] }];
// }

export default function Page() {
  redirect('/character');
}
