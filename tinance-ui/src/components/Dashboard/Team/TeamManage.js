import React, { Component } from 'react';
import { Row, Col, Form, Label, Modal, ModalBody, ModalHeader, FormGroup } from 'reactstrap';

import { Table, Input, Button, Space, DatePicker, Popconfirm, Tag } from 'antd';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

import Select from 'react-select';
// import { TreeSelect } from 'antd';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { CirclePicker } from 'react-color'
import { connect } from 'react-redux'
import { addPosition, loadPosition, addDepartment, loadDepartment, getCenterData, getAgreementsData, getScheduleData, getCalendarData } from "../../../redux/actions/superAdmin"
import { addPerson, loadEmployees, deletePerson, updatePerson, suspendPerson } from '../../../redux/actions/auth/loginActions';
import { Root } from '../../../config/rootConfig';

class TeamManage extends Component {
    constructor() {
        super();
        this.state = {
            columns: [
                {
                    title: 'Nombre',
                    dataIndex: 'name',
                    width: '30%',
                    ...this.getColumnSearchProps('name'),
                    render: function (text, record, index) {
                        return(
                            <span key={index}>{record.firstName + " " + record.lastName}</span>
                        )
                    }
                },
                {
                    title: 'ID',
                    dataIndex: 'key',
                    key: 'id',
                    width: '20%',
                    ...this.getColumnSearchProps('id'),
                },
                {
                    title: 'Departamento',
                    dataIndex: 'department',
                    key: 'department',
                    ...this.getColumnSearchProps('department')
                },
                {
                    title: 'Posición',
                    dataIndex: 'position',
                    key: 'position',
                    ...this.getColumnSearchProps('position'),
                },
                {
                    title: 'Centrar',
                    dataIndex: 'centers',
                    key: 'centers',
                    ...this.getColumnSearchProps('centers'),
                },
                {
                    title: 'Papel',
                    dataIndex: 'role',
                    key: 'role',
                    ...this.getColumnSearchProps('role'),
                },
                {
                    title: 'Estado',
                    dataIndex: 'status',
                    key: 'status',
                    render: (_, record) => record.allowed ? (
                        <Tag color="green">Permitida</Tag>
                    ) : (
                        <Tag color="volcano">Suspendida</Tag>
                    )
                },
                {
                    title: 'Acción',
                    dataIndex: 'action',
                    key: 'action',
                    fixed: 'right',
                    width: 100,
                    render: (_, record) => record.role !== 'Administrador' ? (
                        <Space>
                            <Popconfirm title={record.allowed ? "Seguro que suspender?" : "Seguro que lo permitirás?"} onConfirm={() => this.handleSuspendPerson(record.key, record.allowed ? false : true)}>
                                <a href="dashboard-team#">{record.allowed ? "Suspender" : "Permitir"}</a>
                            </Popconfirm>
                            <a href="dashboard-team#" onClick={() => this.onEdit(record.key)}>Edit</a>
                            <Popconfirm title="Seguro que quieres eliminar?" onConfirm={() => this.handleDeletePerson(record.key)}>
                                <a href="dashboard-team#">Eliminar</a>
                            </Popconfirm>
                        </Space>
                    ) : null,
                }
            ],

            isSelectedRow: false,
            empTableLoading: true,
            formatDate: "yyyy-MM-DD",
            edit: false,

            // Employee Data
            rows : [],

            // search Employee Data
            searchEmployeeData : [],

            // position Data
            positionData : [],
            positionName: "",
            selectedPositionColor: "#f44336",
            
            // modal Bool Var
            isOpenPositionModal: false,
            isOpenDepartmentModal: false,
            isOpenModal: false,

            // responsable data
            responsableData: [],

            // centers data
            centersData: [],
            
            // calendar data
            calendarData: [],
            
            // agreement data
            agreementsData: [
                { value: "nobusiness", label: "nobusiness" }
            ],
            
            // schedule data
            scheduleData: [
                { value: "nobusiness", label: "nobusiness" }
            ],
            
            // department data
            departmentData: [],
            departmentName: "",
            pDepartment: "",
            selectedDepartmentColor: "#f44336",
            selectedPDepartment: "",

            // person data
            user_id: "",
            firstName: "",
            lastName: "",
            email: "",
            birthDay: null,
            position: {},
            department: {},
            role: Root.userRoles[1],
            responsable: {},
            centers: {},
            calendar: {},
            agreement: {},
            schedule: {},
            startDay: null,
            endDay: null,

            // company data
            companyData: {}
        }
    }

