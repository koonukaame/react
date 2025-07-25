import { RedirectBtn } from '../../components';

export function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-9xl font-extrabold text-rose-700/80 mb-6 tracking-wide">
        About
      </h1>
      <p className="mb-10 text-2xl text-rose-900 max-w-2xl leading-relaxed text-center">
        The only thing about me you really need to know?{' '}
        <a
          className="font-semibold text-pink-700 underline underline-offset-2 hover:text-pink-900 transition-colors duration-200"
          href="https://github.com/koonukaame"
          target="_blank"
          rel="noreferrer"
        >
          My GitHub
        </a>
        . That’s it. Proceed accordingly.
      </p>
      <RedirectBtn url="/" locationText="Back to Main Page" />
      <p className="absolute bottom-6 text-2xl text-rose-900 max-w-2xl leading-relaxed text-center">
        made in{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-pink-700 underline underline-offset-2 hover:text-pink-900 transition-colors duration-200"
        >
          Rolling Scopes School
        </a>
      </p>
    </div>
  );
}
