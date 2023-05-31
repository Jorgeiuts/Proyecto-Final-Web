import './App.css';
import {useState} from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [nombre,setNombre] = useState("");
  const [genero,setGenero] = useState("");
  const [costo,setCosto] = useState();
  const [id,setId] = useState();

  const [editar,setEditar] = useState(false);

  const [peliculasLis,setPeliculas] = useState([]);

  const add = ()=>{
    Axios.post("http://localhost:3001/create",{
      nombre:nombre,
      genero:genero,
      costo:costo
    }).then(()=>{  
      getPeliculas();
      limpiarCampos();
      alert("Pelicula registrado");
    });
  }

  const update = ()=>{
    Axios.put("http://localhost:3001/update",{
      id:id,
      nombre:nombre,
      genero:genero,
      costo:costo
    }).then(()=>{  
      getPeliculas();
      limpiarCampos();
    });
  }

  const limpiarCampos = ()=> {
    setNombre("");
    setGenero("");
    setCosto("");
    setEditar(false);
  }

  const editarPelicula = (val)=>{
    setEditar(true);

    setNombre(val.nombre);
    setGenero(val.genero);
    setCosto(val.costo);
    setId(val.id);
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
              className="form-control" value={nombre} placeholder="Nombre de la Pelicula" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Genero:</span>
              <input type="text"
              onChange={(event)=>{
                setGenero(event.target.value);
              }}
              className="form-control" value={genero} placeholder="Genero de la Pelicula" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Costo:</span>
              <input type="number"
              onChange={(event)=>{
                setCosto(event.target.value);
              }}
              className="form-control" value={costo} placeholder="Costo de la Pelicula" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>              
          </div>
          <div className="card-footer text-muted">
            {
              editar ?
              <div>
              <button className='btn btn-warning m-2' onClick={update}>Acualizar</button><button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
              </div>
              : <button className='btn btn-success' onClick={add}>Registrar</button>
            }
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
            <th scope="col">Acciones</th>
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
                      <td>
                      <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button"
                        onClick={()=>{
                          editarPelicula(val);
                        }}
                        className="btn btn-info">Editar</button>
                        <button type="button" className="btn btn-danger">Eliminar</button>
                      </div>
                      </td>
                    </tr>
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
