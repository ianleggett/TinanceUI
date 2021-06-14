import React, { Component } from 'react';
import { Collapse, Table, Modal, Input, Button, Radio, DatePicker, TimePicker, Space } from 'antd';
import { Form, Row, Col, Label, FormGroup } from 'reactstrap';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Select from 'react-select';
import moment from 'moment';

const { RangePicker } = TimePicker;

const { Panel } = Collapse;

class Agreements extends Component {
    constructor() {
        super();
        this.state ={
            isOpenAgreementsModal: false,
            centersData: [],
            agreementsData: [],

            columns: [
                {
                  title: 'Name',
                  dataIndex: 'name',
                  key: 'name',
                  render: name => <span>{name}</span>,
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

            dataSource: [],

            isNightWork: false,

            name: "",
            center: "",
            originAgreements: "",
            dayType: 'weekdays',
            yearEndDay: "",
            yearHours: 0,
            nightHour: ["12:00 am", "5:00 am"]
        }
    }

    modalToggle = event => {
        event.stopPropagation();
        this.setState({
            isOpenAgreementsModal: !this.state.isOpenAgreementsModal
        })
    }
    
    plusButton = () => (
        <Button onClick={(event)=> this.modalToggle(event)} type="primary" className="d-flex align-items-center" icon={<PlusOutlined />} >Añadir </Button>
    )

    onChangeDayType = (e) => {
        this.setState({
            dayType: e.target.value
        })
    }

    onChangeYearEndDay = (date, dateString) => {
        this.setState({
            yearEndDay: dateString
        })
    }

    onChangeNightWork = e => {
        this.setState({
            isNightWork: e ? e.target.value : ""
        })
    }

    onChangeCentersSelect = e => {
        this.setState({
            center: e ? e.value : ""
        })
    }

    onChangeOriginAgreementsSelect = e => {
        this.setState({
            originAgreements: e ? e.value : ""
        })
    }

    onChangeNightHour = (time, timeString) => {
        this.setState({
            nightHour: timeString
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        var data = {name: this.state.name, center: this.state.center, originAgreements: this.state.originAgreements, dayType: this.state.dayType, yearEndDay: this.state.yearEndDay, yearHours: this.state.yearHours, nightHour: this.state.isNightWork ? this.state.nightHour : ""}
        this.props.submit(data);
    }

    componentDidUpdate = prevProps => {
        if (prevProps !== this.props) {
            var centersData = []
            var agreementsData = []
            if (this.props.data.centersData) {
                for (let i = 0; i < this.props.data.centersData.length; i++) {
                    let obj = {
                        value: this.props.data.centersData[i]._id,
                        label: this.props.data.centersData[i].name
                    }
                    centersData.push(obj);
                }
            }
            if (this.props.data.agreementsData) {
                for (let i = 0; i < this.props.data.agreementsData.length; i++) {
                    let obj = {
                        value: this.props.data.agreementsData[i]._id,
                        label: this.props.data.agreementsData[i].name
                    }
                    agreementsData.push(obj);
                }
            }
            this.setState({
                dataSource: this.props.data.agreementsData,
                centersData,
                agreementsData
            })
        }
    }

    render() {
        return (
            <>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="Convenios" key="1" extra={this.plusButton()}>
                        <Table columns={this.state.columns} rowKey={record => record._id} pagination={false} dataSource={this.state.dataSource} />
                    </Panel>
                </Collapse>
                <Modal title="Convenios" visible={this.state.isOpenAgreementsModal} width={800} footer={""} onCancel={this.modalToggle}>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleEmail">Nombre</Label>
                                    <Input type="text" name="name" placeholder="Nombre" onChange={e => this.setState({name: e.target.value})} required />
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
                                    <Label for="exampleEmail">Convenio</Label>
                                    <Select
                                        isClearable
                                        isSearchable
                                        name="Select..."
                                        options={this.state.agreementsData}
                                        onChange={(e) =>this.onChangeOriginAgreementsSelect(e)}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="d-flex justify-content-center align-items-center">Convenio origen</Col>
                        </Row>
                        <Row>
                            <Col className="d-flex align-items-center">
                                <Radio.Group onChange={this.onChangeDayType} value={this.state.dayType}>
                                    <Radio value={'weekdays'}>Laborables</Radio>
                                    <Radio value={'natural'}>Naturales</Radio>
                                </Radio.Group>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleEmail">Fecha de cierre de ejercicio</Label>
                                    <DatePicker onChange={this.onChangeYearEndDay} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleEmail">Horas anuales por convenio</Label>
                                    <Input type="number" name="name" placeholder="Horas anuales por convenio" onChange={e => this.setState({yearHours: e.target.value})} required />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Radio.Group onChange={this.onChangeNightWork} className="d-flex flex-column" value={this.state.isNightWork}>
                                    <Radio value={true}>Contabilizar las horas nocturnas de</Radio>
                                    <Radio value={false}>No indicar</Radio>
                                </Radio.Group>
                            </Col>
                            <Col>
                                <RangePicker use12Hours format="h:mm a" value={[moment(this.state.nightHour[0], 'h:mm a'), moment(this.state.nightHour[1], 'h:mm a')]} onChange={this.onChangeNightHour} disabled={this.state.isNightWork ? false : true} />
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

export default Agreements;