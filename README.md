<h1 align="center"> MechApp API </h1>
<br>
<h2> :dart: Objetivo </h2>
<p> Desenvolver um projeto para o <strong>Trabalho de Conclusão de Curso da ETEC Horácio Augusto da Silveira</strong>.</p> <br>

<h2> :page_with_curl: Descrição do Projeto </h2>
<p> O <strong>MechApp</strong> é um <strong>aplicativo catalogador e divulgador de oficinas mecânicas</strong>. </p>
<h3> Como Funciona </h3>
<p> O aplicativo atende dois tipos de usuário: <strong>Cliente</strong> e <strong>Oficina</strong>. </p>
<p> O <strong>Cliente</strong> vizualiza um catálogo de oficinas mecânicas, tendo diversas opções de filtragem. Clicando na oficina desejada, ele vizualiza o perfil, aonde é mostrado informações como endereços, serviços que prestam, avaliações e etc. Pelo Perfil, também é possivel iniciar um Chat em tempo real, aonde o cliente consegue um agendamento de visita e, posteriormente, avalia a oficina. </p>
<p> A <strong>Oficina</strong> possui uma listagem de agendamentos, que foram feitos pelo chat, com os clientes. Pode também editar seu perfil, como adicionar uma descrição, adicionar endereços, adicionar uma foto de perfil, etc. </p> <br>

<h2> :computer: Utilização da API </h2>
<p> Clone o repositório e vá até a pasta criada. Dentro dela dê o comando <i>npm install</i> (fará com que as dependências do projeto sejam instaladas). No mesmo diretório, digite <i>npm run start</i> (Iniciará o servidor na porta escolhida). <br><br> As configurações do Banco de Dados estão no arquivo <strong> src/database/db.ts </strong> </p>
<h4><strong>:warning: As informações dos arquivos contidos na pasta ./src/config/ foram retiradas. </strong></h4>
<h3> Rotas </h3>
<p> Todas as <strong>rotas</strong> da API são definidas nas <strong>Controllers.</strong> </p><br>

<h2> :mag_right:: Técnologias </h2>
<ul>
  <li> Node.js </li>
  <li> Express </li>
  <li> Inversify </li>
  <li> JWT </li>
  <li> TypeORM </li>
  <li> MySQL </li>
</ul>
