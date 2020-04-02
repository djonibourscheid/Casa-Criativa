const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./casacriativa.db')

db.serialize(function(){
    // Criar a tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );`)

    
    // Inserir dados na tabela
    //const query = `
    //    INSERT INTO ideas(
    //        title,
    //        category,
    //        image,
    //        description,
    //        link
    //    ) VALUES (?,?,?,?,?);
    //` 
    //const values = [
    //    "Trabalhos da Escola",
    //    "Estudo",
    //    "https://image.flaticon.com/icons/svg/2728/2728997.svg",
    //    "Acabar todas as tarefas da escola",
    //    "https://github.com/djonibourscheid"
    //]
    
    //db.run(query, values, function(err){
    //    if (err) {
    //        console.log(err)
    //    }

    //    console.log(this)
    //})


    // Deletar dados da tabela
    //db.run(`DELETE FROM ideas WHERE id = ?`, [1] function(err) {
    //    if (err) return console.log(err)
    //    
    //    console.log("Deletei", this)
    //})

    
    // Consultar dados na tabela
})

module.exports = db
