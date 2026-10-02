import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [titre, setTitre] = useState("");

  const [taches, setTaches] = useState([
    { id: 1, titre: "Arroser les plantes", terminee: true },
    {
      id: 2,
      titre: "Terminer l'activité 7 du module approche agile",
      terminee: false,
    },
    {
      id: 3,
      titre: "Appeler le technicien qui répare mon ancien téléphone",
      terminee: false,
    },
    {
      id: 4,
      titre: "Acheter le riz et du lait",
      terminee: true,
    },
  ]);

  // Ajouter une tâche
  function ajouterTache(e) {
    e.preventDefault();

    if (titre.trim() === "") {
      return;
    }

    const nouvelleTache = {
      id: Date.now(),
      titre: titre,
      terminee: false,
    };

    setTaches([...taches, nouvelleTache]);
    setTitre("");
  }

  
  function changerEtat(id) {
    setTaches(
      taches.map((tache) => {
        return tache.id === id
          ? { ...tache, terminee: !tache.terminee }
          : tache;
      })
    );
  }

  
  function supprimerTache(id) {
    setTaches(
      taches.filter((tache) => tache.id !== id)
    );
  }

  return (
    <div className="App container mt-4">

      <h1 className="text-center mb-4">
        Ma Liste de Tâches
      </h1>

    
      <form
        onSubmit={ajouterTache}
        className="d-flex mb-4"
      >
        <input
          type="text"
          className="form-control me-2"
          placeholder="Titre de la tâche"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
        />

        <button
          type="submit"
          className="btn btn-primary"
        >
          Add
        </button>
      </form>

      
      <div className="list-group">

        {taches.map((tache) => (
          <div
            key={tache.id}
            className={
              "list-group-item d-flex justify-content-between align-items-center " +
              (tache.terminee
                ? "list-group-item-success"
                : "list-group-item-warning")
            }
          >

            <span>
              {tache.titre}
            </span>

            <div>

            
              <button
                type="button"
                className={
                  tache.terminee
                    ? "btn btn-success me-2"
                    : "btn btn-primary me-2"
                }
                onClick={() => changerEtat(tache.id)}
              >
                {tache.terminee ? "Done" : "terminee"}
              </button>

              
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => supprimerTache(tache.id)}
              >
                X
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default App;