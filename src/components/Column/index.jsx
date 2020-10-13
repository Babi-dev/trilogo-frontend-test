import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';

import { putTicketMove } from 'store/reducers/tickets.reducer';

import styles from './Column.module.css';

function Column({ title, colorHeader, children, id }) {
  const dispatch = useDispatch();

  const [visibleModalMove, setVisibleModalMove] = useState(false);
  const [status, setStatus] = useState('');
  const [cardId, setCardId] = useState(0);

  const handleModalMove = useCallback(() => {
    if (visibleModalMove) {
      setVisibleModalMove(false);
    } else {
      setVisibleModalMove(true);
    }
  }, [visibleModalMove]);

  const handleMove = useCallback(() => {
    const params = { id: cardId, status };

    dispatch(putTicketMove(params));
    handleModalMove();
  }, [status, cardId, handleModalMove, dispatch]);

  const drop = useCallback(
    event => {
      event.preventDefault();
      const card_id = event.dataTransfer.getData('card_id');
      const statusCard = event.dataTransfer.getData('status');

      setStatus(statusCard);
      setCardId(Number(card_id));

      if (statusCard === id) {
        handleModalMove();
      }
    },
    [id, handleModalMove],
  );

  const dragOver = useCallback(event => {
    event.preventDefault();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <header
          style={{ backgroundColor: colorHeader }}
          className={styles.header_column}
        >
          <span className={styles.title}>{title}</span>
        </header>
        <section
          id={id}
          onDrop={drop}
          onDragOver={dragOver}
          className={styles.content}
        >
          {children}
        </section>
      </div>

      <Modal
        visible={visibleModalMove}
        title="Alterar status"
        onCancel={handleModalMove}
        footer={[
          <button
            key="button"
            className={styles.button_modal_cancel}
            type="button"
            onClick={handleModalMove}
          >
            Cancelar
          </button>,
          <button
            key="submit"
            type="submit"
            className={styles.button_modal}
            onClick={handleMove}
          >
            Mover
          </button>,
        ]}
      >
        <span>
          Você tem certeza que deseja mover o ticket
          <span style={{ color: '#4C12A1' }}>{` ${cardId} `}</span>
          para a coluna de
          <span style={{ color: '#D4662D' }}>{''.concat(' ', status)}</span>?
        </span>
      </Modal>
    </>
  );
}

export default Column;
