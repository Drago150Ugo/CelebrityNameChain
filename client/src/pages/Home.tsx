import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import "./Home.css";
const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center"> 
            Celebrity Name Chain
            </IonTitle>
            </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <div className="home-screen">
      <IonButton 
      expand="block"
      size="large"    
      routerLink="/Lobby">    
        SET LOBBY
      </IonButton>
      </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
