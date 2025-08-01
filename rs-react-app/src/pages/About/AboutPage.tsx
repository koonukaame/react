import { Link } from 'react-router';

export const About = () => {
  return (
    <main
      className="flex flex-col items-center justify-center min-h-[80vh]"
      data-testid="about-page"
    >
      <h1 className="text-9xl font-extrabold text-rose-700/80 mb-6 tracking-wide">
        About
      </h1>
      <p className="mb-10 text-2xl text-rose-900 max-w-2xl leading-relaxed text-center">
        My GitHub:{' '}
        <Link
          className="font-semibold text-pink-700 underline underline-offset-2 hover:text-pink-900 transition-colors duration-200"
          to="https://github.com/koonukaame"
          target="_blank"
          rel="noreferrer"
        >
          koonukaame
        </Link>
      </p>
      <p className="absolute bottom-6 text-2xl text-rose-900 max-w-2xl leading-relaxed text-center">
        made in{' '}
        <Link
          to="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-pink-700 underline underline-offset-2 hover:text-pink-900 transition-colors duration-200"
        >
          Rolling Scopes School
        </Link>
      </p>
    </main>
  );
};
