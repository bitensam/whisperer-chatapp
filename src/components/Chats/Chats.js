import React from 'react'
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../../Firebase/Firebase';
import './Chats.css';
import { FaUserSecret } from 'react-icons/fa';
import navBarBackground from '../../images/fakurian-design-bexwsdM5BCw-unsplash.jpg';
import { useAuth } from '../../contexts/AuthContext';

const Chats = () => {
  // zadeklarowanie stanu historii
  const history = useHistory();

  // przekazanie danych o uzytkowniku
  const { user } = useAuth();

  console.log(user);

  // funkcja wylogowania
  const handleLogout = async () => {
    await auth.signOut();

    // przekierowanie do strony glownej po wylogowaniu
    history.push('/');
  }

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
        projectId='29efa485-ed5f-4718-910e-096a3a7187aa'
        userName='.'
        userSecret='.'
      />
    </div>
  )
}

export default Chats
