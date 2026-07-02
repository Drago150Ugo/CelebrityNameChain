import { IonButton, IonContent, IonHeader, IonInput, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import "./Home.css";
const Lobby: React.FC = () => {
  return (
    <IonPage>
        <IonContent fullscreen>
             <IonTitle className="ion-text-center"> 
            Welcome To The Lobby 
            </IonTitle>
              <IonList>
            <IonInput placeholder="Enter your name" />
            <IonInput placeholder="Enter room code" />
            <IonButton
            color="danger"
            routerLink="/Guess">  
            Join Room</IonButton>
            <IonButton       
            color="danger">
            Create Room</IonButton>  
        </IonList>
        </IonContent>
    </IonPage>
  );
}
export default Lobby;
