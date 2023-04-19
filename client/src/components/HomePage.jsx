import React from 'react'
import IndexPage from './IndexPage';

const HomePage = () => {
  return (
    <div className="container">
      <h3 style={{ fontWeight: 'bold', marginLeft:'1rem' }}>Checkout our Trending blogs</h3>
      <IndexPage />
    </div>
  )
}

export default HomePage