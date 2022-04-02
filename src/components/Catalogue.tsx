import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import { useList } from '../hooks/use-list.hook';
import './Catalogue.css';

interface CatalogueProps {
}

const Catalogue: React.FC<CatalogueProps> = (props: CatalogueProps) => {
    const { list, removeItem } = useList();
    return (
        <IonList>
            {list.map((item, index) => {
                return (
                    <IonItemSliding key={item.id}>
                        <IonItem>
                            <IonLabel>{item.value}</IonLabel>
                        </IonItem>
                        <IonItemOptions side="end">
                            <IonItemOption color='danger' onClick={() => { removeItem(item) }}><IonIcon className='item-option' icon={trashOutline}></IonIcon></IonItemOption>
                        </IonItemOptions>
                    </IonItemSliding>
                )

                //     < IonItem key = { index } >
                //         <IonButton>{item.id} - {item.value} - {item.timestamp}</IonButton>
                // </IonItem>
            })}
        </IonList >)
};

export default Catalogue;
