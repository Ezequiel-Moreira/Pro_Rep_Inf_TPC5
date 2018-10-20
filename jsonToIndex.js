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
    '\t<musica>\n' +
    '\t\t<id>' + id + '</id>' + '\n' + '\t\t<titulo>' +titulo + '</titulo>\n' +
    '\t</musica>\n\n'
    ,(erro)=>{
      if(erro){console.log(erro)}        
    })
  });
},console.log('Agora vai ver o ficheiro ' + dest))
