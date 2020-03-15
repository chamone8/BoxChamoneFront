import React, { Component } from 'react';
import './style.css';
import api from '../../services/api';
import img from '../../assets/images.png';

export default class boxes extends Component {
    state = {
        box: [],
        productInfo:{},
        page:1
    }
    async componentDidMount() {
        this.loadDocs();


    }

    loadDocs = async (page = 1) =>{
        

        const response = await api.get(`boxe?page=${page}`);
       
        const {docs, ...productInfo} = response.data;
        this.setState({ box: docs, productInfo, page });
        
    }


    prevPage = () =>{
        const {page} = this.state;
        
        if(page === 1) return;
        
        const pageNumber = page - 1;
        
        this.loadDocs(pageNumber);

    }

    nextPage = () => {
      
        const {page , productInfo} = this.state;
        
        if(page === productInfo.pages) return;
        
        const pageNumber = page + 1;
        
        this.loadDocs(pageNumber);

      

    }

    render() {
//        console.log(this.state.box.data)
        const {box} = this.state;
        
        return (
            <div id="box-container" >
                <header>
                    <h1>Listas de Boxes Criados</h1>
                </header>

                <ul>
                    {box.map(docs => (

                        <li key={docs._id}>
                            <img className="docs" src={img} alt=""></img>
                            <a href={"box/"+docs._id}>
                                
                                <strong>{docs.title}</strong>
                            </a>

                        </li>

                    ))}
                </ul>
                    <div className="actions">
                        <button onClick={this.prevPage}>Anterior</button>
                        <button onClick={this.nextPage}>Proximo</button>
                    </div>
            </div>
        );
    }
}

