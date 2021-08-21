import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../Firebase/Firebase';

// utworzenie contextu
const AuthContext = React.createContext();
// utworzenie funckji eksportującej ten context. AuthContext jest przekazywany do hooka useContext
export const useAuth = () => useContext(AuthContext);
// utworzenie dostawcy conextu z destrukturyzacja propsów - przekazujemy children (potomków) - to wyrenderuje wszystki dane dostarczone przez AuthProvider
export const AuthProvider = ({ children }) => {
  // ustawienie stanów
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const history = useHistory();

  // useEffect wywyoła się za kadym razem gdy zmieni się wartość user i history.
  // Gdy stan autoryzacji zmieni się wykona się funckja która da nam dane usera
  // gdy dostaniemy dane uzytkownika, mozemy wywolac stan uytkownika i przypisać właśnie tego konkretnego
  // gdy ustawimy stan uzytkownika mozemy ustawić loading na false, poniewaz nie ma co sie juz ladować
  // gdy nie ładujemy mozemy wywyołać historie i dodać do niej stringa ktory ponownie przeniesie nas do widoku chatu
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      history.push('/chats');
    })
  }, [user, history]);

  // gdy pracuje się z kontekstem trzeba miec 1 obiekt wartości, zebysmy mogli utworzyc wartosc
  // a ta wartosc bedzie miala właściwość prop user

  const value = { user };

  return (
    <AuthContext.Provider value={value}>
      {/* jezeli nie ładuje to pokaz dzieci (children) */}
      {!loading && children}
    </AuthContext.Provider>
  )
}