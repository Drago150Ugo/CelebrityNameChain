import React, { useEffect } from 'react';
import { IonButton, IonContent, IonInput, IonList, IonPage, IonTitle } from '@ionic/react';
import { useForm, Controller } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import "./home.css";

interface LobbyForm {
  username: string;
  roomCode: string;
  celebrity: string
}

const Lobby: React.FC = () => {

  const { control, handleSubmit } = useForm<LobbyForm>({
    defaultValues: { username: '', roomCode: '' }
  });

  const onJoinRoom = (data: LobbyForm) => {
    console.log("Joining room with:", data);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonTitle className="ion-text-center">
          Welcome To The Lobby
        </IonTitle>

        <form onSubmit={handleSubmit(onJoinRoom)}>
          <IonList>
            
            {/* Name */}
            <Controller
              control={control}
              name="username"
              render={({ field }) => (
                <IonInput
                  placeholder="Enter your name"
                  value={field.value}
                  onIonInput={e => field.onChange(e.detail.value)}
                />
              )}
            />

            {/* Room Code */}
            <Controller
              control={control}
              name="roomCode"
              render={({ field }) => (
                <IonInput
                  placeholder="Enter room code"
                  value={field.value}
                  onIonInput={e => field.onChange(e.detail.value)}
                />
              )}
            />

            <IonButton type="submit" color="danger" expand="block">
              Join Room
            </IonButton>

            <IonButton color="danger" expand="block" fill="outline">
              Create Room
            </IonButton>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
}

export default Lobby;