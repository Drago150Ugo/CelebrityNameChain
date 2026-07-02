import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';

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
      <IonButton routerLink="/set-lobby">    
        SET LOBBY
      </IonButton>
      </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
