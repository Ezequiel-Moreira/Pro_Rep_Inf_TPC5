const fs = require('fs')
const folder = './data/json/'

fs.readdir(folder,(erro,ficheiros)=>{
  if(!erro){
    ficheiros.forEach(ficheiro => {
      var dadosFicheiro = fs.readFileSync(folder + '/' +ficheiro)
      var parsedJSON = JSON.parse(dadosFicheiro)
      var id = parsedJSON._id
      var titulo = parsedJSON.titulo

      fs.appendFile("./test", id + '\n' + titulo + '\n\n'  ,(erro)=>{
        if(!erro){
          console.log("Now go and see the test file")
        }else{
          console.log(erro)
        }
      })

    });
  }else{
    console.log(erro)
  }  
})
