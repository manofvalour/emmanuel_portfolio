import about from '../data/about';
import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>{about.eyebrow}</p>
        <h2 className={styles.heading}>{about.heading}</h2>

        {about.paragraphs.map((paragraph, index) => (
          <p key={index} className={styles.body}>
            {paragraph}
          </p>
        ))}

        <div className={styles.currently}>
          <p className={styles.currentlyLabel}>{about.currentlyLabel}</p>
          <ul className={styles.topics}>
            {about.currentTopics.map((topic) => (
              <li key={topic} className={styles.topic}>
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}