import footerLinks from '../data/footerLinks';
import { LinkedInIcon, GitHubIcon, MailIcon, DocumentIcon } from './icons';
import styles from './Footer.module.css';

const iconMap = {
  mail: MailIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  document: DocumentIcon,
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.brand}>E. AJALA / ML SYSTEMS</p>
        <p className={styles.stack}>Built with Next.js, CSS</p>

        <ul className={styles.links}>
          {footerLinks.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className={styles.iconLink}
                >
                  <Icon className={styles.icon} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}