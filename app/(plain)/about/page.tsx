// eslint-disable-next-line react-refresh/only-export-components
export const dynamic = 'force-static';

export default function AboutPage() {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <hgroup>
        <h1>About This Application</h1>
        <p>Learn more about the project and its creator.</p>
      </hgroup>

      <div className="grid">
        <article>
          <header>
            <h3>The App</h3>
          </header>
          <p>
            This application was built as part of an education program at a
            React course in RS School.
          </p>
          <footer>
            <a href="https://rs.school/courses/reactjs">React course at RS School</a>
          </footer>
        </article>

        <article>
          <header>
            <h3>The Author</h3>
          </header>
          <p>
            Hello! I am a student at RS School, trying to improve my front-end
            skills and build deeper understanding of web development and the
            world of IT in general.
          </p>
          <footer>
            <a href="https://discord.com/users/567354113365639189">My Discord</a>
          </footer>
        </article>
      </div>
    </div>
  );
}