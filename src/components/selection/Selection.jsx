import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

import './Selection.css'

class Selection extends Component {

    render() {

        return (

            <Container>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3}} className="container-selection">
                        <Link to={'/initial-balance'}>
                            <button className="btn btn-size">KASIR</button>
                        </Link>
                        <Link to={'/booking'}>
                            <button className="btn btn-size">PEMESANAN</button>
                        </Link>
                        <Link to={'/production'}>
                            <button className="btn btn-size">PRODUKSI</button>
                        </Link>
                    </Col>
                </Row>
            </Container>

        )
    }
}

export default Selection