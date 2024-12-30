import Lottie from 'lottie-react';

const DisplayLottie = ({ animationData }) => {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default DisplayLottie;