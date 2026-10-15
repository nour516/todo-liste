import { useState } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

import AjouterProduit from "./AjouterProduit";
import ListeProduits from "./ListeProduits";
import Accueil from "./Accueil";

export default function App() {

    const [produits, setProduits] = useState([
        {id: 1, nom: "Parfum", prix: 99, quantite: 177}
    ]);

    return (
        <BrowserRouter>

            <nav>
                <Link to="/">Accueil</Link>

                <Link to="/AjouterProduit">Ajouter Produit</Link>cg

                <Link to="/ListeProduits">Liste Produits</Link>
            </nav>

            <Routes>
              <Route path="/" element={<Accueil />}/>

                <Route path="/AjouterProduit" element={<AjouterProduit produits={produits} setProduits={setProduits} />}/>

                <Route path="/ListeProduits" element={<ListeProduits produits={produits}/>}/>
            </Routes>

        </BrowserRouter>
    );
}