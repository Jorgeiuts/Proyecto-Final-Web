import './App.css';

function App() {
  return (
    <div className="App">
      <div className='datos'>
        <label>Nombre: <input type='text'></input></label><br/>
        <label>Genero : <input type='text'></input></label><br/>
        <label>Costo : <input type='number'></input></label><br/>
        <button>Registrar</button>
      </div>
    </div>
  );
}

export default App;
