import { IonButton, IonContent, IonHeader, IonInput, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Lobby: React.FC = () => {
  return (
    <IonPage>
        <IonTitle>
            Lobby
        </IonTitle>
        <IonContent fullscreen>
            <p>Welcome to the lobby!</p>
        </IonContent>
        <IonList>
            <IonInput placeholder="Enter your name" />
            <IonInput placeholder="Enter room code" />
            <IonButton>Join Room</IonButton>
            <IonButton>Create Room</IonButton>  
        </IonList>
    </IonPage>
  );
}
export default Lobby;
