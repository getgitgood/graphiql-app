import './Welcome.scss';

export const Welcome = () => {
  return (
    <>
      <header className="welcome_header">
        <h1>Welcome to Our Project</h1>
        <p>by LuckyCoders</p>
      </header>
      <section className="about">
        <h2>About the Project</h2>
        <p>Here goes some information about the project...</p>
        <h2>About the Developers</h2>
        <p>Meet our talented team of developers...</p>
        <h2>About the Course</h2>
        <p>Information about the course goes here...</p>
      </section>
    </>
  );
};
