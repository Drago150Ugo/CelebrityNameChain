import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonList, IonLabel, IonItem } from '@ionic/react';
import React, { useEffect, useState } from 'react';


import "./home.css";
const Home: React.FC = () => {
  const [result, setResult] = useState("");

  const getHealth = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/health`);//import ensures env config standard across all machines
    const data = await response.json();
    setResult(JSON.stringify(data));
};
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

        <IonButton onClick={getHealth}>Health Route check
          <p>{result}</p>
        </IonButton>
        <div></div>
      
      </IonContent>
    </IonPage>
  );
};

export default Home;
