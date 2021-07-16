import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons'
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'



function ProfileSidebar(props){
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.gitHubUser}.png`}></img>
      {/* <hr/> */}

      <a className="boxLink" href={`https://github.com/${props.gitHubUser}.png`}>
        @{props.gitHubUser}
      </a>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationBox(props){
  return (
    <ProfileRelationsBoxWrapper >
    <h2 className="smallTitle">
      Seguidores(as) ({props.seguidores.length})
    </h2>
    <ul>
      {props.seguidores.map((itemAtual, index)=>{
        return(
          <li key={index}>
            <a href={`https://github.com/${itemAtual.login}`}>
              <img src={`https://github.com/${itemAtual.login}.png`}></img>
              <span>{itemAtual.login}</span>
            </a>
          </li>

        )

      })
      }
    </ul>
  </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {

const [comunidades, setComunidades] = React.useState([]);
const gitHubUser = "yurimarcon"
const pessoasFavoritas = [
  "PedroMagar",
  "renanmg",
  "	AlineSoares",
  "juunegreiros",
  "omariosouto",
  "peas"
];
const [seguidores, setSeguidores] = React.useState([]);
// 0 - Pegar o array de dados do github 
  React.useEffect(function() {
    // GET
    fetch('https://api.github.com/users/yurimarcon/followers')
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta) {
      setSeguidores(respostaCompleta);
    })

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        // 'Authorization': '7f7590695431ea76f84616a4b4d32d',
        'Authorization': '60cdd8dad0c65f69a79f1aa14ee1d8',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": 
        `query {
          allComunities {
            id
            title
            imageUrl
            creatorslug
          }
        }` 
      })
    })
    .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
    .then((respostaCompleta) => {
      if(respostaCompleta.data){
        console.log(respostaCompleta.data)
        const comunidadesVindasDoDato = respostaCompleta.data.allComunities;
        console.log(comunidadesVindasDoDato)
        console.log('comunidadesVindasDoDato')
        setComunidades(comunidadesVindasDoDato)
      }
    })
    // .then(function (response) {
    //   return response.json()
    // })

  }, [])

  return (
    <>
      <AlurakutMenu 
      githubUser={gitHubUser}
      />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea'}}>
          <ProfileSidebar gitHubUser={gitHubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}>
          <Box >
            <h2 className="title">
              Bem vindo(a)
            </h2>
            <OrkutNostalgicIconSet />
          </Box>

          <Box >

            <h2>O que você deseja fazer?</h2>
            <form onSubmit={(e)=>{
                e.preventDefault()
                const dadosDoForm = new FormData(e.target);

                const comunidade = {
                  title: dadosDoForm.get('title'),
                  imageUrl: dadosDoForm.get('image'),
                  creatorslug: gitHubUser
                }
                  
                fetch('/api/comunidades', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(comunidade)
                })
                .then(async (response) => {
                  const dados = await response.json();
                  console.log(dados.registroCriado);
                  const comunidade = dados.registroCriado;
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas)
                })
                // const novoArrey = [...comunidades, comunidade];
                // setComunidades(novoArrey)    
              }
              } >
              <div>
                <input 
                  type="text" 
                  placeholder="Qual vai ser o nome da comunidade?" 
                  name="title" 
                  aria-label=""
                ></input>
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Qual a url da imagem?" 
                  name="image"
                  aria-label=""
                ></input>
              </div>

              <button type="submit">
                Criar comunidade
              </button>


            </form>


          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>

          <ProfileRelationBox 
          seguidores={seguidores}
          />    

          <ProfileRelationsBoxWrapper >
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual)=>{
                return(
                  <li key={itemAtual.id}>
                    <a href="#">
                      <img src={itemAtual.imageUrl}></img>
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>

                )
              })
              }
            </ul>

          </ProfileRelationsBoxWrapper >
          <ProfileRelationsBoxWrapper >
            <h2 className="smallTitle">
              Amigos(as) ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual, index)=>{
                return(
                  <li key={index}>
                    <a href={`https://github.com/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`}></img>
                      <span>{itemAtual}</span>
                    </a>
                  </li>

                )

              })
              }
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}