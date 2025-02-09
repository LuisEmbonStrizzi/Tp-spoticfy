const conn = require("../db");

const getCanciones = (_, res) => {
    // Completar con la consulta que devuelve todas las canciones
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            ...
        ]
    */
    conn.query("SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones FROM canciones INNER JOIN albumes ON albumes.id = canciones.album INNER JOIN artistas ON artistas.id = albumes.artista", (err, rows) => {
        
        if(err) return res.status(500).json({message: "Ha ocurrido un error"})
    
        res.json(rows)
    })
};

const getCancion = (req, res) => {
    // Completar con la consulta que devuelve una canción
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id de la canción",
            "nombre": "Nombre de la canción",
            "nombre_artista": "Id del artista",
            "nombre_album": "Id del album",
            "duracion": "Duración de la canción",
            "reproducciones": "Reproducciones de la canción"
        }
    */
    const id = parseInt(req.params.id);

    conn.query("SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones FROM canciones INNER JOIN albumes ON albumes.id = canciones.album INNER JOIN artistas ON artistas.id = albumes.artista WHERE canciones.id = ?",[id], (err, rows) => {
        
        if(err) return res.status(500).json({message: "Ha ocurrido un error"});
        
        res.json(rows);
    });
};

const createCancion = (req, res) => {
    // Completar con la consulta que crea una canción
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "artista": "Id del artista",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones se inicializa en 0)
    const { nombre, album, duracion } = req.body;

    conn.query("INSERT INTO canciones (nombre, album, duracion, reproducciones) VALUES (?, ?, ?, 0) ",[nombre, album, duracion], (err, rows) => {
        
        if(err) return res.status(500).json({message: "Ha ocurrido un error"});
        
        res.json({message: "Se ha creado una canción correctamente"});
    });
};

const updateCancion = (req, res) => {
    // Completar con la consulta que actualiza una canción
    // Recordar que los parámetros de una consulta PUT se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "artista": "Id del artista",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones no se puede modificar con esta consulta)
    const { nombre, album, duracion } = req.body;
    const id = parseInt(req.params.id)

    conn.query("UPDATE canciones SET nombre = ?, album = ?, duracion = ? WHERE id = ?",[nombre, album, duracion, id], (err, rows) => {
        if(err) return res.status(500).json({message: "Ha ocurrido un error"});
        
        res.json({message: "Se ha actualizado una canción correctamente"});
    });
};

const deleteCancion = (req, res) => {
    // Completar con la consulta que elimina una canción
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
    const id = parseInt(req.params.id)

    conn.query("DELETE FROM canciones WHERE id = ?", [id], (err, rows) => {
        if(err) return res.status(500).json({message: "Ha ocurrido un error"});
    
        res.sendStatus(204);
    })

};

const reproducirCancion = (req, res) => {
    // Completar con la consulta que aumenta las reproducciones de una canción
    // En este caso es una consulta PUT, pero no recibe ningún parámetro en el body, solo en los params
    const id = parseInt(req.params.id)

    conn.query("UPDATE canciones SET reproducciones = reproducciones + 1 WHERE id = ?",[id], (err, rows) => {
        console.log(err)
        if(err) return res.status(500).json({message: "Ha ocurrido un error"});
        
        res.json({message: "Se ha reproducido una canción correctamente"});
    });
};

module.exports = {
    getCanciones,
    getCancion,
    createCancion,
    updateCancion,
    deleteCancion,
    reproducirCancion,
};
