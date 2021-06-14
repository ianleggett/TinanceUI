import React, { Component } from 'react';
import { Collapse, Input, Button, Space } from 'antd';
import { Form, Row, Col, Label, FormGroup } from 'reactstrap';
import { EditOutlined} from '@ant-design/icons';
import Select from 'react-select';
import countryList from 'react-select-country-list'

const { Panel } = Collapse;

class Company extends Component {
    
    constructor() {
        super();
        
        this.countryListOptions = countryList().getData()

        this.state ={
            edit: false,
            centersData: [
                { value: "nobusiness", label: "nobusiness" }
            ],

            countryListOptions: this.countryListOptions,

            name: "",
            telephone: "",
            direction: "",
            cp: "",
            city: "",
            country: "",
            cif: "",
            ccc: "",
        }
    }

    editToggle = event => {
        event.stopPropagation();
        this.setState({
            edit: !this.state.edit
        })
    }

    onChangeCountrySelect = (e) => {
        this.setState({
            country: e ? e.value : ""
        })
    }

    editButton = () => (
        <>
            {
                this.state.edit ? 
                    <Space>
                        <Button onClick={(event)=> this.editToggle(event)} type="default" className="d-flex align-items-center" >Cancelar</Button>
                        <Button onClick={(event)=> this.editToggle(event)} type="primary" className="d-flex align-items-center" icon={<EditOutlined />} >Guardar</Button>
                    </Space>
                : 
                    <Button onClick={(event)=> this.editToggle(event)} type="primary" className="d-flex align-items-center" icon={<EditOutlined />} >Modificar</Button>
            }
        </>
    )

    render() {
        return (
            <>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="Empresa" key="1" extra={this.editButton()}>
                        <Form>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="exampleEmail">Nombre</Label>
                                        <Input type="text" placeholder="Nombre" onChange={e => this.setState({name: e.target.value})} disabled={this.state.edit ? false : true} required />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="exampleEmail">Teléfono</Label>
                                        <Input type="text" placeholder="Teléfono" onChange={e => this.setState({telephone: e.target.value})} disabled={this.state.edit ? false : true} required />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="exampleEmail">Dirección</Label>
                                        <Input type="text" placeholder="Dirección" onChange={e => this.setState({direction: e.target.value})} disabled={this.state.edit ? false : true} required />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="exampleEmail">C.P.</Label>
                                        <Input type="text" placeholder="C.P." onChange={e => this.setState({cp: e.target.value})} disabled={this.state.edit ? false : true} required />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="exampleEmail">Ciudad</Label>
                                        <Input type="text" placeholder="Ciudad" onChange={e => this.setState({city: e.target.value})} disabled required />
                                    </FormGroup>
                                </Col>
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
                                            isDisabled={this.state.edit ? false : true}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="exampleEmail">C.I.F. / N.I.F.</Label>
                                        <Input type="text" placeholder="C.I.F. / N.I.F." onChange={e => this.setState({cif: e.target.value})} disabled={this.state.edit ? false : true} required />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="exampleEmail">C.C.C.</Label>
                                        <Input type="text" placeholder="C.C.C." onChange={e => this.setState({ccc: e.target.value})} disabled={this.state.edit ? false : true} required />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </Panel>
                </Collapse>  
            </>
        );
    }
}

export default Company;