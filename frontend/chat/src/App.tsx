import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AuthProvider } from './context/AuthProvider';
import Chats from './components/private/Chats';
import Buscar from './components/private/Buscar';
import Login from './components/public/Login';
import Registro from './components/public/Registro';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Chat from './components/private/Chat';
import { useState } from 'react';

setupIonicReact();

const App: React.FC = () => {

  const [chats, setChats] = useState([]);

  return (
    <IonApp>
      <IonReactRouter>
        <AuthProvider>
          <IonRouterOutlet>
            <Route exact path="/">
              <Chats
                chats={chats}
                setChats={setChats}
              />
            </Route>
            <Route exact path="/buscar">
              <Buscar chats={chats} />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/registro">
              <Registro />
            </Route>
            <Route exact path="/chat/:id">
              <Chat />
            </Route>
          </IonRouterOutlet>
        </AuthProvider>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
