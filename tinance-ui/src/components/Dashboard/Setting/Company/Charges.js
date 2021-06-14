import React, { Component } from 'react';
import { Button, Input, Collapse, Modal, Table, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Form, Label, FormGroup } from 'reactstrap';
import { CirclePicker } from 'react-color'

const { Panel } = Collapse;

class Charges extends Component {
    constructor() {
        super();
        this.state = {
            isOpenModal: false,
            
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

            name: "",
            color: "#f44336"
        }
    }

    modalToggle = event => {
        event.stopPropagation();
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    onChangeColor = color => {
        this.setState({
            color: color.hex
        })
    }

    addPluseButton = () => (
        <Button onClick={(event)=> this.modalToggle(event)} type="primary" className="d-flex align-items-center" icon={<PlusOutlined />} >Añadir</Button>
    )

    componentDidUpdate = prevProps => {
        if (prevProps !== this.props) {
            this.setState({
                dataSource: this.props.data.chargesData
            })
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        var { name, color } = this.state;
        var data = { name, color };
        this.props.submit(data);
    }

    render() {
        return (
            <>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="Cargos" key="1" extra={this.addPluseButton()}>
                        <Table columns={this.state.columns} rowKey={record => record._id} pagination={false} dataSource={this.state.dataSource} />
                    </Panel>
                </Collapse>
                <Modal title="Cargos" visible={this.state.isOpenModal} width={800} footer={""} onCancel={this.modalToggle}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="exampleEmail">Nombre del cargo</Label>
                            <Input type="text" placeholder="Nombre del cargo" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} required />
                        </FormGroup>
                        <div style={{width: "100%", height: "50px", background: this.state.color, margin: "10px 0"}}></div>
                        <CirclePicker className="w-100 mb-1" onChangeComplete={this.onChangeColor} />
                        <Space>
                            <Button type="primary" htmlType="submit">Accept</Button>
                            <Button type="primary" onClick={this.modalToggle}>Cancel</Button>
                        </Space>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default Charges;