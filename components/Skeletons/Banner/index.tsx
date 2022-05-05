import React from 'react';
import ContentLoader from 'react-content-loader';

const BannerSkeleton: React.FC = () => {
    return (
        <ContentLoader
            uniqueKey="card-skeleton"
            speed={2}
            width="100%"
            height="100%"
            viewBox="0 0 3840 2160"
            backgroundColor="#525252"
            foregroundColor="#363636"
        >
            <rect x="0" y="0" rx="2" ry="2" width="100%" height="2160" />
        </ContentLoader>
    );
};

export default BannerSkeleton;