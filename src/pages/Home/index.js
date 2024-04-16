
import { Header } from '../../components/Header/index'
import { ItemList } from '../../components/ItemList'
import background from "../../assets/git.png"
import './styles.css'

import { useState } from 'react'

function App() {

    const [user, setUser] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [repos, setRepos] = useState(null);

    const handleGetData = async () => {
        const userData = await fetch(`https://api.github.com/users/${user}`)
        const newUser = await userData.json()

        if (newUser.name) {
            const { avatar_url, name, bio, login } = newUser
            setCurrentUser({ avatar_url, name, bio, login })

            const reposData = await fetch(`https://api.github.com/users/${user}/repos`)
            const newRepos = await reposData.json()

            if (newRepos.length) {
                setRepos(newRepos)
            }
        }
    }

    return (
        <div className="App">
            <Header />
            <div className="conteudo">

                <img src={background} alt="Git" className="background" />

                <div className="info">

                    <div>
                        <input
                            name='usuário'
                            value={user}
                            onChange={e => setUser(e.target.value)}
                            placeholder="@username"
                        />
                        <button onClick={handleGetData}>Buscar</button>
                    </div>
                    {
                        currentUser?.name ?
                            <>
                                <div className="perfil">
                                    <img src={currentUser.avatar_url} alt='Perfil' title='Perfil' className="profile" />
                                    <div className="">
                                        <h3>{currentUser.name}</h3>
                                        <span>@{currentUser.login}</span>
                                        <span>{currentUser.bio}</span>
                                    </div>
                                </div>
                            </>

                            :
                            null
                    }


                    <hr />
                    {repos?.length ? (

                        <>
                            <div>
                                <h4 className="repositorio">Repositórios</h4>
                                {repos.map((repo) => (
                                    <ItemList key={repo.name} title={repo.name} description={repo.description} />

                                ))}
                                
                            </div>
                        </>
                    )
                        :
                        null
                    }


                </div>
            </div>
        </div>
    );
}

export default App;
