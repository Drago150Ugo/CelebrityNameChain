import React, { useEffect } from 'react';
import { IonButton, IonContent, IonInput, IonList, IonPage, IonTitle } from '@ionic/react';
import { useForm, Controller } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import "./Home.css";

interface LobbyForm {
  username: string;
  roomCode: string;
}

const fetchSavedName = async (): Promise<string> => {
  return new Promise((resolve) => setTimeout(() => resolve('DevUser'), 1000));
};

const Lobby: React.FC = () => {
  const { data: savedName } = useQuery({
    queryKey: ['savedName'],
    queryFn: fetchSavedName,
  });

  const { control, handleSubmit, reset } = useForm<LobbyForm>({
    defaultValues: { username: '', roomCode: '' }
  });

  useEffect(() => {
    if (savedName) {
      reset({ username: savedName, roomCode: '' });
    }
  }, [savedName, reset]);

  const onJoinRoom = (data: LobbyForm) => {
    console.log("Joining room with:", data);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonTitle className="ion-text-center">Welcome To The Lobby</IonTitle>
        
        <form onSubmit={handleSubmit(onJoinRoom)}>
          <IonList>
            {/*Name*/}
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