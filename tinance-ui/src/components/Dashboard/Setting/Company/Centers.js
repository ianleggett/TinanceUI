import React, { Component } from 'react';
import { Collapse, Table, Modal, Input, Button, Checkbox, Space, Switch } from 'antd';
import { Form, Row, Col, Label, FormGroup } from 'reactstrap';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Select from 'react-select';
import TimezoneSelect from 'react-timezone-select'
import InputMask from 'react-input-mask';

const { Panel } = Collapse;

class Centers extends Component {
    
    constructor() {
        super();
        this.state ={
            isOpenModal: false,
            scheduleData: [
                { value: "nobusiness", label: "nobusiness" }
            ],

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

            isCenterIP: false,
            isLocation: false,
            isMap: false,

            name: "",
            schedule: "",
            timezone: "",
            centerIP: "",
            notTransferIP: false,
            notTransferLocation: false,
            latitude: 0,
            longtitude: 0,
            distance: 0,
        }
    }

    modalToggle = event => {
        event.stopPropagation();
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }
    
    plusButton = () => (
        <Button onClick={(event)=> this.modalToggle(event)} type="primary" className="d-flex align-items-center" icon={<PlusOutlined />} >Añadir</Button>
    )

    onChangeScheduleSelect = e => {
        this.setState({
            schedule: e ? e.value : ""
        })
    }

    onTimezoneSelectChange = e => {
        this.setState({
            timezone: e ? e.value : ""
        })
    }

    onChangeNotTransferIP = e => {
        this.setState({
            notTransferIP: e.target.checked
        })
    }
    
    onChangeNotTransferLocation = e => {
        this.setState({
            notTransferLocation: e.target.checked
        })
    }

    onChangeIsCenterIP = (e) => {
        this.setState({
            isCenterIP: e
        }, () => {
            if (!e) {
                this.setState({
                    centerIP: "",
                    notTransferIP: false
                })
            }
        })
    }

    onChangeIsLocation = e => {
        this.setState({
            isLocation: e
        }, () => {
            if (!e) {
                this.setState({
                    latitude: 0,
                    longtitude: 0,
                    distance: 0,
                    isLocation: false
                })
            }
        })
    }

    onChangeCenterIP = e => {
        this.setState({
            centerIP: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        var { name, schedule, timezone, centerIP, notTransferIP, notTransferLocation, latitude, longtitude, distance } = this.state;
        var data = { name, schedule, timezone, centerIP, notTransferIP, notTransferLocation, latitude, longtitude, distance }
        this.props.submit(data);
    }

    componentDidUpdate = prevProps => {
        if (prevProps !== this.props) {
            var scheduleData = []
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
                dataSource: this.props.data.centersData,
                scheduleData
            })
        }
    }

    render() {
        return (
            <>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="Centros" key="1" extra={this.plusButton()}>
                        <Table columns={this.state.columns} rowKey={record => record._id} pagination={false} dataSource={this.state.dataSource} />
                    </Panel>
                </Collapse>
                <Modal title="Centros" visible={this.state.isOpenModal} width={800} footer={""} onCancel={this.modalToggle}>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleEmail">Nombre</Label>
                                    <Input type="text" placeholder="Nombre" onChange={e => this.setState({name: e.target.value})} required />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleEmail">Horario</Label>
                                    <Select
                                        isClearable
                                        isSearchable
                                        name="Select..."
                                        options={this.state.scheduleData}
                                        onChange={(e) =>this.onChangeScheduleSelect(e)}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleEmail">Zona Horaria</Label>
                                    <TimezoneSelect
                                        value={this.state.timezone}
                                        onChange={this.onTimezoneSelectChange}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-1">
                            <Col className="d-flex align-items-center justify-content-between">
                                <span><b>IP del centro</b></span>
                                <Switch defaultChecked={this.state.isCenterIP} onChange={this.onChangeIsCenterIP} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleEmail">Dirección IP</Label>
                                    <InputMask mask="999.999.999.999" maskChar={null} value={this.state.centerIP} disabled={this.state.isCenterIP ? false : true} className="ant-input" onChange={this.onChangeCenterIP} required />
                                    <Checkbox onChange={this.onChangeNotTransferIP} checked={this.state.notTransferIP} disabled={this.state.isCenterIP ? false : true} >Bloquear fichajes fuera de estas IPs (separadas por comas)</Checkbox>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-1">
                            <Col className="d-flex align-items-center justify-content-between">
                                <span><b>Ubicación</b></span>
                                <Switch defaultChecked={this.state.isLocation} onChange={this.onChangeIsLocation} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Space>
                                    <FormGroup>
                                        <Label for="exampleEmail">Latitud</Label>
                                        <Input type="text" placeholder="Latitud" value={this.state.latitude} onChange={e => this.setState({latitude: e.target.value})} required disabled={this.state.isLocation ? false : true} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exampleEmail">Longitud</Label>
                                        <Input type="text" placeholder="Longitud" value={this.state.longtitude} onChange={e => this.setState({longtitude: e.target.value})} required disabled={this.state.isLocation ? false : true} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exampleEmail">Radio</Label>
                                        <Input type="text" placeholder="km" value={this.state.distance} onChange={e => this.setState({distance: e.target.value})} required disabled={this.state.isLocation ? false : true} />
                                    </FormGroup>
                                </Space>
                                <Checkbox onChange={this.onChangeNotTransferLocation} checked={this.state.notTransferLocation} disabled={this.state.isLocation ? false : true} >Bloquear fichajes fuera de la ubicación</Checkbox>
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

export default Centers;