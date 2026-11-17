import { useState } from 'react'
import BookCard from './components/BookCard'
import './App.css'

function IconBook() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5zM4 21.5V5.5M9 8h6" />
    </svg>
  )
}

function IconPlus() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export default function App() {
  const [books, setBooks] = useState([
    {
      id: 1,
      titre: "Le Petit Prince",
      auteur: "Antoine de Saint-Exupéry",
      estDisponible: true
    },
    {
      id: 2,
      titre: "1984",
      auteur: "George Orwell",
      estDisponible: false
    },
    {
      id: 3,
      titre: "L'Étranger",
      auteur: "Albert Camus",
      estDisponible: true
    },
    {
      id: 4,
      titre: "Une si longue lettre",
      auteur: "Mariama Bâ",
      estDisponible: true
    }
  ]);

  // CORRECTION : Déclaration des états pour les champs contrôlés du formulaire
  const [titreInput, setTitreInput] = useState("");
  const [auteurInput, setAuteurInput] = useState("");

  const nombreDisponible = books.filter(book => book.estDisponible).length;

  function onClickEmprunt(bookId){
    setBooks(function(etatActuel){
      return etatActuel.map(function(book){
        if (book.id === bookId){
          return {...book, estDisponible: !book.estDisponible}
        }
        return book; // Important pour ne pas perdre les autres livres
      })
    })
  }

  function handleAddBook(e) {
    e.preventDefault(); 

    if (titreInput.trim() === "" || auteurInput.trim() === "") return;

    const nouveauLivre = {
      id: Date.now(), // Utiliser l'horodatage est plus sûr que books.length + 1 en cas de suppression
      titre: titreInput,
      auteur: auteurInput,
      estDisponible: true 
    };

    setBooks(function(etatActuel) {
      return [...etatActuel, nouveauLivre];
    });

    setTitreInput("");
    setAuteurInput("");
  }

  return (
    <>
      <header className="top">
        <div className="brand">
          <div className="logo"><IconBook /></div>
          <span>Ma bibliothèque</span>
        </div>
      </header>

      <div className="wrap">
        {/* Formulaire d'ajout */}
        <aside>
          <form className="add" onSubmit={handleAddBook} aria-labelledby="t-add">
            <h2 id="t-add">Ajouter un livre</h2>
            <p>Renseignez le titre et l’auteur, le livre apparaîtra dans la liste.</p>

            <label className="field">
              <b>Titre du livre</b>
              <input
                type="text"
                value={titreInput}
                onChange={function(e) { setTitreInput(e.target.value); }}
                placeholder="Ex: Les Misérables"
              />
            </label>

            <label className="field">
              <b>Auteur</b>
              <input
                type="text"
                value={auteurInput}
                onChange={function(e) { setAuteurInput(e.target.value); }}
                placeholder="Ex: Victor Hugo"
              />
            </label>

            <button className="btn" type="submit">
              <IconPlus />
              Ajouter le livre
            </button>
          </form>
        </aside>

        {/* Liste des livres */}
        <main>
          <div className="intro">
            <h1>Vos livres</h1>
            <p>
              {books.length} {books.length > 1 ? "livres" : "livre"}, dont {nombreDisponible} {nombreDisponible > 1 ? "disponibles" : "disponible"}.
            </p>
          </div>

          <div className="grid">
            {books.map((book) => (
              <BookCard 
                key={book.id}
                id={book.id}
                titre={book.titre} 
                auteur={book.auteur} 
                estDisponible={book.estDisponible} 
                onClickEmprunt={onClickEmprunt} 
              />
            ))}
          </div>
        </main>
      </div>
    </>
  )
}