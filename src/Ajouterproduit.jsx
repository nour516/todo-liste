import { useState } from 'react'

function AjouterProduit({produits, setProduits}) {
    const [nom, setNom] = useState("");
    const [prix, setPrix] = useState("");
    const [quantite, setQuantite] = useState("");

    function ViderFormulaire() {
        setNom("");
        setPrix("");
        setQuantite("");
    }

    function Ajouter() {

        const P = {
            id: Date.now(),
            nom: nom,
            prix: Number(prix),
            quantite: Number(quantite)
        };

        setProduits([...produits, P]);

        ViderFormulaire();
    }

    return (
        <>
            <div>
                <h1>FORMULAIRE D'AJOUTER</h1>

                <label>NOM</label>
                <input
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                />

                <label>PRIX</label>
                <input
                    type="number"
                    value={prix}
                    onChange={(e) => setPrix(e.target.value)}
                />

                <label>QUANTITE</label>
                <input
                    type="number"
                    value={quantite}
                    onChange={(e) => setQuantite(e.target.value)}
                />

                <button onClick={Ajouter}>
                    Ajouter
                </button>
            </div>
        </>
    )
}

export default AjouterProduit;