import React from 'react';
import AuthModal from '../../components/AuthModal';
import RegistrModal from '../../components/RegistrModal';
const index = () => {
  const [toggle, setToggle] = React.useState(true);
  return (
    <>
      {toggle ? (
        <AuthModal toggle={toggle} setToggle={setToggle} />
      ) : (
        <RegistrModal toggle={toggle} setToggle={setToggle} />
      )}
    </>
  );
};

export default index;
