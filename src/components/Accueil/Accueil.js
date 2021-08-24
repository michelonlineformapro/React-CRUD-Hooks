import React, {Component} from 'react';
import './Accueil.css';
import {render} from "@testing-library/react";

//SRC = https://openclassrooms.com/fr/courses/7008001-debutez-avec-react/7134800-ecrivez-du-code-modulaire-avec-les-composants-en-jsx

//Generer des composants = npx generate-react-cli component Box

//Ici on appel les composant Comme des balises HTML avec des majuscules
function Accueil(){

        return(
            <div className="mt-3 has-text-centered" id="accueil-content">
                <h2 className="title is-2 has-text-danger">TITRE FONCTION ACCUEIL</h2>
                <p>1) La fonction article est composant appelé dans la fonction accueil comme une balise HTML</p>
                <Article/>
                <ApprendreMap/>
                <BoucleMap/>
                <Condition/>
                <PropsFunc name='Michael'/>
                <Evenement/>
            </div>

        )

}

function Article(){
    //On stock le titre dans une constante
    const titreArticle = "ARTICLE"
    //La constante affiche le contenu grace a l'interpolation
    return(
        <div className="mt-3" id="accueil-content">
            <h4 className="title is-4 has-text-centered has-text-success">{titreArticle}</h4>
        </div>
    )
}

function ApprendreMap(){
    const tableau = [15, "michael", 150.25];
    const mapTableau = tableau.map(x => x * 2);
    console.log(mapTableau);
    return(
        <div>
            <p>Javascript map()  passe sur chaque élément d'un tableau. Elle lui applique une fonction, et renvoie un nouveau tableau contenant les résultats de cette fonction appliquée sur chaque élément.</p>
            <p className={"has-text-success"}>{mapTableau}</p>
            <p>Ici la chaine de caractère "michael" * 2 retourne une erreur NaN (not a number)</p>
            <p>On va donc pourvoir boucler sur des données json</p>
        </div>
    )
}

function BoucleMap(){
    const datas = ["choux", "cailloux", "poux", "genoux"];
    return (
        <div>
            <h4 className="title is-4 has-text-warning">Boucle Map + key</h4>
            <ol className="menu-list">
                {datas.map((data, index) =>{
                    return <li key={`${data}-${index}`}>{data}</li>
                })}
            </ol>
        </div>
    )
}

function Condition(){
    //Creation d'un objet
    let dataObject = [
        {
            id:1,
            nom:"Bob",
            age:35,
            taille: 1.75,
            homme: true

        },
        {
            id:2,
            nom:"Sophie",
            age:89,
            taille: 1.55,
            homme: false
        }
    ]

    return(
        <div>
            <h5 className="title is-5 has-text-info">Boucle + Key + Object + Condition</h5>
            <ul>
                {/*Boucle map() + condition ternaire */}
                {dataObject.map(objet => {
                    return <li key={objet.id}>
                        id = {objet.id} -
                        nom = {objet.nom} -
                        taille = {objet.taille} metres -
                        genre = {objet.homme ? "HOMME" : "FEMME"}
                    </li>
                })}
            </ul>
        </div>
    )
}

//Utilisé des props = <PropFunc prenom="Michael"/>
function PropsFunc(props){
    const prenom = props.name;
    return <div>
        <h5 className="title is-5 has-text-primary">Un composnant avec une props en attribut</h5>
        Test de props = {prenom}
    </div>
}

//Test d'evenement = ici on passe nom e paramètre
//On appel handleClick avec onClick + fonction anonyme + nom en paramètre
function Evenement(nom){
    return <button onClick={() => handleClick(nom)} className="mt-3 button is-warning">Un événement</button>
}

//Déclencher evenement
function handleClick(){
    const nom = "Michael"
    alert(`Salut ${nom}`)
}

export default Accueil