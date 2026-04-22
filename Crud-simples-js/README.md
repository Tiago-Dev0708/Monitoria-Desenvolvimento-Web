# Crud simples sobre cadastro de produtos

###### Esse sistema simples com Backend e Frontend integrados, foi feito e ministrado em aula, para os alunos da disciplina de Desenvolvimento Web. Fazendo uso de Javascript, Express.js, Postgres, Docker, HTML5 e CSS3.

###### O sistema compõe um Backend e um Frontend integrados, utilizando uma arquitetura em camadas simples e monólito, além de um banco de dados com a tabela de produtos já modelada também. Vale ressaltar que esse sistema foi criado para ser o mais simples possível, ou seja, sem camadas de complexidade absurdas, para facilitar o entendimento da turma. 

## Abaixo, segue como rodar o projeto(tenha instalado em sua maquina previamente o node.js):

## Instalação das dependências do Backend
Recomendo usar `npm`:

```
npm install ou npm i 
```

## Como subir o container do banco de dados Postgres e o Backend

```
Entre no diretorio raiz
Use: docker compose up -d --> esse comando irá buildar e subir o container do Banco Postgres
Após subir o banco e verificar sua saúde e conexão via Dbeaver, Pgadmin, etc... 
Use: npm run dev --> esse comando irá subir um servidor web e ter seus endpoints disponivéis para uso
```

## Como subir o Frontend

Abra o arquivo index.html dentro da pasta public e:

```
Aperte F5 para iniciar o Front ou então clique com o direito em cima do arquivo index.html e caso tenha a extensão Live server ativa, ele irá mostrar "Open With Live Server" e pode rodar o Front normalmente.
```

