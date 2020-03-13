import React, { Component } from 'react';
import logo from '../../assets/logo.png'
import './style.css';
import { MdInsertDriveFile } from 'react-icons/md';
import api from '../../services/api';
import { formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Dropzone from 'react-dropzone';
import socket from 'socket.io-client';

export default class Box extends Component {

    state = {
        box: {}
    }
    async componentDidMount() {
        this.subscribeToNewFiles();


        const box = this.props.match.params.id;
        const response = await api.get(`boxes/${box}`);
        this.setState({ box: response.data })

    }


    subscribeToNewFiles = () => {
        const box = this.props.match.params.id;
        const io = socket("https://chamonebox.herokuapp.com/");

        io.emit("connectRoom", box);

        io.on('file', data => {
            this.setState({
                box: { ...this.state.box, files: [data, ...this.state.box.files] }
            });
        });

    }


 //funcção que criar o anexo
    handleUpload = files => {
        files.forEach(file => {
            const data = new FormData(); // Formulario
            const box = this.props.match.params.id;


            data.append('file', file);
            api.post(`boxes/${box}/files`, data);
        

        });
    };


    render() {

        return (
            <div id="box-container">
                <header>
                    <img src={logo} alt="" className="imagem" />
                    <h1>{this.state.box.title}</h1>
                </header>

                {/* Aqui Aqui começa o clique e arraste*/}
                <Dropzone onDropAccepted={this.handleUpload}>
                    {({ getRootProps, getInputProps }) => (
                        <div className="upload" {...getRootProps()}>
                            <input {...getInputProps()} />

                            <p>Arraste arquilos ou Clique aqui</p>
                        </div>

                    )}
                </Dropzone>


                <ul>
                    {this.state.box.files && this.state.box.files.map(files => (

                        <li key={files._id}>
                            <a className="fileInfo" href={files.url} target="blank">
                                <MdInsertDriveFile size={24} color="#A5cfff" />
                                <strong>{files.title}</strong>
                            </a>

                            <span>
                                há{" "}
                                {
                                    formatDistance(new Date(files.createdAt), new Date(), { locale: pt })
                                }
                            </span>
                        </li>

                    ))}

                </ul>
                <a className="main" href="https://frontbox.herokuapp.com/">Voltar</a>

            </div>
        );
    }
}
