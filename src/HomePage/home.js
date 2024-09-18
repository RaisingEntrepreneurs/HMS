import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';
import LoginEffect from './login';
import Home  from '../images/Home.jpg' ;

const HomePage = () => {
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '90vh' }}>          
      <main style={{ flex: 1, padding: '0', textAlign: 'left', backgroundSize: 'cover', overflowX: 'auto', whiteSpace: 'nowrap', position: 'relative', height: '100vh' }}>
        <img src={Home} alt="Home" style={{ width: '100%', height: 'auto', maxWidth: '100%' }} />
        <div style={{ position: 'absolute', top: '85%', left: '50%', transform: 'translate(-50%, -50%)', padding: '10px', borderRadius: '5px' }}>
          <LoginEffect/>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
