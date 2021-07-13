import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'

function ProfileSidebar(props){
  return (
    <Box >
      <img src={`https://github.com/${props.gitHubUser}.png`}></img>
    </Box>
  )
}

export default function Home() {
 const gitHubUser = "yurimarcon"
 const pessoasFavoritas = [
  "PedroMagar",
  "renanmg",
  "	AlineSoares",
  "juunegreiros",
  "omariosouto",
  "peas"
 ];

  return (
    <>
      <AlurakutMenu />
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
        </div>

      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
        <ProfileRelationsBoxWrapper >
          <h2 className="smallTitle">
            Amigos(as) ({pessoasFavoritas.length})
          </h2>
          <ul>
            {pessoasFavoritas.map((itemAtual)=>{
              return(
                <li>
                  <a href={`https://github.com/${itemAtual}`} key={itemAtual}>
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