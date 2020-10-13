import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Menu, Dropdown, Modal, Select, Input } from 'antd';

import { deleteTicket, putTicket } from 'store/reducers/tickets.reducer';

import optionImg from 'assets/options.svg';

import { newStatusMove } from 'utils/functions';
import styles from './Card.module.css';

function Card({ data, draggable }) {
  const dispatch = useDispatch();
  const { Option } = Select;

  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);

  const [description, setDescription] = useState(data.description);
  const [type, setType] = useState(data.type);
  const [responsible, setResponsible] = useState(data.responsible);

  const handleModalDelite = useCallback(() => {
    if (visibleModalDelete) {
      setVisibleModalDelete(false);
    } else {
      setVisibleModalDelete(true);
    }
  }, [visibleModalDelete]);

  const handleDelite = useCallback(() => {
    dispatch(deleteTicket(data.id));
    handleModalDelite();
  }, [dispatch, handleModalDelite, data]);

  const handleModalEdit = useCallback(() => {
    if (visibleModalEdit) {
      setVisibleModalEdit(false);
    } else {
      setVisibleModalEdit(true);
    }
  }, [visibleModalEdit]);

  const handleEdit = useCallback(() => {
    const params = {
      id: data.id,
      description,
      type,
      responsible,
      status: data.status,
    };
    dispatch(putTicket(params));
    handleModalEdit();
  }, [handleModalEdit, description, type, responsible, data, dispatch]);

  const dragStart = useCallback(
    event => {
      const { target } = event;
      const status = newStatusMove(data.status);

      event.dataTransfer.setData('card_id', target.id);
      event.dataTransfer.setData('status', status);
    },
    [data],
  );

  const dragOver = useCallback(event => {
    event.stopPropagation();
  }, []);

  const menu = (
    <Menu style={{ borderRadius: '8px', width: '130px' }}>
      <Menu.Item>
        <button type="button" onClick={handleModalEdit}>
          Editar
        </button>
      </Menu.Item>
      <Menu.Item>
        <button type="button" onClick={handleModalDelite}>
          Excluir
        </button>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div
        id={data.id}
        className={styles.container_card}
        draggable={draggable}
        onDragStart={dragStart}
        onDragOver={dragOver}
      >
        <img src={data.image} alt="" />

        <div className={styles.badge}>
          <span>{data.type}</span>
        </div>

        <span>{data.id}</span>
        <small>{data.description}</small>

        <div className={styles.content_options}>
          <span>{data.responsible}</span>
          <Dropdown overlay={menu}>
            <button type="button" onClick={event => event.preventDefault()}>
              <img src={optionImg} alt="" />
            </button>
          </Dropdown>
        </div>
      </div>

      <Modal
        visible={visibleModalDelete}
        title="Deletar ticket"
        onCancel={handleModalDelite}
        footer={[
          <button
            key="button"
            className={styles.button_modal_cancel}
            type="button"
            onClick={handleModalDelite}
          >
            Cancelar
          </button>,
          <button
            key="submit"
            type="submit"
            className={styles.button_modal}
            onClick={handleDelite}
          >
            Deletar
          </button>,
        ]}
      >
        <span>
          Você tem certeza que deseja deletar o ticket
          <span style={{ color: '#4C12A1' }}>{` ${data.id} `}</span>?
        </span>
      </Modal>

      <Modal
        visible={visibleModalEdit}
        title="Editar ticket"
        onCancel={handleModalEdit}
        footer={[
          <button
            key="submit"
            className={styles.button_modal}
            type="button"
            onClick={handleEdit}
          >
            Editar
          </button>,
        ]}
      >
        <p className={styles.title_inputs}>
          Descrição
          <small style={{ color: 'red' }}>*</small>
        </p>
        <Input
          placeholder="Input"
          defaultValue={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <p className={styles.title_inputs}>
          Tipo
          <small style={{ color: 'red' }}>*</small>
        </p>
        <Select
          placeholder="Menu"
          defaultValue={type}
          style={{ width: '100%' }}
          onChange={value => setType(value)}
        >
          <Option value="Bem">Bem</Option>
          <Option value="Procedimento">Procedimento</Option>
          <Option value="Predial">Predial</Option>
        </Select>
        <p className={styles.title_inputs}>
          Responsável
          <small style={{ color: 'red' }}>*</small>
        </p>
        <Select
          placeholder="Menu"
          defaultValue={responsible}
          style={{ width: '100%' }}
          onChange={value => setResponsible(value)}
        >
          <Option value="Yudi Tamashiro">Yudi Tamashiro</Option>
          <Option value="Priscilla Alcantara">Priscilla Alcantara</Option>
        </Select>
      </Modal>
    </>
  );
}

export default Card;
