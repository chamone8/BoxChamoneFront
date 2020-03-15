import React, { Component } from 'react';
import api from '../../services/api';
import logo from '../../assets/logo.png'
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap';


export default class main extends Component {
    state = {
        newBox: ""
    };

    handleSubmit = async e => {
        e.preventDefault();
        console.log("io")

        const response = await api.post('boxes', {
            title: this.state.newBox
        });
        console.log(response)
        this.props.history.push(`/box/${response.data._id}`);
    };

    handleInputChange = (evet) => {
        this.setState({ newBox: evet.target.value })
    }


    render() {
        return (
            <div className="container">
                
                    <div id="main-container" >
                        <form onSubmit={this.handleSubmit}>
                            <img src={logo} alt="" className="img-fluid" />
                            <input  className="form-control" placeholder="Criar um Box" value={this.state.newBox} onChange={this.handleInputChange} required/>
                            <div className="row">
                                <button className="btn btn-info" type="submit">Criar</button>
                                <a className="btn btn-primary boxes" href="https://frontbox.herokuapp.com/boxes">Boxes</a>
                            </div>

                        </form>
                    
                </div>
            </div>
        );
    }
}
