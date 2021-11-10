import React, {useState, useEffect} from 'react';

import './HooksApi.css';
import axios from "axios";
import $ from "jquery";


function HooksApi() {

    //Pour update livre
    const initLivreState = {
        props:null,
        id:null,
        nomLivre:"",
        descriptionLivre: "",
        prixLivre: "",
        imageLivre: ""
    }


    //les hooks livres et soumission
    //Variable par defaut + fonction de mofif (mutateur (setter))

    const [livre, setLivre] = useState([]);
    //Livre courant (recup by id)
    const [livreCourant, setLivreCourant] = useState(null);
    //Index du livre
    const [livreIndex, setLivreIndex] = useState(-1);
    //Rechercher un livre par son nom
    const [rechercherLivre, setRechercherLivre] = useState("");
    //Soumisiion du formulaire
    const [soumis, setSoumis] = useState(false);

    // Hook useEffect comme à une combinaison de componentDidMount, componentDidUpdate, et componentWillUnmount.
    //On utilise ce Hook pour indiquer à React que notre composant doit exécuter quelque chose
    // après chaque affichage. en l'ocurence afficher les livres

    useEffect(() => {
        afficherLivres()
    }, [])

    //Pour jQuery
    function componentDidMount()
    {
        $("#edit-form-livre").toggle("slow");
    }

    //Afficher les données
    const afficherLivres = () => {
        //Requète HTTP
        axios.get("http://localhost:3001/livres")
            //Promesse
            .then(response => {
                //On utilise le mutateur (setter)
                setLivre(response.data)
                console.log(response.data)
            })
            //Sinon une erreur
            .catch(err => {
                console.log("Erreur d'affichage des livre : " + err)
            })

    }

    //Changement de l'etat de input
    const handleInputChange = event =>{
        const {name, value} = event.target;
        setLivreCourant({...livreCourant,[name]: value})
    }

    const updateLivre = () =>{
        let data = {
            id: livreCourant.id,
            nomLivre: livreCourant.nomLivre,
            descriptionLivre: livreCourant.descriptionLivre,
            prixLivre: livreCourant.prixLivre,
            imageLivre: livreCourant.imageLivre
        }
        //Requète Http
        axios.put(` http://localhost:3001/livres/${livreCourant.id}`, data)
            .then(response => {
                setLivreCourant({...livreCourant})
                console.log(response.data)
                window.location.reload("/livres")
            })
            .catch(err => {
                console.log("Erreur de mise a jour ! " + err)
            })
    }

    //Supprimer un livre
    const deleteLivre = () =>{
        axios.delete(`http://localhost:3001/livres/${livreCourant.id}`)
            .then(response => {
                alert("Confirmer la suppression du livre ?")
                console.log(response.data)
                window.location.reload("/livres")
            })
            .catch(err => {
                console.log("Erreur lors de la supression du livre :" + err);
            })
    }



    //Rafraichir etat des livres
    const rafraichirLivre = () => {
        afficherLivres();
        setLivreCourant(null);
        setLivreIndex(-1);
    }

    //Livre courant
    const livreById = (livre, index) => {
        setLivreCourant(livre);
        setLivreIndex(index)
        console.log(livre)
        console.log(index)
    }


    return (
        <div id="hooks-api-content">
            {livreCourant ? (
                <div className="container">
                    <div className="columns">
                        <div className="column">
                            <img src={livreCourant.imageLivre} className="is-square" alt="Placeholder image"/>
                        </div>
                        <div className="column">
                            <h2 className="title is-2 has-text-info">{livreCourant.nomLivre}</h2>
                            <p><b>DESCRIPTION :</b></p>
                            <p>{livreCourant.descriptionLivre}</p>
                            <p><b>PRIX :</b></p>
                            <p className="has-text-success title is-2">{livreCourant.prixLivre} €</p>
                            <button className="mt-3 button is-info">Ajouter au panier</button>
                            <br/>
                            <a href="/livres" className="mt-3 button is-warning">Retour</a>
                            <br/>
                            <button onClick={componentDidMount} id="open-edit-form" className="mt-3 button is-success">Editer</button>
                            <br/>
                            <button onClick={deleteLivre} id="open-edit-form" className="mt-3 button is-danger">Supprimer</button>
                        </div>
                    </div>

                    <div id="edit-form-livre" className="mt-3 container">
                        <h2 className="title is-2 has-text-success has-text-centered">EDITER LIVRE</h2>
                        <div className="field">
                            <label className="label">Nom du livre</label>
                            <input
                                type="text"
                                className="input"
                                id="nomLivre"
                                name="nomLivre"
                                placeholder="Nom du livre"
                                required
                                value={livre.nomLivre}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="field">
                            <label className="label">Description du livre</label>
                            <textarea
                                className="input"
                                id="descriptionLivre"
                                name="descriptionLivre"
                                required
                                rows="5"
                                placeholder="Description du livre"
                                value={livre.descriptionLivre}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="field">
                            <label className="label">Prix du livre</label>
                            <input
                                type="number"
                                step='0.01'
                                className="input"
                                id="prixLivre"
                                placeholder="Prix du livre"
                                name="prixLivre"
                                required
                                value={livre.prixLivre}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="field">
                            <label className="label">Image du livre</label>
                            <input
                                type="text"
                                className="input"
                                id="imageLivre"
                                name="imageLivre"
                                placeholder="URL de l'image du livre"
                                required
                                value={livre.imageLivre}
                                onChange={handleInputChange}
                            />
                        </div>

                        <button className="button is-danger" onClick={updateLivre}>Mettre à jour le livre</button>
                    </div>

                </div>
            ) : (
                {/*Afficher les livres*/},
                    <div className="is-horizontal is-multiline columns">
                        {/*Boucle des livres json*/}
                        {livre.map((book, index) => (
                            <div className="column is-2" key={index}>
                                <div className="card">
                                    <div className="card-image">
                                        <figure className="image">
                                            <img src={book.imageLivre} className="is-square" alt="Placeholder image"/>
                                        </figure>
                                    </div>
                                    <div className="card-content">
                                        <div className="media">
                                            <div className="media-left">
                                                <figure className="image is-48x48">
                                                    <img src={book.imageLivre} className="is-square"
                                                         alt="Placeholder image"/>
                                                </figure>
                                            </div>
                                            <div className="media-content">
                                                <p className="title is-4">{book.nomLivre}</p>
                                            </div>
                                        </div>

                                        <div className="content">
                                            {book.descriptionLivre}
                                            <div className="has-text-centered">
                                                <button onClick={() => livreById(book, index)}
                                                        className="mt-3 button is-info">Détails
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ), [])}
                        <div>

                        </div>
                    </div>
            )}

        </div>

    )

}


export default HooksApi;
