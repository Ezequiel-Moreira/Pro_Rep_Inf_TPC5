const fs = require('fs')
const folder = './data/json/'
const dest = './data/index.xml'

fs.readdir(folder,(erro,ficheiros)=>{
  if(erro){console.log(erro)}
  ficheiros.forEach(ficheiro => {
    var dadosFicheiro = fs.readFileSync(folder + '/' +ficheiro)
    var parsedJSON = JSON.parse(dadosFicheiro)
    var id = parsedJSON._id
    var titulo = parsedJSON.titulo
    fs.appendFile(dest,
    '\t<id>' + id + '</id>' + '\n' + '\t<titulo>' +titulo + '</titulo>\n\n'
    ,(erro)=>{
      if(erro){console.log(erro)}        
    })
  });
},console.log('Agora vai ver o ficheiro ' + dest))
