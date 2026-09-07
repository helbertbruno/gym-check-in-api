# app

GymPass style app.

## RFs ( requisitos funcionais)

- [x] deve ser possivel se cadastrar
- [x] deve ser possivel se autenticar
- [x] deve ser possivel obter o perfil de um usuario logado
- [x] deve ser possivel obter o numero de check-ins realizado pelo usuario logado
- [x] deve ser possivel o usuario obter seu historico de check-ins
- [x] deve ser posssivel o usuario buscar academias proximas
- [x] deve ser posssivel o usuario buscar academias pelo nome
- [x] deve ser posssivel o usuario realizar check-in em uma academia
- [x] deve ser posssivel validar o check-in de um usuario
- [x] deve ser posssivel cadastrar uma academia

## RNs(regras de negocio)

- [x] o usuario nao deve poder se cadastrar com um email duplicado
- [x] o usario nao pode fazer 2 check-in no mesmo dia
- [x] o usuario nao pode fazer check-in se nao estiver perto (100m) da academia
- [ ] o check-in so pode ser validado ate 20 min apos ser criado
- [ ] o check-in so pode ser validado por administradores
- [ ] a academia so pode ser cadastrada por adm

## RNfs ( requisitos nao-funcionais )

- [x] a senha do usuario precisa estar criptografada
- [x] os dados da aplicaçao precisa estar persistidos em um banco postgreSQL
- [x] todas listas de dados precisam estar paginadas com 20 itens por pagina
- [ ] o usuario deve ser indetificado por um jwt (json web token)
