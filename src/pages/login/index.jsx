import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Switch, Routes, Route , Link} from 'react-router-dom';
import './login.css'

import Home from "../home/index";


function Login () {

    const geradorDeToken =(length) => {
        let token = "";
        let characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < length; i++) {
          token += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return token;
      }

    const url = 'http://localhost:3000/user'

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const logar = () => {
        const emailInput = email

        fetch('http://localhost:3000/administrador')
        .then((reponse) => reponse.json())
        .then((reponse) => {
             console.log(reponse) 
             const [{email, senha}] = reponse
             if(emailInput === email && password === senha){
                const adminToken = geradorDeToken(50)
                sessionStorage.setItem('AdmSession', adminToken)
                window.location.href=`http://localhost:3001/admin`;
             }
            })


         fetch(url)
            .then((reponse) => reponse.json())
            .then((reponse) => {
                const [...user] = reponse
                const loginVerificado = user.filter(element => element.email === emailInput && element.senha === password) 
    
                const [{id,nome, email, senha,}] = loginVerificado
                console.log(email, senha)
                if(loginVerificado.length === 1){
                   const userSession = geradorDeToken(50)
                   sessionStorage.setItem('userSession', userSession)
                   window.location.href=`http://localhost:3001/home?user=${id}`;
                   pegarDadosDoLogin({nome, id})
                }

            });
      
    }   
    
    const pegarDadosDoLogin =({nome, id}) =>{
        console.log(nome, id)  
        sessionStorage.setItem('user', nome)     
    }

    return(
        <div className="formLogin">
            
            <div className="item foto">
                <img src="https://consultoriaprebianchi.com.br/wp-content/uploads/2021/05/Lei-Geral-de-Prote%C3%A7%C3%A3o-de-Dados.png" alt="" />
            </div>
            <div className="item login">
                
                <h1>
                    login
                </h1>
                <form >
                        <div className="email div-input" >
                            <img className="gmail" src="https://img.icons8.com/neon/96/null/experimental-filled-message-neon.png"/>
                            <input type="text"         
                                placeholder="email"
                                required
                                autoComplete="on"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                        </div>
                        <div className="password div-input">
                        <img className="key" src="https://img.icons8.com/ultraviolet/40/null/password.png"/>
                            <input type="password" 
                                placeholder="senha"
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>  
                        <div className="div-entrar">
                            <input className="entrar" type="button"  value={'entrar'} onClick={logar}/>
                        </div>  
                        <div className="div-input">
                            <p>ainda não tem cadastro? <Link to='/cadastro' >cadastre-se </Link></p>
                        </div>                 
                </form>
            </div>
        </div>
    )

}

export default Login;