import React, { useState, useEffect, useMemo } from 'react';
import { Search, Settings, Moon, Sun, Heart, BookOpen, TrendingUp, Star, Menu, X, GripVertical } from 'lucide-react';

// Mock data for demonstration
const mockNews = [
  {
    id: '1',
    title: 'Revolutionary AI Breakthrough in Healthcare',
    description: 'Scientists develop AI system that can predict diseases with 95% accuracy',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
    category: 'technology',
    type: 'news',
    isFavorite: false,
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    title: 'Championship Final Set for This Weekend',
    description: 'Two powerhouse teams prepare for the ultimate showdown',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=250&fit=crop',
    category: 'sports',
    type: 'news',
    isFavorite: true,
    timestamp: '4 hours ago'
  },
  {
    id: '3',
    title: 'Market Volatility Continues Amid Economic Uncertainty',
    description: 'Investors remain cautious as global markets show mixed signals',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop',
    category: 'finance',
    type: 'news',
    isFavorite: false,
    timestamp: '6 hours ago'
  }
];

const mockRecommendations = [
  {
    id: '4',
    title: 'The Future of Technology Documentary',
    description: 'Explore cutting-edge innovations shaping tomorrow',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
    category: 'technology',
    type: 'recommendation',
    isFavorite: false,
    rating: 4.8
  },
  {
    id: '5',
    title: 'Championship Highlights Collection',
    description: 'Best moments from this season\'s games',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
    category: 'sports',
    type: 'recommendation',
    isFavorite: true,
    rating: 4.6
  }
];

const mockSocial = [
  {
    id: '6',
    title: '#TechTrends2024 is trending worldwide',
    description: 'Join the conversation about emerging technologies',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop',
    category: 'technology',
    type: 'social',
    isFavorite: false,
    hashtags: ['#TechTrends2024', '#Innovation']
  }
];

const categories = ['all', 'technology', 'sports', 'finance', 'entertainment'];

const ContentCard = ({ content, onFavorite, onRead, isDragging = false }) => {
  const [imageError, setImageError] = useState(false);
  
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group ${
        isDragging ? 'scale-105 rotate-2 z-50' : 'hover:scale-[1.02]'
      }`}
    >
      <div className="relative">
        {!imageError ? (
          <img 
            src={content.image} 
            alt={content.title}
            className="w-full h-48 object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
        )}
        <div className="absolute top-3 right-3 flex gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            content.type === 'news' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
            content.type === 'recommendation' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
            'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
          }`}>
            {content.type}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {content.title}
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavorite(content.id);
            }}
            className={`ml-3 p-2 rounded-full transition-all duration-200 ${
              content.isFavorite 
                ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' 
                : 'text-gray-400 hover:text-red-500 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Heart className={`w-5 h-5 ${content.isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {content.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {content.timestamp && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {content.timestamp}
              </span>
            )}
            {content.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {content.rating}
                </span>
              </div>
            )}
          </div>
          
          <button
            onClick={() => onRead(content.id)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
          >
            {content.type === 'recommendation' ? 'Watch Now' : 'Read More'}
          </button>
        </div>
        
        {content.hashtags && (
          <div className="flex flex-wrap gap-1 mt-3">
            {content.hashtags.map((tag, index) => (
              <span key={index} className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Sidebar = ({ isOpen, onClose, selectedCategory, onCategoryChange, favorites, darkMode, onDarkModeToggle }) => {
  const sidebarClasses = `fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
    isOpen ? 'translate-x-0' : '-translate-x-full'
  } lg:translate-x-0 lg:static lg:shadow-none`;
  
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      <div className={sidebarClasses}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Dashboard
            </h1>
            <button 
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="space-y-2">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Categories
              </h3>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="capitalize">{category}</span>
                </button>
              ))}
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Quick Stats
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Favorites</span>
                  <span>{favorites}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Read Today</span>
                  <span>12</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={onDarkModeToggle}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

const Header = ({ onMenuToggle, searchTerm, onSearchChange, darkMode }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 md:w-80 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

const DragHandle = ({ isDragging }) => (
  <div className={`cursor-grab active:cursor-grabbing p-2 ${isDragging ? 'opacity-50' : ''}`}>
    <GripVertical className="w-4 h-4 text-gray-400" />
  </div>
);

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [contentItems, setContentItems] = useState([...mockNews, ...mockRecommendations, ...mockSocial]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOver, setDragOver] = useState(null);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter content based on category and search
  const filteredContent = useMemo(() => {
    let filtered = contentItems;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (debouncedSearchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [contentItems, selectedCategory, debouncedSearchTerm]);

  const favoriteCount = contentItems.filter(item => item.isFavorite).length;
  const trendingContent = contentItems.slice(0, 3);

  const handleFavorite = (id) => {
    setContentItems(items =>
      items.map(item =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const handleRead = (id) => {
    console.log('Reading content:', id);
    // In a real app, this would navigate to the full content
  };

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, item) => {
    e.preventDefault();
    if (draggedItem && draggedItem.id !== item.id) {
      setDragOver(item.id);
    }
  };

  const handleDrop = (e, targetItem) => {
    e.preventDefault();
    if (draggedItem && draggedItem.id !== targetItem.id) {
      const draggedIndex = contentItems.findIndex(item => item.id === draggedItem.id);
      const targetIndex = contentItems.findIndex(item => item.id === targetItem.id);
      
      const newItems = [...contentItems];
      const draggedContent = newItems.splice(draggedIndex, 1)[0];
      newItems.splice(targetIndex, 0, draggedContent);
      
      setContentItems(newItems);
    }
    setDraggedItem(null);
    setDragOver(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOver(null);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="flex bg-gray-50 dark:bg-gray-900">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          favorites={favoriteCount}
          darkMode={darkMode}
          onDarkModeToggle={() => setDarkMode(!darkMode)}
        />
        
        <div className="flex-1 lg:ml-0">
          <Header
            onMenuToggle={() => setSidebarOpen(true)}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            darkMode={darkMode}
          />
          
          <main className="p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Welcome back! 👋
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Here's what's trending in your personalized feed
              </p>
            </div>

            {/* Trending Section */}
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Trending Now
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingContent.map((item) => (
                  <ContentCard
                    key={`trending-${item.id}`}
                    content={item}
                    onFavorite={handleFavorite}
                    onRead={handleRead}
                  />
                ))}
              </div>
            </section>

            {/* Main Content Feed */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Your Personalized Feed
                  {selectedCategory !== 'all' && (
                    <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                      • {selectedCategory}
                    </span>
                  )}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredContent.length} items
                </span>
              </div>

              {filteredContent.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    No content found. Try adjusting your search or category filter.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredContent.map((item) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item)}
                      onDragOver={(e) => handleDragOver(e, item)}
                      onDrop={(e) => handleDrop(e, item)}
                      onDragEnd={handleDragEnd}
                      className={`relative transition-all duration-200 ${
                        dragOver === item.id ? 'scale-105' : ''
                      } ${draggedItem?.id === item.id ? 'opacity-50' : ''}`}
                    >
                      <div className="absolute top-2 left-2 z-10">
                        <DragHandle isDragging={draggedItem?.id === item.id} />
                      </div>
                      <ContentCard
                        content={item}
                        onFavorite={handleFavorite}
                        onRead={handleRead}
                        isDragging={draggedItem?.id === item.id}
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Load More Button */}
            {filteredContent.length > 0 && (
              <div className="text-center mt-12">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
                  Load More Content
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;