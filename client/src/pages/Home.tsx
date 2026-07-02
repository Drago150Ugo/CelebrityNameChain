import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonText, IonList, IonLabel, IonItem } from '@ionic/react';
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
      color="danger"
      routerLink="/Lobby">    
        LOBBY
      </IonButton>
      <IonText>
    <h3>How To Play</h3>
      </IonText>
              <IonList>
            <IonItem lines="none">
              <IonLabel>Start with a celebrity.</IonLabel>
            </IonItem>

            <IonItem lines="none">
              <IonLabel>
                Name another celebrity connected by the last name.
              </IonLabel>
            </IonItem>

            <IonItem lines="none">
              <IonLabel>Don't repeat names.</IonLabel>
            </IonItem>
          </IonList>

      </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
