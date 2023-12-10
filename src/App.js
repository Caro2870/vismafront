import React, { useState,useEffect } from 'react';
import { Row, Col, Tabs, Radio, Space, Avatar, Select, Input } from 'antd';
import ListaDivisiones from './components/ListaDivisiones/ListaDivisiones.js';
import './App.less';
import LogoSvg from './components/svg/LogoSvg.js';
import FlechaAbajoSvg from './components/svg/FlechaAbajoSvg.js';
import BolsaSvg from './components/svg/BolsaSvg.js';
import NotificacionSvg from './components/svg/NotificacionSvg.js';
import LogoBlancoSvg from './components/svg/LogoBlancoSvg.js';
import SubidaSvg from './components/svg/SubidaSvg.js';
import BajadaSvg from './components/svg/BajadaSvg.js';
import BotonSvg from './components/svg/BotonSvg.js';
import LupaSvg from './components/svg/LupaSvg.js';
import columns from './components/ListaDivisiones/fields.js';

const App = () => {
  const [tabPosition, setTabPosition] = useState('listado');
  const [clickedKey, setAdditionalData] = useState('3');

  const [searchValue, setSearchValue] = useState('');

  const [selectedValue, setSelectedValue] = useState(null);

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const onChangeSelect = (value) => {
    setSelectedValue(value);
    console.log(`Selected value: ${value}`);
    // Puedes realizar otras acciones con el valor seleccionado si es necesario
  };
  const onSearchSelect = (value) => {
    console.log('search:', value);
  };

  const onChange = (key) => {
  };


  useEffect(() => {
    console.log('searchValue:');
  }, []);


  const menuItems = [
    { id: 'dashboard', key: '1', label: 'Dashboard', onClick: () => onWordClick('1'), haveIcon: false },
    { id: 'organizacion', key: '2', label: 'Organización', onClick: () => onWordClick('2'), haveIcon: false },
    { id: 'modelos', key: '3', label: 'Modelos', onClick: () => onWordClick('3'), haveIcon: true },
    { id: 'seguimiento', key: '4', label: 'Seguimiento', onClick: () => onWordClick('4'), haveIcon: true },
  ];

  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  const items = [
    {
      key: '1',
      label: 'Divisiones',
      children: (
        <React.Fragment>
          <Row>
            <Col span={12}>
              {/* Contenido del primer Col */}
              <Radio.Group value={tabPosition} onChange={changeTabPosition}>
                <Radio.Button value="listado">Listado</Radio.Button>
                <Radio.Button value="arbol">Árbol</Radio.Button>
              </Radio.Group>
            </Col>
            <Col span={12}>
              <div className="my-flex-container">
                {/* Contenido del segundo Col */}
                <Select
                  showSearch
                  placeholder="Columnas"
                  optionFilterProp="children"
                  onChange={onChangeSelect}
                  onSearch={onSearchSelect}
                  filterOption={filterOption}
                  options={columns}
                />
                <Input
                  placeholder="Buscar"
                  className="search-input"
                  suffix={<LupaSvg style={{ color: 'rgba(0,0,0,.45)' }} />}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </Col>
          </Row>

          {tabPosition === 'listado' && (
            <ListaDivisiones searchValue={searchValue} selectedValue={selectedValue} />
          )}
          {/* Agrega otras condiciones según sea necesario para diferentes tabs y modos */}
        </React.Fragment>
      ),
    },
    {
      key: '2',
      label: 'Colaboradores',
    },
  ];
  const onWordClick = (e) => {
    setAdditionalData(e);
  };

  const getContent = () => {
    if (clickedKey === '2') {
      return (
        <React.Fragment >

          <div className='container'>

            <div className='my-flex-container-between'>
              <span className='my-title'>Organización</span>
              <div >
                <BotonSvg />
                <BajadaSvg />
                <SubidaSvg />

              </div>
            </div>

            <Tabs defaultActiveKey="1" items={items} onChange={onChange}>

            </Tabs>
          </div>
        </React.Fragment>
      );
    } else {
      return <span>Vacío</span>;
    }
  };

  return (
    <div>
      <Row className="row-background">
        <Col span={12}  >
          <Space align="center" className="hoverable">
            <LogoBlancoSvg />
            {menuItems.map((item) => (
              <React.Fragment key={item.id}>
                <div className={` ${clickedKey === item.key ? 'selected-tab' : ''}`}>
                  <span
                    className={`menu-item ${clickedKey === item.key ? '' : ''}`}
                    onClick={() => {
                      item.onClick();
                    }}
                  >
                    {item.label}
                  </span>
                </div>
                {item.haveIcon && <FlechaAbajoSvg />}
              </React.Fragment>
            ))}
          </Space>
        </Col>


        <Col span={12} className="my-flex-container">
          <Space align="center" >
            <div className='my-divider'>
              <BolsaSvg />
            </div>

            <div className='my-divider'>
              <BolsaSvg />
            </div>
            <div className='my-divider'>
              <NotificacionSvg />
            </div>

            <a href="https://ant.design">
              <Avatar className='my-avatar'>A</Avatar>
            </a>
            <span className="my-name">Administrador</span>
            <div className="my-flecha" >
              <FlechaAbajoSvg />
            </div>

            <div className="my-logo" >
              <LogoSvg />
            </div>
          </Space>
        </Col>
      </Row>
      {getContent()}
    </div>
  );
};

export default App;