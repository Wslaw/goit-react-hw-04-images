import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { nanoid } from 'nanoid';


const Loader = () => {
  const uniqueId = nanoid();

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <ThreeDots key={uniqueId} color="#3f51b5" height={40} width={40} />
    </div>
  );
};

export default Loader;
