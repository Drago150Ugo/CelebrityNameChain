import { IonButton, IonContent, IonHeader, IonInput, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useForm, Controller } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

interface LobbyInput {
    username: string;
    roomCode: string;
}



const Lobby: React.FC = () => {
    const { control, handleSubmit } = useForm<LobbyInput>();
    const queryClient = useQueryClient();

    return (
        <IonPage>
            <IonTitle>
                Lobby
            </IonTitle>
            <IonContent fullscreen>
                <p>Welcome to the lobby!</p>
            </IonContent>
            <IonList>
                <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <IonInput {...field} placeholder="Enter your name" />}
                />
                <Controller
                    name="roomCode"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <IonInput {...field} placeholder="Enter room code" />}
                />
                <IonButton onClick={handleSubmit((data) => console.log(data))}>
                    Join Room
                </IonButton>
                <IonButton onClick={handleSubmit((data) => console.log(data))}>
                    Create Room
                </IonButton>
            </IonList>
        </IonPage>
    );
}
export default Lobby;
