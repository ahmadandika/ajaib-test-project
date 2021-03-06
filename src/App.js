import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from 'components/molecules/Layout';
import Home from 'pages/Home';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
