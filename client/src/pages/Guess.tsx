import { IonButton, IonContent, IonHeader, IonInput, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import "./home.css";

const Guess: React.FC = () => {
    return (
        <IonPage>
        <IonContent fullscreen className="guess-container">

        <IonTitle className="guess-celeb">
          Guess the Celebrity!
        </IonTitle>
        <div className="guess-input">
            <IonInput placeholder="Enter your guess" />
            <IonButton color="danger">
                 Submit Guess
          </IonButton>
        </div>
</IonContent>
        </IonPage>
    );
}
    export default Guess;