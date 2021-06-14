import React, { Component } from 'react';
import { Button, Input, Collapse, Modal, Checkbox, Table, Space } from 'antd';
import { Col, Form, FormGroup, Label, Row } from 'reactstrap';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Select from 'react-select';
import countryList from 'react-select-country-list'
import { postcodeValidator } from 'postcode-validator';
import { store } from 'react-notifications-component';

const { Panel } = Collapse;

class Calendar extends Component {

    constructor() {
        super();

        this.countryListOptions = countryList().getData()

        this.state = {
            isOpenCalendarModal: false,
            centersData: [],

            countryListOptions: this.countryListOptions,

            // canedar data
            calendarName: "",
            selectedCenter: "",
            selectedCountry: "",
            zipCode: "",
            isChecked: false,
            columns: [
                {
                  title: 'Name',
                  dataIndex: 'name',
                  key: 'name',
                  render: name => <span>{name}</span>,
                },
                {
                  title: 'Location',
                  key: 'location',
                  dataIndex: 'location',
                  render: (text, record, index) => (
                    <>
                        {record.zipCode + ", " + record.country}
                    </>
                  ),
                },
                {
                  title: 'Action',
                  key: 'action',
                  render: (text, record, index) => (
                    <Space>
                        <EditOutlined color="blue" />
                        { index === 0 ? "" : <DeleteOutlined color="blue" /> }
                    </Space>
                  ),
                },
            ],
            dataSource: []
        }
    }

    calendarModalToggle = (event) => {
        event.stopPropagation();
        this.setState({
            isOpenCalendarModal: !this.state.isOpenCalendarModal
        })
    }
    
    addCalendar = () => (
        <Button onClick={(event)=> this.calendarModalToggle(event)} type="primary" className="d-flex align-items-center" icon={<PlusOutlined />} >Añadir </Button>
    )

    onChangeCentersSelect = (e) => {
        this.setState({
            selectedCenter: e ? e.value : ""
        })
    }
    
    onChangeCountrySelect = (e) => {
        this.setState({
            selectedCountry: e ? e.value : ""
        })
    }

    isChecked = e => {
        this.setState({
            isChecked: e.target.checked
        })
    }

    handleSubmitCanledar = (e) => {
        e.preventDefault();
        var data = { name: this.state.calendarName, center: this.state.selectedCenter, country: this.state.selectedCountry, zipCode: this.state.zipCode, updateChecked: this.state.isChecked };
        var isValidCode = postcodeValidator(this.state.zipCode, this.state.selectedCountry);
        if (!isValidCode) {
            store.addNotification({
                title: "Error!",
                message: "Código postal inválido",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__lightSpeedInRight"],
                animationOut: ["animate__animated", "animate__lightSpeedOutRight"],
                dismiss: {
                    duration: 5000,
                    onScreen: true,
                    pauseOnHover: true,
                    showIcon : true
                }
            });
            return;
        }
        this.props.submit(data)
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            var centersData = []
            if (this.props.data.centersData) {
                for (let i = 0; i < this.props.data.centersData.length; i++) {
                    let obj = {
                        value: this.props.data.centersData[i]._id,
                        label: this.props.data.centersData[i].name
                    }
                    centersData.push(obj);
                }
            }
            this.setState({
                dataSource: this.props.data.calendarData,
                centersData
            })
        }
    }

    render() {
        return (
            <>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="Calendarios" key="1" extra={this.addCalendar()}>
                        <Table columns={this.state.columns} rowKey={(record) => record._id} pagination={false} dataSource={this.state.dataSource} />
                    </Panel>
                </Collapse>
                <Modal title="Calendario" visible={this.state.isOpenCalendarModal} width={800} footer={""} onCancel={this.calendarModalToggle}>
                    <Form onSubmit={this.handleSubmitCanledar}>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleEmail">Nombre</Label>
                                    <Input type="text" name="name" placeholder="Nombre" onChange={e => this.setState({calendarName: e.target.value})} required />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleEmail">Centros</Label>
                                    <Select
                                        isClearable
                                        isSearchable
                                        name="Select..."
                                        options={this.state.centersData}
                                        onChange={(e) =>this.onChangeCentersSelect(e)}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleEmail">País</Label>
                                    <Select
                                        isClearable
                                        isSearchable
                                        name="Select..."
                                        options={this.state.countryListOptions}
                                        onChange={(e) =>this.onChangeCountrySelect(e)}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleEmail">Código postal</Label>
                                    <Input type="text" name="postalCode" placeholder="Código postal" onChange={e => this.setState({zipCode: e.target.value})} required />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Checkbox onChange={this.isChecked}>Sincronizar con calendario público. Se actualizará cada inicio de año</Checkbox>
                            </Col>
                        </Row>
                        <Row className="text-center mt-1">
                            <Col>
                                <Button type="primary" htmlType="submit" >Aceptar</Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default Calendar;