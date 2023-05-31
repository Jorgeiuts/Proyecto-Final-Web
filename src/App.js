import './App.css';
import {useState} from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [nombre,setNombre] = useState("");
  const [genero,setGenero] = useState("");
  const [costo,setCosto] = useState(0);

  const [peliculasLis,setPeliculas] = useState([]);

  const add = ()=>{
    Axios.post("http://localhost:3001/create",{
      nombre:nombre,
      genero:genero,
      costo:costo
    }).then(()=>{  
      getPeliculas();
      alert("Pelicula registrado");
    });
  }

  const getPeliculas = ()=>{
    Axios.get("http://localhost:3001/peliculas").then((response)=>{
      setPeliculas(response.data);
    });
  }


  return (
    <div className="container">
        <div className="card text-center">
          <div className="card-header">
            Gestion de peliculas
          </div>
          <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Nombre:</span>
              <input type="text"
              onChange={(event)=>{
                setNombre(event.target.value);
              }}
              className="form-control" placeholder="Nombre de la Pelicula" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Genero:</span>
              <input type="text"
              onChange={(event)=>{
                setGenero(event.target.value);
              }}
              className="form-control" placeholder="Genero de la Pelicula" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Costo:</span>
              <input type="number"
              onChange={(event)=>{
                setCosto(event.target.value);
              }}
              className="form-control" placeholder="Costo de la Pelicula" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>              
          </div>
          <div className="card-footer text-muted">
            <button className='btn btn-success' onClick={add}>Registrar</button>
          </div>
        </div>
        <button className='btn btn-success' onClick={getPeliculas}>Obtener Peliculas</button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre Pelicula</th>
            <th scope="col">Genero</th>
            <th scope="col">Precio</th>
          </tr>
        </thead>
        <tbody>
          {
            peliculasLis.map((val,key)=>{
              return <tr key={val.id}>
                      <th scope="row">{val.id}</th>
                      <td>{val.nombre}</td>
                      <td>{val.genero}</td>
                      <td>{val.costo}</td>
                    </tr>
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
