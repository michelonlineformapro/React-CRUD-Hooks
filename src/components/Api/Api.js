import React, {Component} from 'react';
import axios from "axios";
import './Api.css';
import $ from 'jquery';

//Base du CRUD = https://www.digitalocean.com/community/tutorials/react-axios-react-fr

//Glossaire = https://www.javatpoint.com/react-multiple-checkbox

export default class Api extends Component {
    constructor(props) {
        super(props);

        //Init de l'etat de app
        this.state = {
            livres: [],
            id: null,
            nomLivre: "",
            descriptionLivre: "",
            prixLivre: "",
            imageLivre: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteLivre = this.deleteLivre.bind(this);
    }

    //componentDidMount() est appelée immédiatement après que le composant est monté
    // (inséré dans l’arbre).
    // C’est ici que vous devriez placer les initialisations
    // qui requièrent l’existence de nœuds du DOM. Si vous avez besoin de charger des données
    // depuis un point d’accès distant, c’est aussi le bon endroit pour déclencher votre requête réseau.
    componentDidMount() {
        //jQuery add form show hide
        $("#show_hide_form").click(function (){
            $("#add-livre-form").toggle("slow");
        });

        $("#show-hide-edit-form").click(function (){

        })

        //Ici soit fetch js es6 ou axios.get
        axios.get("http://localhost:3001/livres")
            //Promesse
            .then(response => {
                const livres = response.data;
                this.setState({
                    livres
                })
            })
    }


    //Changement d'etat et recup des valeurs des inputs pour ajouter un livre
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            id: event.target.value
        })
    }


    //Validation du formulaire et sauvegarde des elements
    async handleSubmit(event) {
        event.preventDefault();

        //Requète http
        await axios.post("http://localhost:3001/livres", {
            nomLivre: this.state.nomLivre,
            descriptionLivre: this.state.descriptionLivre,
            prixLivre: this.state.prixLivre,
            imageLivre: this.state.imageLivre
        })
            //Promesse
            .then(response => {
                console.log(response.data)
                this.setState({})
                window.location.reload(true);
            })
            .catch(err => {
                console.log("Erreur lors de l'ajout du livre : " + err)
            })
    }

    async handleUpdateSubmit(id, event){
        event.preventDefault()

        const livreDatas = {
            id: this.state.livres.filter(livre => livre.id !== id),
            nomLivre: this.state.nomLivre,
            descriptionLivre: this.state.descriptionLivre,
            prixLivre: this.state.prixLivre,
            imageLivre: this.state.imageLivre
        }
        //Requète Http
        await axios.put(`http://localhost:3001/livres/${id}`, livreDatas)
        //Promesse
            .then(response => {
                console.log(response.data)
            })
            .catch(err => {
                console.log("Erreur de mise a jour : " + err)
            })
    }


    //Supprimer un produit
    async deleteLivre(id) {

        const livreID = this.state.livres.filter(livre => livre.id !== id);
        this.setState({livreID})

        await axios.delete(`http://localhost:3001/livres/${id}`)
            .then(response => {
                console.log(response.data);
                window.location.reload()
            })
            .catch(err => {
                console.log("Erreur 404 = " + err)
            })
    }

    //Le rendu
    render() {
        return (
            <div>

                <button type={"submit"}  className="button is-warning mt-3 livre-description" id="show_hide_form">Ajouter un livre</button>
                <div id="add-livre-form" className="show-hide">
                    {/* Ajouter un livre */}
                    <form onSubmit={this.handleSubmit}>
                        <div className="field">
                            <label className="label">Nom du livre</label>
                            <input
                                id="nomLivre"
                                name="nomLivre"
                                className="input"
                                type="text"
                                required
                                onChange={this.handleChange}
                                placeholder="Livre PHP"
                            />
                        </div>

                        <div className="field">
                            <label className="label">Description du livre</label>
                            <textarea
                                id="descriptionLivre"
                                name="descriptionLivre"
                                className="textarea"
                                required
                                onChange={this.handleChange}
                                placeholder="Livre de cours et exercice PHP"
                            />
                        </div>

                        <div className="field">
                            <label className="label">Prix du livre</label>
                            <input
                                id="prixLivre"
                                name="prixLivre"
                                className="input"
                                type="number"
                                step="0.01"
                                required
                                onChange={this.handleChange}
                                placeholder="25.25"
                            />
                        </div>

                        <div className="field">
                            <label className="label">Image du livre</label>
                            <input
                                id="imageLivre"
                                name="imageLivre"
                                className="input"
                                type="text"
                                required
                                onChange={this.handleChange}
                                placeholder="https://www.dunod.com/sites/default/files/styles/principal_desktop/public/thumbnails/image/9782100743209-001-X.jpeg"
                            />
                        </div>
                        <button type="submit" className="button is-success">Ajoute le livre</button>
                    </form>
                </div>

                <div className="container is-fluid is-desktop">
                    <div id="api-content" className="is-horizontal is-multiline columns">
                        {/* Boucle autour des carte avec map */}
                        {this.state.livres.map(livre =>
                            <div className="column is-2" key={livre.id}>
                                <div className="card">
                                    <div className="card-image">
                                        <h3 className="title is-2 has-text-centered has-text-info">{livre.nomLivre}</h3>
                                        <figure className="image">
                                            <img id="api-card" src={livre.imageLivre} alt={livre.nomLivre}
                                                 title={livre.nomLivre}/>
                                        </figure>
                                    </div>
                                    <div className="card-content">
                                        <div className="content">
                                            <p className="has-text-danger">DESCRIPTION :</p>
                                            <p className="livre-description">{livre.descriptionLivre}</p>
                                            <p className="has-text-danger">PRIX :</p>
                                            <p className="title is-3 has-text-success">{livre.prixLivre} €</p>
                                        </div>
                                        <div className="card-content has-text-centered">
                                            <button name="id" id="id" onClick={(event) => this.deleteLivre(livre.id, event)} type={"submit"} className="button is-danger">Supprimer</button>
                                            <br /><br />
                                            <button id="show-hide-edit-form" type={"submit"} className="button is-dark">Editer</button>
                                            <a href="#update-livre-form" className="button is-success">Mettre a jour</a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <br />
                </div>

                <div id="update-livre-form">
                    <h3 className="title is-3 has-text-centered has-text-danger">Mettre à jour le livre</h3>
                    <form onSubmit={this.handleUpdateSubmit}>

                        <div className="field">
                            <label className="label">Nom du livre</label>
                            <input
                                id="nomLivre"
                                name="nomLivre"
                                className="input"
                                type="text"
                                required
                                onChange={this.handleChange}

                            />
                        </div>


                        <div className="field">
                            <label className="label">Description du livre</label>
                            <textarea
                                id="descriptionLivre"
                                name="descriptionLivre"
                                className="textarea"
                                required
                                onChange={this.handleChange}
                                placeholder="Livre de cours et exercice PHP"
                            />
                        </div>

                        <div className="field">
                            <label className="label">Prix du livre</label>
                            <input
                                id="prixLivre"
                                name="prixLivre"
                                className="input"
                                type="number"
                                step="0.01"
                                required
                                onChange={this.handleChange}
                                placeholder="25.25"
                            />
                        </div>

                        <div className="field">
                            <label className="label">Image du livre</label>
                            <input
                                id="imageLivre"
                                name="imageLivre"
                                className="input"
                                type="text"
                                required
                                onChange={this.handleChange}
                                placeholder="https://www.dunod.com/sites/default/files/styles/principal_desktop/public/thumbnails/image/9782100743209-001-X.jpeg"
                            />
                        </div>
                        <button type="submit" className="button is-info">Mettre à jour le livre</button>
                    </form>
                </div>


            </div>
        )
    }
}
