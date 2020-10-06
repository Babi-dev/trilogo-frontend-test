import React from 'react';
import { PlusOutlined } from '@ant-design/icons';

import Logo from 'assets/logo.svg';

import styles from './Header.module.css';

function Header({ openModal }) {
  return (
    <header className={styles.header}>
      <img src={Logo} alt="" />
      <button type="button" className={styles.button} onClick={openModal}>
        <PlusOutlined className={styles.icon} />
        Novo ticket
      </button>
    </header>
  );
}

export default Header;
