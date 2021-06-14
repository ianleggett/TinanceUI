import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { Col, Row } from 'reactstrap';
import Person from '@material-ui/icons/Person';
import GetApp from '@material-ui/icons/GetApp';

class MassImport extends Component {
    render() {
        return (
            <div className="mass-import">
                <Row>
                    <Col className="mass-import-upload">
                        <h3>Importación masiva</h3>
                        <ul>
                            <li>			
                                <b>Sube todos los datos</b> de tu equipo desde una hoja de cálculo (Excel o CSV)			
                            </li>
                            <li>			
                                <b>Comprueba que coincidan las columnas</b> de la hoja de cálculo y de la plataforma.			
                            </li>
                            <li>			
                                <b>Verifica los datos que se van a importar</b> y finaliza la importación.			
                            </li>
                        </ul>
                        <div className="btn-dashboard btn-primary btn-file-upload d-flex" style={{width: "235px"}}>
                            <span>Importar usuarios</span>
                            <input type="file" />
                            <Person color="primary" className="ml-1" />
                        </div>
                    </Col>
                    <Col className="mass-import-download">
                        <h4>Importar tu equipo por primera vez</h4>
                        <ul>
                            <li>Asegúrate de que la hoja de cálculo <b>contiene las columnas nombre y e-mail.</b></li>			
                            <li>Los usuarios <b>no se activan de forma automática</b>, una vez finalizada la importación podrás activarlos desde			
                                Equipo.</li>			
                            <li><b>Descarga nuestra plantilla</b> si no tienes una.</li>			
                        </ul>
                        <Button
                            variant="outlined"
                            color="primary"
                            endIcon={<GetApp />}
                            style={{color: "#0e63ff"}}
                        >
                            Descargar plantilla
                        </Button>
                        <h4>Actualizar la información de los empleados</h4>
                        <ul>			
                            <li>Asegúrate de que la hoja de cálculo <b>contiene al menos la columna e-mail.</b></li>			
                            <li><b>Los valores actuales serán sobreescritos.</b> Elimina las columnas de las que no quieras actualizar sus			
                                valores.</li>			
                        </ul>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default MassImport;