    // onChange = e => {
    //     if (e&&e.length > 0) {
    //         let rows = [];
    //         for (let i = 0; i < this.props.employeeData.length; i++) {
    //             for (let j = 0; j < e.length; j++) {
    //                 if (this.props.employeeData[i]._id === e[j].value) {
    //                     rows.push(this.props.employeeData[i]);
    //                 }
    //             }
    //         }
    //         this.setRow(rows, this.state.positionData, this.state.departmentData)
    //     } else {
    //         this.setRow(this.props.employeeData, this.state.positionData, this.state.departmentData)
    //     }
    // };

    handleDeletePerson = (key) => {
        this.props.deletePerson({id: key});
        // const dataSource = [...this.state.rows];
        // this.setState({
        //     rows: dataSource.filter((item) => item.key !== key),
        // });
    }

    handleSuspendPerson = (key, allowed) => {
        this.props.suspendPerson({id: key, allowed});
    }

    onEdit = key => {
        var editData;
        for (let i = 0; i < this.props.employeeData.length; i++) {
            if (this.props.employeeData[i]._id === key) {
                editData = this.props.employeeData[i];
            }
        }

        var responsableData = [];
        if (this.props.employeeData&&this.props.employeeData.length !== 0) {
            for (let i = 0; i < this.props.employeeData.length; i++) {
                let data = this.props.employeeData[i];
                let rObj = {}
                if ((data.role === 'admin' || data.role === 'manager') && data._id !== key) {
                    rObj.value = data._id
                    rObj.label = data.first_name + " " + data.last_name
                }
                responsableData.push(rObj);
            }
        }

        this.setState({responsableData})

        var depart ={};
        var position = {};
        var role = Root.userRoles[1];
        var center = {}
        var calendar = {}
        var agreement = {}
        var schedule = {};
        var responsable = {};

        for (let j = 0; j < this.state.departmentData.length; j++) {
            if (editData.department === this.state.departmentData[j].value) {
                depart = this.state.departmentData[j];
            }
        }
        for (let j = 0; j < this.state.positionData.length; j++) {
            if (editData.position === this.state.positionData[j].value) {
                position = this.state.positionData[j];
            }
        }
        for (let j = 0; j < this.state.centersData.length; j++) {
            if (editData.centers === this.state.centersData[j].value) {
                center = this.state.centersData[j];
            }
        }
        for (let j = 0; j < Root.userRoles.length; j++) {
            if (Root.userRoles[j].value === editData.role) {
                role = Root.userRoles[j];
            }
        }
        for (let j = 0; j < this.state.calendarData.length; j++) {
            if (this.state.calendarData[j].value === editData.calendar) {
                calendar = this.state.calendarData[j];
            }
        }
        for (let j = 0; j < this.state.agreementsData.length; j++) {
            if (this.state.agreementsData[j].value === editData.agreement) {
                agreement = this.state.agreementsData[j];
            }
        }
        for (let j = 0; j < this.state.scheduleData.length; j++) {
            if (this.state.scheduleData[j].value === editData.schedule) {
                schedule = this.state.scheduleData[j];
            }
        }
        for (let j = 0; j < this.state.responsableData.length; j++) {
            if (this.state.responsableData[j].value === editData.responsable) {
                responsable = this.state.responsableData[j];
            }
        }

        this.setState({
            user_id: editData._id,
            firstName: editData.first_name,
            lastName: editData.last_name,
            email: editData.email,
            birthDay: moment(editData.birthday, this.state.formatDate),
            position: position,
            department: depart,
            role: role,
            responsable: responsable,
            centers: center,
            calendar: calendar,
            agreement: agreement,
            schedule: schedule,
            startDay: moment(editData.start, this.state.formatDate),
            endDay: moment(editData.end, this.state.formatDate),
            edit: true,
        })

        this.modalToggle();
    }

