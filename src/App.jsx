import { useState, useEffect } from 'react';


function App() {
  const [taches, setTaches] = useState([]);
  const [newTitle, setNewTitle] = useState('');

 
  const API_URL = 'http://localhost/todo-liste/index.php';


  const fetchTaches = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTaches(data);
    } catch (error) {
      console.error("Erreur de chargement des données :", error);
    }
  };

  useEffect(() => {
    fetchTaches();
  }, []);

  
  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    fetch(`${API_URL}?action=new&title=${encodeURIComponent(newTitle)}`)
      .then(res => res.json())
      .then(data => {
        setTaches(data);
        setNewTitle('');
      });
  };

 
  const handleDelete = (id) => {
    fetch(`${API_URL}?action=delete&id=${id}`)
      .then(res => res.json())
      .then(data => setTaches(data));
  };

  
  const handleToggle = (id) => {
    fetch(`${API_URL}?action=toggle&id=${id}`)
      .then(res => res.json())
      .then(data => setTaches(data));
  };

  return (
    <div className="bg-light min-vh-100 py-4">
      
      <nav className="navbar navbar-dark bg-dark shadow-sm mb-4 container rounded">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">TodoList</span>
        </div>
      </nav>

      <div className="container" style={{ maxWidth: '700px' }}>


        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <form onSubmit={handleAdd} className="row g-2 justify-content-center">
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Task Title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-primary">Add</button>
              </div>
            </form>
          </div>
        </div>


        <div className="card shadow-sm">
          <div className="card-header bg-secondary text-white fw-bold">Tâches</div>
          <ul className="list-group list-group-flush">
            {taches.length === 0 ? (
              <li className="list-group-item text-center text-muted py-3">Aucune tâche enregistrée.</li>
            ) : (
              taches.map((tache) => {
                const isDone = Number(tache.done) === 1;
                return (
                  <li
                    key={tache.id}
                    className={`list-group-item d-flex justify-content-between align-items-center ${isDone ? 'list-group-item-success' : 'list-group-item-warning'}`}
                  >
                    <span className={isDone ? 'text-muted' : ''}>
                      {tache.title}
                    </span>

                    <div>
                   
                      <button
                        onClick={() => handleToggle(tache.id)}
                        className="btn btn-sm btn-primary me-2"
                      >
                        {isDone ? 'Undo' : 'Done'}
                      </button>

                   
                      <button
                        onClick={() => handleDelete(tache.id)}
                        className="btn btn-sm btn-danger"
                      >
                        X
                      </button>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
