import React, {useState, useEffect} from 'react';

import './HooksApi.css';
import axios from "axios";

function AjouterLivres(){


    //Init des valeurs de l'objet livres Json
    const livreObject = [
        {
            id: null,
            nomLivre: "",
            descriptionLivre: "",
            prixLivre: "",
            imageLivre: ""
        }
    ]

    //les hooks livres et soumission
    //Variable par defaut + fonction de mofif (mutateur (setter))

    const [livre, setLivre] = useState(livreObject);
    //Soumisiion du formulaire
    const [soumis, setSoumis] = useState(false);

    //fonction de tracking reperer les changement dans les inputs et les changements d'etats
    const handleInputChange = event => {
        //Recup des attribut input name et value
        const {name, value} = event.target;

        //affectation par decomposition (extrait des données d'un tableau ou un objet et creer un nouveau tableau)
        //Appel du mutateur setLivre
        //On decompose l'objet livre puis le tableau des attributs name sont egales aux attributs values
        setLivre({...livre, [name]: value})
        console.log(setLivre)
    }

    //Sauver les données grace au hooks et un objet data (livre)
    const saveLivre = () => {
        let data = {
            nomLivre: livre.nomLivre,
            descriptionLivre: livre.descriptionLivre,
            prixLivre: livre.prixLivre,
            imageLivre: livre.imageLivre
        }

        //Creation de la requète HTTP post
        axios.post("http://localhost:3001/livres", data)
            //Creation de la promesse
            .then(response => {
                //Le mutateur du hook
                setLivre({
                    id: response.data.id,
                    nomLivre: response.data.nomLivre,
                    descriptionLivre: response.data.descriptionLivre,
                    prixLivre: response.data.prixLivre,
                    imageLivre: response.data.imageLivre
                });
                //La soumission passe a true
                setSoumis(true);
                //Debug console: f12
                console.log(response.data);

            })
            //Sinon on declenche une erreur
            .catch(err => {
                console.log("Erreur lors de l'ajout du livre : " + err);
            })
    }
    //On vide le formulaire apres ajout du livre
    const newLivre = () => {
        setLivre(livreObject);
        setSoumis(false);
    }

    return(
        <div id="ajouter-livre-form">
            {/*Si le formulaire est soumis ternaire */}
            {soumis ? (
                <div>
                    <h4 className="title is-4 has-text-warning">Le livre à bien été ajouté !</h4>
                    <button className="button is-success" onClick={newLivre}>Ajouter un autre livre ?</button>
                    <br />
                    <a href="/livres" className="mt-3 button is-danger">Consulter les livres</a>
                </div>
            ) : (
                <div className="container is-fluid">
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

                    <button className="button is-danger" onClick={saveLivre}>Ajouter le livre</button>

                </div>

            )}
        </div>
    )
}

export default AjouterLivres;