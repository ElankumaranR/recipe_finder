import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="bg-gradient-to-r from-yellow-100 to-orange-200 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Welcome to Recipe Finder</h1>
          <a
            href="/search"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
          >
            Find Recipes
          </a>
        </div>
      </header>

      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <img
              src="https://www.howsweeteats.com/wp-content/uploads/2020/10/basil-curry-chickpeas-21.jpg"
              alt="Variety of Recipes"
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Wide Variety of Recipes</h3>
            <p className="text-gray-600 text-sm">Explore thousands of recipes from around the world.</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 text-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRknSkbnnNfWBLBldnSJgnGwh6vZaDGJKUfg&s"
              alt="Easy to Follow"
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Easy to Follow</h3>
            <p className="text-gray-600 text-sm">Step-by-step instructions for every meal.</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 text-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYRwHwe8lw7m845LbUMpUJdr9BLDVZhXUSiA&s"
              alt="Save Your Favorites"
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Save Your Favorites</h3>
            <p className="text-gray-600 text-sm">Save and organize your favorite recipes for later.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
