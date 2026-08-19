import Link from 'next/link';
import about from '../data/about';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{about.eyebrow}</p>
          <h2 className={styles.heading}>{about.heading}</h2>

          {about.paragraphs.map((paragraph, index) => (
            <p key={index} className={styles.body}>
              {paragraph}
            </p>
          ))}

          <Link href="/#contact" className={styles.cta}>
            Get in touch →
          </Link>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.links}>
            <a 
              href="/emmanuel-ajala-resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.linkItem}
            >
              Resume
            </a>
            
            <a
              href="https://github.com/manofvalour"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkItem}
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/emmanuelaj"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkItem}
            >
              LinkedIn
            </a>
          </div>

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
           <div className={styles.currently}>
            <p className={styles.currentlyLabel}>{about.toolsLabel}</p>
            <ul className={styles.topics}>
              {about.tools.map((tool) => (
                <li key={tool} className={styles.topic}>
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        
        </div>
      </div>
    </section>
  );
}