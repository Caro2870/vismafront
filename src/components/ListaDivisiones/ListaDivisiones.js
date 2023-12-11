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
    onFilter: (value, record) => record.nombre.indexOf(value) === 0,

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
  const [tableParamsString, setTableParamsString] = useState({
    pagination: {
      current: 1,
      pageSize: 10,

    },
  });

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
            pageSize: response.data.divisiones.per_page,
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
    // eslint-disable-next-line
  }, [searchValue, tableParamsString]);

  if (!divisiones) {
    return <div>Cargando datos...</div>;
  }

  const updatedColumns = columns.map((column) => {
    const dataIndexString = String(column.dataIndex);
    console.log(dataIndexString);

    if (dataIndexString === 'nombre' || dataIndexString === 'division_superior_nombre' || dataIndexString === 'nivel') {
      const uniqueValues = Array.from(new Set(divisiones.map((item) => String(item[dataIndexString]))));
      console.log(uniqueValues);
      return {
        ...column,
        filters: uniqueValues.map((value) => ({ text: value === 'null' ? 'Sin nivel superior' : value, value: value === 'null' ? 'Sin nivel superior' : value })),

        onFilter: (value, record) => {

          const recordValue = String(record[dataIndexString]) === 'null' ? 'Sin nivel superior' : String(record[dataIndexString]);

          // Validación y filtrado sin sensibilidad a mayúsculas y minúsculas, y aplicando trim solo a 'nombre' y 'division_superior_nombre'
          return typeof recordValue === 'string' &&
            recordValue.trim().toLowerCase().includes(String(value).trim().toLowerCase());
        },
      };
    }
    return column;
  });






  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    setTableParamsString(JSON.stringify(tableParams))

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== divisiones.pagination?.pageSize) {
      setDivisiones([]);
    }
  };
  return (
    <div className='table-container'>
      <Table



        rowKey={(record) => record.id}

        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={updatedColumns}
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
