import { IonBadge } from '@ionic/react';
import { useRecoilValue } from 'recoil';
import { listCountSelector } from '../data/list-count.selector';


const ListCountBadge: React.FC = () => {
    const count = useRecoilValue(listCountSelector);
    return (
        count > 0 ? <IonBadge color="primary">{count}</IonBadge> : null
    )
};

export default ListCountBadge;
