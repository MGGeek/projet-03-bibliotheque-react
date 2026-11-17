export default function BookCard({ id, titre, auteur, estDisponible, onClickEmprunt }) {
  return (
    <article className="book">
      <div className="info">
        <h3>{titre}</h3>
        <p>{auteur}</p>

        <div className="row">
          <span className={estDisponible ? "badge ok" : "badge no"}>
            {estDisponible ? "Disponible" : "Emprunté"}
          </span>

          {/* 
            ⚠️ IMPORTANT : On passe une fonction fléchée () => onClickEmprunt(id) 
            pour éviter que la fonction ne s'exécute en boucle dès le chargement de la page.
          */}
          <button
            className="swap"
            type="button"
            onClick={() => onClickEmprunt(id)}
            aria-label={estDisponible ? "Marquer comme emprunté" : "Marquer comme disponible"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 7h12l-3-3M17 17H5l3 3" />
            </svg>
            {estDisponible ? "Emprunter" : "Rendre"}
          </button>
        </div>
      </div>
    </article>
  )
}