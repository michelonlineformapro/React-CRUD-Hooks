import React, {useState} from 'react';

import './Hooks.css';

function Hooks() {

    //Creation d'un hook commentaire
    //C une constante tableau avec une valeur par defaut et une fonction qui modifie la valeur par defaut
    //useState modifie l'etat de la constante
    const [commentaire, setCommentaire] = useState("Modifier le message pour qu'il change dans l'alerte déclenchée par le bouton")


    return (
        <div id="hooks-content" className="Hooks">
            <div className="field">
                <label className="label">Votre message</label>
                {/*ici textarea prend comme valeur commentaire du hooks + une fonction qui recupe la nouvelle valeur (etat)*/}
                <textarea
                    className="textarea"
                    value={commentaire}
                    onChange={(event) => setCommentaire(event.target.value)}
                >
            </textarea>
                <button onClick={() => alert(commentaire)} type={"submit"} className={"mt-3 button is-info"}>Afficher le
                    nouveau message
                </button>
            </div>
            <h2 className="title is-2 has-text-warning p-3 has-text-centered has-background-info">OBJET + MAP + USESTATE</h2>
            <Produits/>
        </div>
    )
}

//Liste des produits
function Produits() {

    //useState   est un hook qui permet d’ajouter le state local React à des composants fonctions.
    //Un hook est une fonction qui permet de « se brancher » (to hook up) sur des fonctionnalités React.

    //Syntaxe: tableau + decomposition et objet + destructuration
    //Sans la decomposition
    // const produitsState = useState(0)
    // const produitsQuantite = produitsState[0]
    // const setProduitsQuantite = produitsState[1]

    //Quantité du produits
    const prixProduit = 15;

    //Creation du hook var par defaut + fonction de changement d'etat
    const [produitsQuantite, setProduitQuantite] = useState(0);
    //Montrer et cacher le panier
    const [showPanier, setShowPanier] = useState(false);

    const produits = [
        {
            id: 1,
            nom: "Table",
            description: "Table en plastique de couleur grise",
            prix: 25.25,
            image: "https://www.cocktail-scandinave.fr/Vbeta2018/wp-content/uploads/2018/02/RGATA180AL.jpg",
            stock: true
        },
        {
            id: 2,
            nom: "Chaise",
            description: "Chaise de bois de couleur maron",
            prix: 250.25,
            image: "https://cdn.connox.fr/m/100030/140048/media/stoelcker/Frankfurter-Kuechenstuhl/Frankfurter-Kuechenstuhl-Buche-frei-1200x1200.jpg",
            stock: true
        },
        {
            id: 3,
            nom: "Bureau",
            description: "Bureau de 2m X 1.5m de couleur bleu",
            prix: 78.25,
            image: "https://www.ikea.com/fr/fr/images/products/lagkapten-alex-bureau-effet-chene-blanchi-blanc__0977487_pe813615_s5.jpg",
            stock: false
        }
    ];

    return (
        <div id="full-produit-container" className="container is-fluid">
            <div id="panier">
                {/*Le panier*/}
                <div className="">
                    <aside>
                        <h3 className="title is-3 has-text-info">PANIER</h3>
                        <div>
                            <p className="has-text-danger">TOUS A : {prixProduit} € </p>
                            <button className="button is-warning mt-3"
                                    onClick={() => setProduitQuantite(produitsQuantite + 1)}>Ajouter
                            </button>
                            <p>Quantités : {produitsQuantite}</p>
                        </div>
                        <h4 className="title is-4 has-text-warning">TOTAL : {prixProduit * produitsQuantite} €</h4>
                    </aside>
                </div>
            </div>

            <div id="produits" className="columns is-multiline">

                {produits.map(produit => {
                    return (
                        <div className="column is-4 mt-3" key={produit.id}>
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img src={produit.image} alt={produit.nom} title={produit.nom}/>
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <div className="media">
                                        <div className="media-left">
                                            <figure className="image is-48x48">
                                                <img src={produit.image} alt={produit.nom} title={produit.nom}/>
                                            </figure>
                                        </div>
                                        <div className="media-content">
                                            <p className="title is-4">{produit.nom}</p>
                                            <p className="subtitle is-6">Prix : {produit.prix} € </p>
                                        </div>
                                    </div>

                                    <div className="content">
                                        <p><b>DESCRIPTION : </b>{produit.description}</p>
                                        <p className="has-text-info">En stock : {produit.stock ? "OUI" : "NON"}</p>
                                        <button className="button is-warning"
                                                onClick={() => setProduitQuantite(produitsQuantite + 1)}>
                                            Ajouter au panier
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default Hooks;
