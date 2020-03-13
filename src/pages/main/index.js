import React, { Component } from 'react';
import api from '../../services/api';
import logo from '../../assets/logo.png'
import './style.css';


export default class main extends Component {
    state = {
        newBox:""
    };

    handleSubmit = async e => {
        e.preventDefault();
        
        const response = await api.post('boxes', {
            title: this.state.newBox
        });

            this.props.history.push(`/box/${response.data._id}`);
    };

    handleInputChange = (evet) =>{
        this.setState({newBox: evet.target.value})
    }


    render() {
        return (
            <div id="main-container" >
                <form onSubmit={this.handleSubmit}>
                    <img src={logo} alt="" className="img"/>
                    <input placeholder="Criar um Box" value={this.state.newBox} onChange={this.handleInputChange} />
                    <button type="submit">Criar</button>
                    <a class="boxes" href="https://frontbox.herokuapp.com/boxes">Listas Boxes</a>
                </form>
            </div>
        );
    }
}
