import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [pokemones, setPokemones] = useState(null);
  const [abilities, setAbilities] = useState([]);



  useEffect(() => {
    const fetchPokemones = async () => {
      const data = await fetch("https://pokeapi.co/api/v2/pokemon");
      const json = await data.json();
      setPokemones(json);
    };
    fetchPokemones();
  }, []);

  useEffect(() => {
    const fetchAbilities = async () => {
      const data = await fetch("https://pokeapi.co/api/v2/ability/");
      const json = await data.json();
      setAbilities(json);
    };
    fetchAbilities();
  }, []);


  return (
    <div className="App">
      <div>
        <h1>Pokemon</h1>
        {pokemones ? (
          <div>
            {pokemones.results?.map((p) =>{ return <p>name: {p.name}</p>})}
          </div>
        ) : (
          <p>Cargando...</p>
        )}
      </div>

      <div>
        <h1>Abilities</h1>
        {abilities ? (
          <div>
            {abilities.results?.map((a) => {
              return <p>ability: {a.name}</p>;
            })}
          </div>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    </div>
  );
}

export default App;
