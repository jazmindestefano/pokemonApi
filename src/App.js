import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [pokemones, setPokemones] = useState([]);
  const [abilities, setAbilities] = useState([]);

  const [pokemonesFiltered, setPokemonesFiltered] = useState([]);
  const [abilititesFiltered, setAbilititesFiltered] = useState([]);

  const pok = useRef(null);
  const ab = useRef(null);

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

  const handleChangePokemones = () => {
    const newPokemons = [];
    pokemones.results?.filter((p) => {
      if (p.name.includes(pok.current.value)) {
        newPokemons.push(p.name);
      }
    });
    setPokemonesFiltered(newPokemons);
  };

  const handleChangeAbilities = () => {
    const newAbilities = [];
    abilities.results?.filter((p) => {
      if (p.name.includes(ab.current.value)) {
        newAbilities.push(p.name);
      }
    });
    setAbilititesFiltered(newAbilities);
  };

  return (
    <div className="App">
      <div className="big-container">
        <h1>Api Pokemones</h1>
        <div className="container">
          <div className="list">
            <div className="title">
              <h1>Pokemon</h1>
              <div>
                <input
                  className="input"
                  ref={pok}
                  onChange={handleChangePokemones}
                />
              </div>
            </div>
            {pokemones ? (
              <div>
                {pokemonesFiltered.slice(0, 10).map((p) => {
                  return <p>name: {p}</p>;
                })}
              </div>
            ) : (
              <p>Cargando...</p>
            )}
          </div>

          <div className="list">
            <div className="title">
              <h1>Abilities</h1>
              <div>
                <input
                  className="input"
                  ref={ab}
                  onChange={handleChangeAbilities}
                />
              </div>
            </div>
            {abilities ? (
              <div>
                {abilititesFiltered.slice(0, 10).map((a) => {
                  return <p>ability: {a}</p>;
                })}
              </div>
            ) : (
              <p>Cargando...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
