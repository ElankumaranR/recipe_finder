import React from 'react';
import './components/Home.css'; // Add the styles for the home page

const Home = () => {
  return (
    <div className="home-page">
      <header className="hero-section">
        <div className="hero-content">
          
          <a href="/search" className="cta-button">Find Recipes</a>
        </div>
      </header>

      <section className="features-section">
        <div className="feature">
          <img src="https://www.howsweeteats.com/wp-content/uploads/2020/10/basil-curry-chickpeas-21.jpg" alt="Variety of Recipes" className="feature-img"/>
          <h3>Wide Variety of Recipes</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Explore thousands of recipes from around the world.</p>
        </div>
        <div className="feature">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRknSkbnnNfWBLBldnSJgnGwh6vZaDGJKUfg&s" alt="Easy to Follow" className="feature-img"/>
          <h3>Easy to Follow</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Step-by-step instructions for every meal.</p>
        </div>
        <div className="feature">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYRwHwe8lw7m845LbUMpUJdr9BLDVZhXUSiA&s" alt="Save Your Favorites" className="feature-img"/>
          <h3>Save Your Favorites</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Save and organize your favorite recipes for later.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
