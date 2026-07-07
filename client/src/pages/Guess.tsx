import { IonButton, IonContent, IonHeader, IonInput, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import "./home.css";
import {
  useForm,
  Controller,
} from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';




const Guess: React.FC = () => {
    const queryClient = useQueryClient();
    const [answer, setAnswer] = useState('');
    
    const { roomCode } = useParams<{ roomCode: string }>();
    console.log("roomCode:", roomCode);
    
    
    const location = useLocation<{ username: string }>();
    const username = location.state?.username;

    const {data: gameData, isLoading, isError} = useQuery({
        queryKey: ['/game', roomCode],
        queryFn: async () => {
            const response = await fetch(`/games/${roomCode}`);
            const data = await response.json();
            return data;
        }
    });



    return (
        <IonPage>
        <IonContent fullscreen className="guess-container">

        <IonTitle className="guess-celeb">
          Guess the Celebrity!    {roomCode && <span className="room-code">Room Code: {roomCode}</span>}   {username && <span className="username">Username: {username}</span>}
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