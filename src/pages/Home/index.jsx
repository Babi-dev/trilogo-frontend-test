import React, { useState, useCallback } from 'react';
import { Modal, Input, Select, Upload, message, Row, Col } from 'antd';
import { LoadingOutlined, InboxOutlined } from '@ant-design/icons';

import Header from 'components/Header';//eslint-disable-line
import Column from 'components/Column';//eslint-disable-line

import styles from './Home.module.css';

function Home() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = useCallback(() => {
    setVisible(true);
  }, []);

  const handleOk = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      setVisible(false);
      setLoading(false);
    }, 3000);
  }, []);

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const { Dragger } = Upload;

  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <main className={styles.main}>
      <Header openModal={showModal} />
      <section className={styles.container}>
        <Row>
          <Col span={6}>
            <Column title="Abertos" colorHeader="#FCC8CB" />
          </Col>
          <Col span={6}>
            <Column title="Executados" colorHeader="#F8D8C7" />
          </Col>
          <Col span={6}>
            <Column title="Vistoriados" colorHeader="#D4F0C6" />
          </Col>
          <Col span={6}>
            <Column title="Arquivados" colorHeader="#EFEDED" />
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
        <Input placeholder="Input" />
        <p className={styles.title_inputs}>
          Tipo
          <small style={{ color: 'red' }}>*</small>
        </p>
        <Select placeholder="Menu" style={{ width: '100%' }} />
        <p className={styles.title_inputs}>
          Responsável
          <small style={{ color: 'red' }}>*</small>
        </p>
        <Select placeholder="Menu" style={{ width: '100%' }} />
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
