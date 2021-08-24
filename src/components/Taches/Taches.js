import React, {Component} from 'react';
import './Taches.css';


class Taches extends Component {
    constructor(props) {
        super(props);
        //Init de etat de la liste
        this.state = {
            items: [],
            text: ""
        }
        //Focus sur this et appel des fonctions sur les evenements
        //Les 2 fonction change et submit
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeTasks = this.removeTasks.bind(this);

    }

    //Le rendu
    render(){
        return(
            <div id={"taches-content"}>
                <h3 className="title is-3 has-text-centered has-text-info-dark">LISTE DES TACHES A FAIRES</h3>
                {/*Import du composant d'affichage des taches*/}

                {/*A la soumission du formulaire on appel la fonction handleSubmit*/}
               <form onSubmit={this.handleSubmit}>
                   <div className="field">
                       <label className="label">Enter la tache à réaliser</label>
                       {/*Input est reactif grace a l'appel de handleChange = on recup la value de input*/}
                       <ul>
                           {this.state.items.map((item) => {
                               return <li key={item.id} onClick={this.removeTasks.bind(this, item)} className={"tache-item"}>{item.text}</li>
                           })}
                       </ul>
                       <input
                           id={"input-taches"}
                           type={"text"}
                           className="input"
                           placeholder={"Votre taches"}
                           onChange={this.handleChange}
                           value={this.state.text}
                           />
                           <button id={"btn-add-taches"} className="button is-info">Ajouter la taches</button>


                   </div>
               </form>
            </div>
        )
    }

    //Les fonctions de modification de l'etat de app
    handleChange(event){
        //On recup la valeur de input
        this.setState({
            text: event.target.value
        })
    }

    handleSubmit(event){
        //On evite un rechargement de la page pour de l'async
        event.preventDefault();

        //Nouvelle taches
        const newTaches = {
            text: this.state.text,
            id: Date.now()
        }

        //Verif que le champ n'est pas vide
        if(this.state.text.length === 0){
            return null;
        }else {
            //On ajoute texte au tableau items avec concat
            //Fusioner un ou plusieur nouveau tableau sans modifier l'existant
            this.setState(state => ({
                items: this.state.items.concat(newTaches),
                //On vide le champ input
                text: ""
            }))
        }
    }

    removeTasks(value){
        let items = this.state.items.slice();
        items.splice(items.indexOf(value), 1);
        this.setState({
            items
        })
    }
}

export default Taches;
