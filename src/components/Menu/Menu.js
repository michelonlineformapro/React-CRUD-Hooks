import React from 'react';
//Le css styles
import './Menu.css';
//Le router
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Taches from "../Taches/Taches";
import Accueil from "../Accueil/Accueil";
import Api from "../Api/Api";
import Hooks from "../Hooks/Hooks";
import HooksApi from "../HooksApi/HooksApi";
import AjouterLivres from "../HooksApi/AjouterLivres";


export default function Menu() {
    return (
        <Router>
            <div>
                <nav className={"navbar"} role={"navigation"}>
                    <div className={"navbar-start"}>
                        <span className={"navbar-item"}>
                            <Link to="/">Accueil</Link>
                        </span>
                        <span className={"navbar-item"}>
                            <Link to="/taches">Liste des taches</Link>
                        </span>
                        <span className={"navbar-item"}>
                            <Link to="/api">Api</Link>
                        </span>
                        <span className={"navbar-item"}>
                            <Link to="/hooks">Hooks</Link>
                        </span>

                        <span className="navbar-item">
                             <div className="navbar-item has-dropdown is-hoverable">
                                <div className="navbar-link">
                                  CRUD
                                </div>
                                    <div className="navbar-dropdown">
                                        <Link className="navbar-item" to="/livres">Livre</Link>
                                        <br />
                                        <Link className="navbar-item" to="/ajouter_livre">Ajouter</Link>
                                    </div>

                              </div>
                        </span>
                    </div>
                </nav>

                {/* La balise switch regarde a travers les enfants des Route et rend les elements qui matches */}
                <Switch>
                    {/* ici exact specifie le point d'entrée par defaut*/}
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/taches">
                        <Tasks/>
                    </Route>
                    <Route path="/api">
                        <GetApi/>
                    </Route>
                    <Route path="/hooks">
                        <GetHooks/>
                    </Route>
                    <Route path="/livres">
                        <GetLivres/>
                    </Route>
                    <Route path="/ajouter_livre">
                        <AddLivres/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

function Home(){
    return <Accueil/>
}

function Tasks(){
    return <Taches/>
}

function GetApi(){
    return <Api/>
}

function GetHooks(){
    return <Hooks/>
}

function GetLivres(){
    return <HooksApi/>
}

function AddLivres(){
    return <AjouterLivres/>
}


