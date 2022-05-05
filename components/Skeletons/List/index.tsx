import React from 'react';
import CardSkeleton from '../Card';
import style from './style.module.scss';

interface ListSkeletonProps {
    total: number
}

const ListSkeleton: React.FC<ListSkeletonProps> = ({ total = 6 }) => {
    const listCardSkeleton = [];
    for (let i = 0; i < total; i++) {
        listCardSkeleton.push(
            <div className={style.item} key={`card-skeleton-${i}`}>
                <CardSkeleton />
            </div>,
        );
    }
    return (
        <div className={style.container}>
            {listCardSkeleton}
        </div>
    );
};

export default ListSkeleton;