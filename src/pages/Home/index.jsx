import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Input, Select, Upload, Row, Col } from 'antd';
import { LoadingOutlined, InboxOutlined } from '@ant-design/icons';

import { postTicket, getTickets } from 'store/reducers/tickets.reducer';

import Header from 'components/Header';//eslint-disable-line
import Column from 'components/Column';//eslint-disable-line
import Card from 'components/Card';//eslint-disable-line

import styles from './Home.module.css';

function Home() {
  const dispatch = useDispatch();
  const { Dragger } = Upload;
  const { Option } = Select;

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [responsible, setResponsible] = useState('');
  const [image, setImage] = useState(null);

  const { tickets } = useSelector(({ Tickets }) => Tickets);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  const handleSubmitForm = useCallback(() => {
    const params = {
      description,
      type,
      responsible,
      image: image ? image[0] : null,
    };
    dispatch(postTicket(params));
  }, [description, type, responsible, image, dispatch]);

  const showModal = useCallback(() => {
    setVisible(true);
  }, []);

  const handleOk = useCallback(() => {
    setLoading(true);
    handleSubmitForm();

    setTimeout(() => {
      setVisible(false);
      setLoading(false);
    }, 3000);
  }, [handleSubmitForm]);

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const props = {
    name: 'file',
    multiple: false,
    action: false,
    onChange(info) {
      const urlImg = getBase64(info.file.originFileObj);
      setImage(urlImg);
    },
  };

  const getBase64 = useCallback(file => {
    const reader = new FileReader();
    const urlImg = [];

    reader.onloadend = () => urlImg.push(reader.result);

    if (file) reader.readAsDataURL(file);

    return urlImg;
  }, []);

  return (
    <main className={styles.main}>
      <Header openModal={showModal} />
      <section className={styles.container}>
        <Row>
          <Col span={6}>
            <Column id="open" title="Abertos" colorHeader="#FCC8CB">
              {tickets &&
                tickets.map(ticket => {
                  return (
                    ticket.status === 'open' && (
                      <Card
                        key={ticket.id}
                        id={ticket.id}
                        data={ticket}
                        draggable="true"
                      />
                    )
                  );
                })}
            </Column>
          </Col>
          <Col span={6}>
            <Column id="executed" title="Executados" colorHeader="#F8D8C7">
              {tickets &&
                tickets.map(ticket => {
                  return (
                    ticket.status === 'executed' && (
                      <Card
                        key={ticket.id}
                        id={ticket.id}
                        data={ticket}
                        draggable="true"
                      />
                    )
                  );
                })}
            </Column>
          </Col>
          <Col span={6}>
            <Column id="inspected" title="Vistoriados" colorHeader="#D4F0C6">
              {tickets &&
                tickets.map(ticket => {
                  return (
                    ticket.status === 'inspected' && (
                      <Card
                        key={ticket.id}
                        id={ticket.id}
                        data={ticket}
                        draggable="true"
                      />
                    )
                  );
                })}
            </Column>
          </Col>
          <Col span={6}>
            <Column id="filed" title="Arquivados" colorHeader="#EFEDED">
              {tickets &&
                tickets.map(ticket => {
                  return (
                    ticket.status === 'filed' && (
                      <Card
                        key={ticket.id}
                        id={ticket.id}
                        data={ticket}
                        draggable="true"
                      />
                    )
                  );
                })}
            </Column>
          </Col>
        </Row>
      </section>

      <Modal
        visible={visible}
        title="Novo ticket"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <button
            key="submit"
            className={styles.button_modal}
            type="button"
            onClick={handleOk}
          >
            {loading && <LoadingOutlined className={styles.icon} />}
            Criar ticket
          </button>,
        ]}
      >
        <p className={styles.title_inputs}>
          Descrição
          <small style={{ color: 'red' }}>*</small>
        </p>
        <Input
          placeholder="Input"
          onChange={({ target }) => setDescription(target.value)}
        />
        <p className={styles.title_inputs}>
          Tipo
          <small style={{ color: 'red' }}>*</small>
        </p>
        <Select
          placeholder="Menu"
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
          style={{ width: '100%' }}
          onChange={value => setResponsible(value)}
        >
          <Option value="Yudi Tamashiro">Yudi Tamashiro</Option>
          <Option value="Priscilla Alcantara">Priscilla Alcantara</Option>
        </Select>
        <p className={styles.title_inputs}>Imagem</p>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ color: '#4C12A1' }} />
          </p>
          <p className={styles.description_upload}>
            Arraste uma imagem para anexar ao ticket
          </p>
        </Dragger>
      </Modal>
    </main>
  );
}

export default Home;
