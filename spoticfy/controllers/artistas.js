const conn = require("../db");

const getArtistas = (_, res) => {
    // Completar con la consulta que devuelve todos los artistas
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            ...
        ]
    */
    conn.query("SELECT * FROM artistas", (err, rows) => {
        if(err) return res.status(500).json({message: "Ha ocurrido un error"})
    
        res.json(rows)
    })
};

const getArtista = (req, res) => {
    // Completar con la consulta que devuelve un artista
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id del artista",
            "nombre": "Nombre del artista"
        }
    */

    const id = parseInt(req.params.id)

    conn.query("SELECT * FROM artistas WHERE id = ?", [id], (err, rows) => {
        if(err) return res.status(404).json({message: "El usuario no ha sido encontrado"})
    
        res.json(rows)
    })
   
};

const createArtista = (req, res) => {
    // Completar con la consulta que crea un artista
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista",
        }
    */
   const nombre = req.body.nombre

   conn.query("INSERT INTO artistas (nombre) VALUES (?)", [nombre], (err, rows) => {
    if(err) return res.status(500).json({message: "Ha ocurrido un error"})

    res.json(rows)
    })
};

const updateArtista = (req, res) => {
    // Completar con la consulta que actualiza un artista
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista"
        }
    */
   const id = parseInt(req.params.id)
   const nombre = req.body.nombre
    
   conn.query("UPDATE artistas SET nombre = ? WHERE id = ?", [nombre, id], (err, rows) => {
    if(err) return res.status(500).json({message: "Ha ocurrido un error"})

    res.json(rows)
    })
   
};

const deleteArtista = (req, res) => {
    // Completar con la consulta que elimina un artista
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
    const id = parseInt(req.params.id)

    conn.query("DELETE FROM artistas WHERE id = ?", [id], (err, rows) => {
        if(err) return res.status(500).json({message: "Ha ocurrido un error"})
    
        res.json(rows)
    })
};

const getAlbumesByArtista = (req, res) => {
    // Completar con la consulta que devuelve las canciones de un artista 
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getAlbumes
    const id = parseInt(req.params.id);
    conn.query("SELECT artistas.id, albumes.nombre, artistas.nombre AS nombre_artista FROM albumes INNER JOIN artistas ON albumes.artista = artistas.id WHERE albumes.artista = ?", [id], (err, rows) => {
        if (err) return res.status(404).json({message: "Los albumes del artista no han sido encontrados"})
        res.json(rows);
    })
};

const getCancionesByArtista = (req, res) => {
    // Completar con la consulta que devuelve las canciones de un artista
    // (tener en cuenta que las canciones están asociadas a un álbum, y los álbumes a un artista)
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones
    const id = parseInt(req.params.id);
    conn.query("SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones FROM canciones INNER JOIN albumes ON canciones.album = albumes.id INNER JOIN artistas ON albumes.artista = artistas.id WHERE artistas.id = ?", [id], (err, rows) => {
        if (err) return res.status(404).json({message: "Las canciones del artista no han sido encontradas"})
        res.json(rows);
    })
};

module.exports = {
    getArtistas,
    getArtista,
    createArtista,
    updateArtista,
    deleteArtista,
    getAlbumesByArtista,
    getCancionesByArtista,
};
