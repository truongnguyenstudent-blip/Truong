
import React, { useEffect } from 'react';
import { artworks } from '../data/artworks';
import ArtworkCard from '../components/ArtworkCard';

const GalleryPage: React.FC = () => {
    useEffect(() => {
        document.title = "Art Gallery | Home";
    }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">Bộ sưu tập</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {artworks.map(artwork => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
