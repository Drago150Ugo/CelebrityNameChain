import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';



const Home: React.FC = () => {
  const [result, setResult] = useState("");

  const getHealth = async () => {
    const response = await fetch("http://localhost:3000/health");
    const data = await response.json();
    setResult(JSON.stringify(data));
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Celebrity Name Chain</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <p>Hello, world!</p>

        <IonButton onClick={getHealth}>Health Route check
          <p>{result}</p>
        </IonButton>
        <div></div>

      </IonContent>
    </IonPage>
  );
};

export default Home;
