// importar as dependencias do Sqlite3
const sqlite3 = require("sqlite3").verbose();

// Criação do banco de dados
const db = new sqlite3.Database("./src/database/database.db");


module.exports = db;

// iniciar uma instancia de banco de dados
db.serialize( () => {
    // Criar uma tabela
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         imagem TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `);

    //Inserir dados na tabela
    // const query = `
    //     INSERT INTO places (
    //         imagem, name, address, address2, state, city, items
    //     ) VALUES (?,?,?,?,?,?,?);
    // `
    
    // // const values = [
    // //     "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    // //     "Colectoria",
    // //     "Guilherme Gemballa, Jardin América",
    // //     "Nº 260",
    // //     "Santa Catarina",
    // //     "Rio do Sul",
    // //     "Resíduos Eletrônicos, Lâmpadas"
    // // ]    
    
    // const values = [
    //     "https://images.unsplash.com/photo-1563477710521-5ae0aa5085ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    //     "Papersider",
    //     "Guilherme Gemballa, Jardin América",
    //     "Nº 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Papéis e Papelão"
    // ]

    // function afterInsertData(err){
    //     if(err){
    //         return console.log(err);
    //     }

    //     console.log("Cadastrado com sucesso!");
    //     console.log(this);
    // }

    // db.run(query, values, afterInsertData)
    
    // Consultar dados na tabela
    // db.all(`SELECT * FROM places`, function(err, row){
    //     if(err){
    //         return console.log(err);
    //     }

    //     console.log("Aqui estão seus registros: ");
    //     console.log(row);
    // })


    //Deletar dados na tabela
    // db.run(`DELETE FROM places WHERE id = ? `, [1], function(err){
    //     if(err){
    //         return console.log(err);
    //     }

    //     console.log("Registro apagado com sucesso!");
    // })
})