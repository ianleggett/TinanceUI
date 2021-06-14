import React, { Component } from 'react';
import { Button, Input, Collapse, Modal, Table, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Form, Row, Col, Label, FormGroup } from 'reactstrap';
import Select from 'react-select';

const { Panel } = Collapse;

class Schedule extends Component {
    
    constructor() {
        super();
        this.state = {
            isOpenScheduleModal: false,
            centersData: [],
            scheduleData: [],
            
            name: "",
            center: "",
            originSchedule: "",
            
            dataSource: [],

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
        }
    }

    modalToggle = event => {
        event.stopPropagation();
        this.setState({
            isOpenScheduleModal: !this.state.isOpenScheduleModal
        })
    }

    addSchedule = () => (
        <Button onClick={(event)=> this.modalToggle(event)} type="primary" className="d-flex align-items-center" icon={<PlusOutlined />} >Añadir </Button>
    )

    onChangeOriginScheduleSelect = (e) => {
        this.setState({
            originSchedule: e ? e.value : ""
        })
    }
    
    onChangeCentersSelect = (e) => {
        this.setState({
            center: e ? e.value : ""
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        var data = { name: this.state.name, center: this.state.center, originSchedule: this.state.originSchedule }
        this.props.submit(data);
    }

    componentDidUpdate = prevProps => {
        if (prevProps !== this.props) {
            var centersData = []
            var scheduleData = []
            if (this.props.data.centersData) {
                for (let i = 0; i < this.props.data.centersData.length; i++) {
                    let obj = {
                        value: this.props.data.centersData[i]._id,
                        label: this.props.data.centersData[i].name
                    }
                    centersData.push(obj);
                }
            }
            if (this.props.data.scheduleData) {
                for (let i = 0; i < this.props.data.scheduleData.length; i++) {
                    let obj = {
                        value: this.props.data.scheduleData[i]._id,
                        label: this.props.data.scheduleData[i].name
                    }
                    scheduleData.push(obj);
                }
            }
            this.setState({
                dataSource: this.props.data.scheduleData,
                centersData,
                scheduleData
            })
        }
    }

    isOpenScheduleModal = () => {
        this.setState({
            isOpenScheduleModal: !this.state.isOpenScheduleModal
        })
    }

    render() {
        return (
            <>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="Horarios" key="1" extra={this.addSchedule()}>
                        <Table columns={this.state.columns} rowKey={record => record._id} pagination={false} dataSource={this.state.dataSource} />
                    </Panel>
                </Collapse>
                <Modal title="Horarios" visible={this.state.isOpenScheduleModal} width={800} footer={""} onCancel={this.modalToggle}>
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
                                    <Label for="exampleEmail">Horario</Label>
                                    <Select
                                        isClearable
                                        isSearchable
                                        name="Select..."
                                        options={this.state.scheduleData}
                                        onChange={(e) =>this.onChangeOriginScheduleSelect(e)}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="d-flex justify-content-center align-items-center">Horario origen</Col>
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

export default Schedule;