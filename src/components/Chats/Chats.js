import React, { useRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../../Firebase/Firebase';
import './Chats.css';
import { FaUserSecret } from 'react-icons/fa';
import navBarBackground from '../../images/fakurian-design-bexwsdM5BCw-unsplash.jpg';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const Chats = () => {
  // zadeklarowanie stanu historii
  const history = useHistory();

  // przekazanie danych o uzytkowniku
  const { user } = useAuth();

  console.log(user);

  // stan dla loadingu
  const [loading, setLoading] = useState(true);

  // funkcja wylogowania
  const handleLogout = async () => {
    await auth.signOut();

    // przekierowanie do strony glownej po wylogowaniu
    history.push('/');
  }


  // handler obrazów uytkowników
  const getFile = async (url) => {
    // przyjmuje adres url
    const response = await fetch(url);
    //.blob to pliki, dane w formacie binarnym ktore chcemy transferować
    const data = await response.blob();

    // blob bedzie zwracał array data, nazwę pliku oraz typ obrazu
    return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' })
  }

  useEffect(() => {
    if (!user) {
      history.push('/');

      return;
    }

    axios.get('https://api.chatengine.io/users/me', {
      // odwoluje się do konkretnego uzytkownika dostarczonego przez const { user } = useAuth();, jezeli go ma to wyswietla dla niego konkretny czat
      headers: {
        'project-id': process.env.REACT_APP_CHAT_ENGINE_ID,
        'user-name': user.email,
        'user-secret': user.uid,
      }
    }
    )

      // zmieniam stan loading na false, wiec czat zostanie załadowany (nie bedzie w stanie loading)
      .then(() => {
        setLoading(false);
      })

      // stworzenie profilu uzytkownika w chat engine
      .catch(() => {
        let formdata = new FormData();
        formdata.append('email', user.email);
        formdata.append('username', user.email);
        formdata.append('secret', user.uid);

        // pobieranie zdjęcia avatara
        getFile(user.photoURL)
          .then((avatar) => {
            formdata.append('avatar', avatar, avatar.name);

            axios.post('https://api.chatengine.io/users',
              formdata,
              { headers: { 'private-key': process.env.REACT_APP_CHAT_ENGINE_KEY } }
            )

              // jezeli kreowanie uzytkownika jest pomyślne to ustawiamy stan loading na false, dzieki czemu się utworzy
              .then(() => setLoading(false))
              // jezeli nie to wyświetlamy error
              .catch((error) => console.log(error))
          })
      })
  }, [user, history])


  // warunek mowiacy, ze jezeli nie ma danych o uzytkowniku lub stan aplikacji to loading, to ma wyswietlic sie string "loading"
  if (!user || loading) return 'Loading...';

  return (
    <div
      className='chats-page'
      style={{ backgroundImage: `url(${navBarBackground})` }}
    >
      <div className='nav-bar'>
        <div className='logo-tab'>
          <FaUserSecret />
          Whisperer
        </div>
        <div onClick={handleLogout} className='logout-tab'>
          Logout
        </div>
      </div>
      {/* konfiguracja chat engina */}
      <ChatEngine
        height='calc(100vh - 66px)'
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  )
}

export default Chats
