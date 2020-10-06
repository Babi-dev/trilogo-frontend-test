import React from 'react';

import styles from './Column.module.css';

function Column({ title, colorHeader }) {
  return (
    <div className={styles.container}>
      <header
        style={{ backgroundColor: colorHeader }}
        className={styles.header_column}
      >
        <span className={styles.title}>{title}</span>
      </header>
      <section className={styles.content}>
        <span>Content</span>
      </section>
    </div>
  );
}

export default Column;
