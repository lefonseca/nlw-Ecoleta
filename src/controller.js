const db = require("./database/db");

// req: Requisição
// res: Resposta

exports.index = (req, res) => {
    return res.render("index.html", {
        title: "Seu marketplace de coleta de resíduos"
    });
}

exports.create = (req, res) => {
    return res.render("create-point.html");
}

exports.post = (req, res) => {
    
    // req.body: O Corpo do nosso formulário
    //console.log(req.bory)
 
    //Inserir dados na tabela
    const query = `
        INSERT INTO places (
            imagem, 
            name, 
            address, 
            address2, 
            state, 
            city, 
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];

    // Validar o insert na tabela
    function afterInsertData(err){
        if(err) return res.render("create-point.html", { saved: false});

        return res.render("create-point.html", { saved: true});
    }

    db.run(query, values, afterInsertData)   
}

exports.search = (req, res) => {
    const search = req.query.search;

    // Pesquisa vazia
    if (search == "") return res.render("search-results.html", { total: 0});

    const query = `SELECT * FROM places WHERE city LIKE '%${ search }%'`;

    // Pegar dados do banco de dados
    db.all(query, function(err, rows){
        if (err) return console.log(err);

        const total = rows.length;

        // Envia os dados retornado do banco de dados para front-end
        return res.render("search-results.html", { places: rows, total });
    })
}

exports.delete = (req, res) => {
    const {id, cidade} = res.body;
    
    function afterDeleteData(err){
        if (err) return res.render("search-results.html", {deleteTrue: false });

        console.log("Registro apagado com sucesso!");

        return res.render("search-results.html", {deleteTrue: true });
    }

    db.run(`DELETE FROM places WHERE id = ${ id }`, afterDeleteData);
}

exports.edit = (req, res) => {
    const { id } = res.param;
    
    db.all(`SELECT * FROM places WHERE id = ${ id }`, function(err, rows) {
        if (err) return res.sender("Erro ao encontrar local!") 

        let point = rows[0];

        point = {
            ...points,
            items: point.items.split(",")
        }

        return res.render("edit-point.html", { point });
    })
}

exports.put = (req, res) => {
    const { id } = req.params;

    const query = `UPDATE places
        SET imagem = ?,
        name = ?,
        address = ?,
        address2 = ?,
        state = ?,
        city = ?,
        items = ?
        WHERE id = ${ id }
    `;

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];

    function afterUpdateData(err){
        if (err) return res.redirect(`/edit/${ id }`);

        console.log("Registro atualizado com sucesso!");
        
        return res.redirect(`/search?search=${ req.body.city }`);
    }

    db.run(query, values, afterUpdateData);

}