    onChangePositionSelect = (e) => {
        this.setState({
            position: e
        })
    }

    onChangeDepartmentSelect = (e) => {
        this.setState({
            department: e
        })
    }
    
    onChangeRoleSelect = (e) => {
        this.setState({
            role: e
        })
    }

    onChangeResponseSelect = (e) => {
        this.setState({
            responsable: e
        })
    }
    
    onChangeCentersSelect = (e) => {
        this.setState({
            centers: e
        })
    }

    onChangeCalendarSelect = (e) => {
        this.setState({
            calendar: e
        })
    }
    
    onChangeAgreementSelect = (e) => {
        this.setState({
            agreement: e
        })
    }

    onChangeScheduleSelect = (e) => {
        this.setState({
            schedule: e
        })
    }
    
    onSChangeDepartmentSelect = (e) => {
        this.setState({
            selectedPDepartment: e
        })
    }

    modalToggle = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    handleBirthDayChange = (date, birthDay) => {
        this.setState({ birthDay })
    }
    
    handleStartDayChange = (date, startDay) => {
        this.setState({ startDay })
    }

    handleEndChange = (date, endDay) => {
        this.setState({ endDay })
    }

    positionModalToggle = () => {
        this.setState({
            isOpenPositionModal : !this.state.isOpenPositionModal
        })
    }
    
    departmentModalToggle = () => {
        this.setState({
            isOpenDepartmentModal : !this.state.isOpenDepartmentModal
        })
    }

    onChangePositionColor = (color) => {
        this.setState({ selectedPositionColor: color.hex })
    }
    
    onChangeDepartmentColor = (color) => {
        this.setState({ selectedDepartmentColor: color.hex })
    }

    handleSubmitPosition = (e) => {
        e.preventDefault();
        this.props.addPosition({name: this.state.positionName, color: this.state.selectedPositionColor});
        this.positionModalToggle();
    }

    handleSubmitDepartment = e => {
        e.preventDefault();
        this.props.addDepartment({name: this.state.departmentName, parentId: this.state.selectedPDepartment, color: this.state.selectedDepartmentColor});
        this.departmentModalToggle();
    }

    handleAddPersonSubmit = e => {
        e.preventDefault();
        var data = {
            id: this.state.companyData._id,
            user_id: this.state.user_id,
            firstName: this.state.firstName,
            lastName: this.state.lastName, 
            email: this.state.email, 
            birthDay: this.state.birthDay,
            position: this.state.position.value,
            department: this.state.department.value,
            role: this.state.role.value,
            responsable: this.state.responsable.value,
            centers: this.state.centers.value,
            calendar: this.state.calendar.value,
            agreement: this.state.agreement.value,
            schedule: this.state.schedule.value,
            startDay: this.state.startDay,
            endDay: this.state.endDay
        };

        this.state.edit ? this.props.updatePerson(data) : this.props.addPerson(data);

        this.modalToggle();
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    // ---------------------- Table ----------------------
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };
    
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    componentDidMount = () => {
        this.props.loadPosition();
        this.props.loadDepartment();
        this.props.loadEmployees({user_id: this.props.userData._id, company_id: this.props.companyData._id, role: this.props.userData.role});
        this.props.getCenterData();
        this.props.getCalendarData();
        this.props.getScheduleData();
        this.props.getAgreementsData();
    }

