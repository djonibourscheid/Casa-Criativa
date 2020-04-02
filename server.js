// usando Express para criar e config o server
const express = require("express")
const server = express()

const db = require("./db")


// configurando o servidor para iniciar arquivos estáticos / css, js..\
server.use(express.static("public"))

// habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))


// configurando o nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true, // desativar se sair de devensolvimento
})


// rota /
// configurando a apresentação da página
server.get("/", function(req, res){
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }
    
        return res.render("index.html", { ideas : lastIdeas })
    })
})

server.get("/ideias", function(req, res) {
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse()

        res.render("ideias.html", {ideas : reversedIdeas })
    })
})

server.post("/", function(req, res) {
    // Inserir dados na tabela
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES (?,?,?,?,?);
    ` 
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]
    
    db.run(query, values, function(err){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        return res.redirect("/ideias")
    })
})


// MENSAGEM
    // Avisar de site iniciado com sucesso
function serverStartedSuccess() {
    console.log(` 
|------------------------------------|
|    Server started with sucess!     |
|         Create by zDMz#5671        |
| https://github.com/djonibourscheid |
|------------------------------------|`)
}


// server aberto na porta 3000 
server.listen(3000, function() {
    serverStartedSuccess()
})
