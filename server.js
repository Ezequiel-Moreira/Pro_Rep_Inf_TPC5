var http = require('http')
var fs = require('fs')
var url = require('url')
var pug = require('pug')
var parser = require('xml2json')

var estilo = /w3\.css/g
var index = /index/g
var obras = /obra/g

var server=7000

http.createServer( (req,res) =>{
  var parsedURL=url.parse(req.url,true)

  console.log('recebi um pedido ' + parsedURL)

  if(index.test(parsedURL.pathname)){
    res.writeHead(200,{'Content-Type':'text/html'})
    fs.readFile('data/index.xml', (erro,dados)=>{
      if(!erro){
        var myObj = JSON.parse(parser.toJson(dados))
        res.write(pug.renderFile('views/index.pug',{ind: myObj}))
      }else{
        res.write('<p><b>ERRO: </b> ' + erro + '</p>')
      }
      
      res.end()
    })
  }else if(obras.test(parsedURL.pathname)){
    var ficheiro = parsedURL.pathname.split('/')[2] + '.json'

    console.log("A ler o ficheiro " + ficheiro)

    res.writeHead(200,{'Content-Type':'text/html'})
    fs.readFile('data/json/'+ficheiro, (erro,dados)=>{
      if(!erro){
        res.write(pug.renderFile('views/template.json',{fich: dados}))
      }else{
        res.write('<p><b>ERRO: </b> ' + erro + '</p>')
      }
      
      res.end()
    })
  }else if(estilo.test(parsedURL.pathname)){
    res.writeHead(200,{'Content-Type':'text/css'})
    fs.readFile('stylesheet/w3.css', (erro,dados)=>{
      if(!erro){
        res.write(dados)
      }else{
        res.write('<p><b>ERRO: </b> ' + erro + '</p>')
      }
      
      res.end()
    })
  }else{
    res.writeHead(200,{'Content-type' : 'text/html'})
    res.write('<p><b>ERRO: </b>' + parsedURL.pathname +'</p>')
    res.write('<p>File not found</p>')
    res.end()
  }
}).listen(server,()=>{
  console.log('Servidor á escuta na porta ' + server) 
})
