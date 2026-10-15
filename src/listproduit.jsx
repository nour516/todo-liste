function ListeProduits({produits}){
    return(
        <>
        <table border="2">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOM</th>
                    <th>PRIX</th>
                    <th>QUANTITE</th>
                </tr>
            </thead>
            <tbody>
                {produits.map((p) => (
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.nom}</td>
                        <td>{p.prix}</td>
                        <td>{p.quantite}</td>
                    </tr>
                ))};
            </tbody>
            
        </table>
        </>
    )
}
export default ListeProduits;