import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axiosInstance from '../../services/axiosInstance';

const columns = [
  {
    title: 'Division',
    dataIndex: 'nombre',
    key: 'nombre',
    filters: [],
    sorter: (a, b) => a.nombre.localeCompare(b.nombre),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Division Superior',
    dataIndex: 'division_superior_nombre',
    key: 'division_superior_nombre',
    sorter: (a, b) => a.division_superior_nombre.localeCompare(b.division_superior_nombre),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Colaboradores',
    dataIndex: 'colaboradores',
    key: 'colaboradores',
    sorter: (a, b) => a.colaboradores - b.colaboradores,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Nivel',
    dataIndex: 'nivel',
    key: 'nivel',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.nivel - b.nivel,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Subdivisiones',
    dataIndex: 'subdivisiones',
    key: 'subdivisiones',
    sorter: (a, b) => a.subdivisiones - b.subdivisiones,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Embajador Nombre',
    dataIndex: 'embajador_nombre',
    key: 'embajador_nombre',
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
};

const ListaDivisiones = ({ searchValue, selectedValue }) => {
  const [selectionType] = useState('checkbox');
  const [divisiones, setDivisiones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
     
    },
  });
  const fetchData = () => {
    setLoading(true);


    const url = `/divisiones/listar?per_page=${tableParams.pagination.pageSize}&page=${tableParams.pagination.current}&search=${searchValue}&column=${selectedValue}`;

    axiosInstance
      .get(url)
      .then((response) => {
     
        setDivisiones(response.data.divisiones.data);
        setTableParams({
          ...tableParams,
          pagination: {
            current: response.data.divisiones.current_page,
            pageSize :response.data.divisiones.per_page,
            total: response.data.divisiones.total,
          },
        });

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al hacer la solicitud:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(); // Corregir aquí
  }, [searchValue,JSON.stringify(tableParams)]);

  if (!divisiones) {
    return <div>Cargando datos...</div>;
  }
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== divisiones.pagination?.pageSize) {
      setDivisiones([]);
    }
  };
  return (
    <div>
      <Table



            rowKey={(record) => record.id}

        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={divisiones}
        pagination={tableParams.pagination}
        loading={loading}
         onChange={handleTableChange}

         scroll={{
          y: 450,
        }}
      />
    </div>
  );
};

export default ListaDivisiones;