    setRow = (employeeData, pData, departmentData, centersData) => {
        var empData = []

        for (let i = 0; i < employeeData.length; i++) {
            let data = employeeData[i];
            let depart = "";
            let position = "";
            let role = "";
            let center = "";
            for (let j = 0; j < departmentData.length; j++) {
                if (data.department === departmentData[j].value) {
                    depart = departmentData[j].label;
                }
            }
            for (let j = 0; j < pData.length; j++) {
                if (data.position === pData[j].value) {
                    position = pData[j].label;
                }
            }
            for (let j = 0; j < centersData.length; j++) {
                if (data.centers === centersData[j].value) {
                    center = centersData[j].label;
                }
            }
            for (let j = 0; j < Root.userRoles.length; j++) {
                if (Root.userRoles[j].value === data.role) {
                    role = Root.userRoles[j].label;
                }
            }
            let obj = {
                key: data._id,
                firstName: data.first_name,
                lastName: data.last_name,
                role: role,
                department: depart,
                position: position,
                centers: center,
                allowed: data.allowed
            };
            empData.push(obj);
        }
        
        this.setState({
            rows: empData
        }, () => {
            this.setState({
                empTableLoading: false
            })
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props !== prevProps) {
            var pData = [];
            if (this.props.positionData && this.props.positionData.length > 0) {
                for (let i = 0; i < this.props.positionData.length; i++) {
                    let obj = {
                        value: this.props.positionData[i]._id, label: this.props.positionData[i].name, color: this.props.positionData[i].color
                    }
                    pData.push(obj);
                }
            }

            var departmentData = [];
            if (this.props.departmentData && this.props.departmentData.length > 0) {
                for (let i = 0; i < this.props.departmentData.length; i++) {
                    let obj = {
                        value: this.props.departmentData[i]._id, label: this.props.departmentData[i].name, color: this.props.departmentData[i].color, parentId: this.props.departmentData[i].parentId
                    }
                    departmentData.push(obj);
                }
            }
            
            var calendarData = [];
            if (this.props.calendarData && this.props.calendarData.length > 0) {
                for (let i = 0; i < this.props.calendarData.length; i++) {
                    let obj = {
                        value: this.props.calendarData[i]._id, label: this.props.calendarData[i].name
                    }
                    calendarData.push(obj);
                }
            }
            
            var centersData = [];
            if (this.props.centersData && this.props.centersData.length > 0) {
                for (let i = 0; i < this.props.centersData.length; i++) {
                    let obj = {
                        value: this.props.centersData[i]._id, label: this.props.centersData[i].name
                    }
                    centersData.push(obj);
                }
            }
            
            var scheduleData = [];
            if (this.props.scheduleData && this.props.scheduleData.length > 0) {
                for (let i = 0; i < this.props.scheduleData.length; i++) {
                    let obj = {
                        value: this.props.scheduleData[i]._id, label: this.props.scheduleData[i].name
                    }
                    scheduleData.push(obj);
                }
            }
            
            var agreementsData = [];
            if (this.props.agreementsData && this.props.agreementsData.length > 0) {
                for (let i = 0; i < this.props.agreementsData.length; i++) {
                    let obj = {
                        value: this.props.agreementsData[i]._id, label: this.props.agreementsData[i].name
                    }
                    agreementsData.push(obj);
                }
            }
            
            var searchEmpData = [];
            var responsableData = [];
            if (this.props.employeeData&&this.props.employeeData.length !== 0) {
                this.setRow(this.props.employeeData, pData, departmentData, centersData);
                for (let i = 0; i < this.props.employeeData.length; i++) {
                    let data = this.props.employeeData[i];
                    let sObj = {
                        value: data._id, label: data.first_name + " " + data.last_name
                    }
                    let rObj = {}
                    if (data.role === 'admin' || data.role === 'manager') {
                        rObj.value = data._id
                        rObj.label = data.first_name + " " + data.last_name
                    }
                    searchEmpData.push(sObj);
                    responsableData.push(rObj);
                }
            }

            this.setState({
                positionData: pData,
                departmentData: departmentData,
                searchEmployeeData: searchEmpData,
                calendarData: calendarData,
                centersData: centersData,
                scheduleData: scheduleData,
                agreementsData: agreementsData,
                companyData: this.props.companyData,
                responsableData
            })
        }
    }

    handleTableSelection = (e) => {
        if (e.rowIds > 0) {
            this.setState({
                isSelectedRow: true
            })
        } else {
            this.setState({
                isSelectedRow: true
            })
        }
    }

    addNewPerson = () => {
        this.modalToggle();
        this.setState({edit: false})

        var responsableData = [];
        if (this.props.employeeData&&this.props.employeeData.length !== 0) {
            for (let i = 0; i < this.props.employeeData.length; i++) {
                let data = this.props.employeeData[i];
                let rObj = {}
                if (data.role === 'admin' || data.role === 'manager') {
                    rObj.value = data._id
                    rObj.label = data.first_name + " " + data.last_name
                }
                responsableData.push(rObj);
            }
        }

        this.setState({responsableData})
    }

    render() {
        return (
            <div className="team-manage">
                <div className="team-manage-header">
                    {/* <Select
                        isClearable
                        isSearchable
                        isMulti
                        name="searchEmployee"
                        className="w-25"
                        options={this.state.searchEmployeeData}
                        onChange={(e) =>this.onChange(e)}
                    /> */}
                        <Button type="primary" onClick={() => this.addNewPerson()}>Añadir persona</Button>
                    {/* {
                        this.state.isSelectedRow === false ? 
                        :
                        ""
                    } */}
                </div>
                <Table columns={this.state.columns} dataSource={this.state.rows} loading={this.state.empTableLoading} />
                <Modal isOpen={this.state.isOpenModal} toggle={this.modalToggle} size="lg">
                    <ModalHeader toggle={this.modalToggle}>Añadir persona</ModalHeader>
                    <ModalBody>
                        <Form action="#" onSubmit={this.handleAddPersonSubmit}>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="exampleEmail">Nombre</Label>
                                        <Input type="text" name="firstName" value={this.state.firstName} placeholder="Nombre" onChange={e => this.setState({firstName: e.target.value})} required />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="exampleEmail">Apellido</Label>
                                        <Input type="text" name="lastName" value={this.state.lastName} placeholder="Apellido" onChange={e => this.setState({lastName: e.target.value})} required />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="exampleEmail">Email</Label>
                                        <Input type="email" name="email" value={this.state.email} placeholder="Email" onChange={e => this.setState({email: e.target.value})} required />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup className="d-flex flex-column">
                                        <Label for="exampleEmail">Fecha de nacimiento</Label>
                                        <DatePicker
                                            // selected={this.state.birthDay}
                                            defaultValue={this.state.birthDay}
                                            onChange={this.handleBirthDayChange}
                                            format={this.state.formatDate}
                                            required
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="exampleEmail">Cargo</Label>
                                        <Select
                                            isClearable
                                            isSearchable
                                            placeholder="Select..."
                                            value={this.state.position}
                                            options={this.state.positionData}
                                            onChange={(e) =>this.onChangePositionSelect(e)}
                                            required
                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="d-flex justify-content-center align-items-center">
                                    <Button type="primary" onClick={() => this.positionModalToggle()}>Añadir</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="exampleEmail">Departamento</Label>
                                        {/* <Input type="select" name="select" style={{padding: "8px"}} onChange={e => this.onChangeDepartmentSelect(e.target.value)} required>
                                            <option value="">Select...</option>
                                            {
                                                this.state.departmentData.map((item, i) => (
                                                    <option value={item.value} key={i} style={{padding: 0}}>{item.label}</option>
                                                ))
                                            }
                                        </Input> */}
                                        <Select
                                            isClearable
                                            isSearchable
                                            name="Select..."
                                            options={this.state.departmentData}
                                            value={this.state.department}
                                            onChange={(e) =>this.onChangeDepartmentSelect(e)}
                                            required
                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="d-flex justify-content-center align-items-center">
                                    <Button type="primary" onClick={() => this.departmentModalToggle()}>Añadir</Button>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label for="exampleEmail">Rol</Label>
                                <Select
                                    isClearable
                                    isSearchable
                                    name="Select..."
                                    value={this.state.role}
                                    options={Root.userRoles}
                                    onChange={(e) =>this.onChangeRoleSelect(e)}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Responsable</Label>
                                <Select
                                    isClearable
                                    isSearchable
                                    name="Select..."
                                    value={this.state.responsable}
                                    options={this.state.responsableData}
                                    onChange={(e) =>this.onChangeResponseSelect(e)}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Centros</Label>
                                <Select
                                    isClearable
                                    isSearchable
                                    name="Select..."
                                    options={this.state.centersData}
                                    value={this.state.centers}
                                    onChange={(e) =>this.onChangeCentersSelect(e)}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Calendario</Label>
                                <Select
                                    isClearable
                                    isSearchable
                                    placeholder="Select..."
                                    options={this.state.calendarData}
                                    value={this.state.calendar}
                                    onChange={(e) =>this.onChangeCalendarSelect(e)}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Convenio</Label>
                                <Select
                                    isClearable
                                    isSearchable
                                    placeholder="Select..."
                                    options={this.state.agreementsData}
                                    value={this.state.agreement}
                                    onChange={(e) =>this.onChangeAgreementSelect(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Horario</Label>
                                <Select
                                    isClearable
                                    isSearchable
                                    placeholder="Select..."
                                    options={this.state.scheduleData}
                                    value={this.state.schedule}
                                    onChange={(e) =>this.onChangeScheduleSelect(e)}
                                />
                            </FormGroup>
                            <Row>
                                <Col>
                                    <FormGroup className="d-flex flex-column">
                                        <DatePicker
                                            // selected={this.state.startDay}
                                            defaultValue={this.state.startDay}
                                            onChange={this.handleStartDayChange}
                                            dateFormat={this.state.formatDate}
                                            placeholder="Start Day"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup className="d-flex flex-column">
                                        <DatePicker
                                            // selected={this.state.endDay}
                                            defaultValue={this.state.endDay}
                                            onChange={this.handleEndChange}
                                            dateFormat={this.state.formatDate}
                                            placeholder="End Day"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button htmlType="submit" type="primary" className="my-1 w-100">Aceptar</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isOpenPositionModal} toggle={this.positionModalToggle}>
                    <ModalHeader toggle={this.positionModalToggle}>Añadir cargo</ModalHeader>
                    <ModalBody>
                        <Form action="#" onSubmit={this.handleSubmitPosition}>
                            <FormGroup>
                                <Label for="exampleEmail">Nombre del cargo</Label>
                                <Input type="text" name="position" placeholder="Nombre del cargo" value={this.state.positionName} onChange={(e) => this.setState({positionName: e.target.value})} required />
                            </FormGroup>
                            <div style={{width: "100%", height: "50px", background: this.state.selectedPositionColor, margin: "10px 0"}}></div>
                            <CirclePicker className="w-100 mb-1" onChangeComplete={this.onChangePositionColor} />
                            <Button type="primary" htmlType="submit">Aceptar</Button>{' '}
                            <Button type="primary" onClick={() => this.positionModalToggle()}>Cancelar</Button>{' '}
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isOpenDepartmentModal} toggle={this.departmentModalToggle}>
                    <ModalHeader toggle={this.departmentModalToggle}>Departamento</ModalHeader>
                    <ModalBody>
                        <Form action="#" onSubmit={this.handleSubmitDepartment}>
                            <FormGroup>
                                <Label for="exampleEmail">Nombre del departamento</Label>
                                <Input type="text" placeholder="Nombre del departamento" value={this.state.departmentName} onChange={(e) => this.setState({departmentName: e.target.value})} required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Departamento padre</Label>
                                <Select
                                    isClearable
                                    isSearchable
                                    name="Select Department"
                                    options={this.state.departmentData}
                                    onChange={(e) =>this.onSChangeDepartmentSelect(e)}
                                />
                            </FormGroup>
                            <div style={{width: "100%", height: "50px", background: this.state.selectedDepartmentColor, margin: "10px 0"}}></div>
                            <CirclePicker className="w-100 mb-1" onChangeComplete={this.onChangeDepartmentColor} />
                            <Button type="primary" htmlType="submit">Acceptar</Button>{' '}
                            <Button type="primary" onClick={() => this.departmentModalToggle()}>Cancelar</Button>{' '}
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const loadData = (state) => {
    return {
        positionData: state.superAdmin.superAdmin.positionData,
        departmentData: state.superAdmin.superAdmin.departmentData,
        employeeData: state.superAdmin.superAdmin.employees,
        centersData: state.superAdmin.superAdmin.centersData,
        calendarData: state.superAdmin.superAdmin.calendarData,
        scheduleData: state.superAdmin.superAdmin.scheduleData,
        agreementsData: state.superAdmin.superAdmin.agreementsData,
        companyData: state.auth.login.companyData,
        userData: state.auth.login.authData,
    }
}

export default connect(loadData, {
    addPosition,
    loadPosition,
    addDepartment,
    loadDepartment,
    addPerson,
    loadEmployees,
    getCenterData,
    getAgreementsData,
    getScheduleData,
    getCalendarData,
    deletePerson,
    updatePerson,
    suspendPerson
})(TeamManage);