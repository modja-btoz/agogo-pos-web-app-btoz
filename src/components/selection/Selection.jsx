import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './Selection.css'

class Selection extends Component {

    constructor(props){
        super(props)
      }
      state = {
        userLoggedIn: {},
        where: {},
        kasir: false,
        stok: false,
        pemesanan: false,
      }

    componentDidMount(){
        axios.get('https://cors-anywhere.herokuapp.com/http://101.255.125.227:82/api/cekKas')
        .then(res => {
            this.setState({where: res.data})
        })
        console.log(this.state, sessionStorage)
        const user = JSON.parse(sessionStorage.getItem('usernow'))
        this.setState({userLoggedIn: user}, () => this.checkRole())
    }

    checkRole(){
        if(this.state.userLoggedIn.role.includes("kasir")){
            this.setState({kasir: !this.state.kasir})
        }
        if(this.state.userLoggedIn.role.includes("stok")){
            this.setState({stok: !this.state.stok})
        }
        if(this.state.userLoggedIn.role.includes("pemesanan")){
            this.setState({pemesanan: !this.state.pemesanan})
        }
    }

    render() {

        return (
    <section className="Selection centered">
            <Container >
                <Row >
                    <Col sm="12" md={{ size: 6, offset: 3}} className="container-selection">
                        {/* {this.state.userLoggedIn.role.map(x => x)} */}
                        {/* {this.props.transactionStore.state.isKasir &&
                            <Link to={'/initial-balance'}>
                            <button className="btn btn-size">KASIR</button>
                            </Link>
                        } */}

                        {this.state.kasir &&
                            <div>
                            {this.state.where.status === 'success' ?
                                <Link to={'/initial-balance'}>
                                    <button className="btn btn-size">KASIR</button>
                                </Link> : 
                                <Link to={'/cashier'}>
                                    <button className="btn btn-size">KASIR</button>
                                </Link>
                            }
                            
                            </div>
                        }
                        {this.state.stok &&
                            <Link to={'/production'}>
                            <button className="btn btn-size">PRODUKSI</button>
                            </Link>
                        }
                        {this.state.pemesanan &&
                            <Link to={'/booking'}>
                            <button className="btn btn-size">PEMESANAN</button>
                            </Link>
                        }
                        {/* {this.state.userLoggedIn.role.map(role => 
                         {if(role === "kasir"){
                             return (
                            <Link to={'/initial-balance'}>
                            <button className="btn btn-size">KASIR</button>
                            </Link>)
                            }
                            else if(role === "stok"){
                                return (
                                <Link to={'/production'}>
                                <button className="btn btn-size">PRODUKSI</button>
                                </Link>)
                            }
                            else if(role === "admin"){
                                return (
                                <Link to={'/booking'}>
                                <button className="btn btn-size">PEMESANAN</button>
                                </Link>)
                            } else {
                                return (
                                <Link to={'/#'}>
                                <button className="btn btn-size">KOSONG</button>
                                </Link>
                                )
                            }
                          }
                         ) 
                        } */}
                        {/* <Link to={'/initial-balance'}>
                            <button className="btn btn-size">KASIR</button>
                        </Link>
                        <Link to={'/booking'}>
                            <button className="btn btn-size">PEMESANAN</button>
                        </Link>
                        <Link to={'/production'}>
                            <button className="btn btn-size">PRODUKSI</button>
                        </Link> */}
                        {/* {this.doFilter()} */}
                    </Col>
                </Row>
            </Container>
        </section>
        )
    }
}

export default Selection