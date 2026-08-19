import { useState } from 'react';
import styles from './Contacts.module.css';

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('submitting');

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...formData }),
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section className={styles.contact}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Contact</p>
          <h2 className={styles.heading}>Message sent</h2>
          <p className={styles.body}>Thanks — I'll get back to you soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Let&apos;s talk trade-offs</h2>
        <p className={styles.body}>
          If your team makes engineering decisions from evidence rather than intuition,
          I&apos;d like to hear what you&apos;re working on.
        </p>

        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <input type="hidden" name="form-name" value="contact" />

          <p className={styles.honeypot}>
            <label>
              Don&apos;t fill this out: <input name="bot-field" onChange={handleChange} />
            </label>
          </p>

          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <input
            className={styles.input}
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.input}
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <label className={styles.label} htmlFor="message">
            Message
          </label>
          <textarea
            className={styles.textarea}
            id="message"
            name="message"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
          />

          <button className={styles.button} type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Send'}
          </button>

          {status === 'error' && (
            <p className={styles.error}>Something went wrong. Try again, or email me directly.</p>
          )}
        </form>
      </div>
    </section>
  );
}