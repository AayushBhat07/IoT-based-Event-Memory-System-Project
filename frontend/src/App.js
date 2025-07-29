import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { ArrowRight, Search, Camera, MapPin, Globe, Users, Zap, Menu, X, Brain, Shield, Clock, Upload, Download, Eye, BarChart3, Calendar, Settings, LogOut, Bell, User, Home, ImageIcon, TrendingUp, Moon, Sun, Mail, Lock, CheckCircle, AlertCircle, Edit, Save, Plus, Filter, Grid, List, Heart, Share2, Trash2, Edit3, UserPlus, MapPin as Location, Phone, Instagram, Facebook, Twitter, Linkedin, Github, Star, Award, Target, Palette, Volume2, Globe as Language, Shield as Security, CreditCard, HelpCircle, ChevronRight, ChevronDown, Tag, FolderOpen, Image as ImageIcon2, Video, FileText, MoreHorizontal } from 'lucide-react';
import './App.css';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check authentication on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  // Login function
  const login = (email, password) => {
    // Simulate authentication
    if (email === 'alex@reclick.com' && password === 'password') {
      const userData = {
        id: 1,
        name: 'Alex Johnson',
        email: 'alex@reclick.com',
        role: 'photographer'
      };
      
      localStorage.setItem('authToken', 'mock-jwt-token');
      localStorage.setItem('userData', JSON.stringify(userData));
      setIsAuthenticated(true);
      setUser(userData);
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = '/';
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/signin" replace />;
    }
    return children;
  };

  // Mock Data
  const [events, setEvents] = useState([
    { id: 1, title: "Summer Wedding", date: "2025-06-15", type: "Wedding", status: "upcoming", photos: 324, location: "Beach Resort", client: "Emma & Jake" },
    { id: 2, title: "Birthday Party", date: "2025-05-20", type: "Birthday", status: "completed", photos: 156, location: "Garden Venue", client: "Sarah Johnson" },
    { id: 3, title: "Corporate Event", date: "2025-07-10", type: "Corporate", status: "upcoming", photos: 0, location: "Convention Center", client: "Tech Corp" },
    { id: 4, title: "Graduation Ceremony", date: "2025-05-25", type: "Graduation", status: "completed", photos: 89, location: "University Hall", client: "Class of 2025" }
  ]);

  const [photos, setPhotos] = useState([
    { id: 1, filename: "wedding_001.jpg", event: "Summer Wedding", date: "2025-06-15", tags: ["wedding", "couple", "outdoor"], size: "2.4MB", views: 45, likes: 12 },
    { id: 2, filename: "birthday_012.jpg", event: "Birthday Party", date: "2025-05-20", tags: ["birthday", "celebration", "kids"], size: "1.8MB", views: 23, likes: 8 },
    { id: 3, filename: "corporate_034.jpg", event: "Corporate Event", date: "2025-07-10", tags: ["business", "presentation", "indoor"], size: "3.1MB", views: 67, likes: 15 },
    { id: 4, filename: "graduation_023.jpg", event: "Graduation Ceremony", date: "2025-05-25", tags: ["graduation", "ceremony", "academic"], size: "2.7MB", views: 34, likes: 9 }
  ]);

  const [userProfile, setUserProfile] = useState({
    name: "Alex Johnson",
    email: "alex@reclick.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Professional photographer specializing in weddings and corporate events. Passionate about capturing life's precious moments.",
    website: "alexjohnson.photography",
    social: {
      instagram: "@alexjohnson_photo",
      facebook: "AlexJohnsonPhotography",
      twitter: "@alexjphoto",
      linkedin: "alex-johnson-photographer"
    },
    stats: {
      totalEvents: 54,
      totalPhotos: 11823,
      totalClients: 127,
      avgRating: 4.9
    }
  });

  const Navigation = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream-light/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-orange-primary text-2xl font-bold lowercase">
            reclick
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/about" className="text-navy-primary hover:text-orange-primary transition-colors">About Us</Link>
            
            {/* Protected Navigation Links - Only show when authenticated */}
            {isAuthenticated && (
              <>
                <Link to="/dashboard" className="text-navy-primary hover:text-orange-primary transition-colors">Dashboard</Link>
                <Link to="/events" className="text-navy-primary hover:text-orange-primary transition-colors">Events</Link>
                <Link to="/gallery" className="text-navy-primary hover:text-orange-primary transition-colors">Gallery</Link>
                <Link to="/profile" className="text-navy-primary hover:text-orange-primary transition-colors">Profile</Link>
                <Link to="/settings" className="text-navy-primary hover:text-orange-primary transition-colors">Settings</Link>
              </>
            )}
          </div>
          
          {/* Authentication Button */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-navy-primary">Welcome, {user?.name}</span>
              <button 
                onClick={logout}
                className="bg-orange-primary text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/signin" className="hidden md:block bg-transparent border-2 border-navy-primary text-navy-primary px-6 py-2 rounded-full hover:bg-navy-primary hover:text-white transition-all">
              Sign In
            </Link>
          )}
          
          <button 
            className="md:hidden text-navy-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link to="/about" className="text-navy-primary hover:text-orange-primary transition-colors" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              
              {/* Protected Mobile Navigation Links */}
              {isAuthenticated && (
                <>
                  <Link to="/dashboard" className="text-navy-primary hover:text-orange-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                  <Link to="/events" className="text-navy-primary hover:text-orange-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Events</Link>
                  <Link to="/gallery" className="text-navy-primary hover:text-orange-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
                  <Link to="/profile" className="text-navy-primary hover:text-orange-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                  <Link to="/settings" className="text-navy-primary hover:text-orange-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Settings</Link>
                </>
              )}
              
              {/* Mobile Authentication Button */}
              {isAuthenticated ? (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-navy-primary mb-2">Welcome, {user?.name}</p>
                  <button 
                    onClick={logout}
                    className="bg-orange-primary text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-all w-fit"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/signin" className="bg-transparent border-2 border-navy-primary text-navy-primary px-6 py-2 rounded-full hover:bg-navy-primary hover:text-white transition-all w-fit" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  const HomePage = () => {
    const [animatedText] = useState('Upload Photo');

    return (
      <div className="min-h-screen bg-cream-light relative overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-10">
            <div className="w-full h-full bg-gradient-radial from-orange-primary/20 to-transparent rounded-full"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-6xl lg:text-8xl font-bold text-navy-primary leading-tight">
                  Reclaim your<br />
                  <span className="text-navy-primary">moments.</span>
                </h1>
                <h2 className="text-6xl lg:text-8xl font-bold text-navy-primary leading-tight mt-4">
                  Photographs<br />
                  that found{' '}
                  <span className="italic text-navy-primary">you</span>.
                </h2>
              </div>
              
              <button className="bg-orange-primary text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center space-x-3 hover:bg-orange-600 transition-all hover:shadow-lg hover:scale-105 group relative z-20">
                <Search size={20} />
                <span>Find My Photos</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Content */}
            <div className="relative">
              <div className="text-right mb-8">
                <p className="text-navy-primary text-xl font-medium">
                  An AI-powered portal to find photos you're in.
                </p>
              </div>
              
              {/* Updated Photographer Image with Glow */}
              <div className="relative mb-8">
                <div className="flex justify-center">
                  <div className="relative w-80 h-96 bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200 photographer-glow">
                    <img 
                      src="https://customer-assets.emergentagent.com/job_bold-frames/artifacts/78npq2ar_photographer.png"
                      alt="Photographer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Simplified Globe Area */}
              <div className="relative">
                <div className="relative w-full h-96">
                  {/* Waypoint Dots Only */}
                  <div className="absolute top-12 left-12 w-4 h-4 bg-white rounded-full border-2 border-orange-primary"></div>
                  <div className="absolute bottom-12 right-12 w-4 h-4 bg-orange-primary rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-orange-primary"></div>
                  
                  {/* Static Floating Tag */}
                  <div className="absolute top-24 left-24 bg-white px-3 py-1 rounded-full text-sm font-medium text-navy-primary border border-gray-300">
                    {animatedText}
                  </div>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex justify-end space-x-4 mt-8">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <div className="w-6 h-6 bg-orange-primary rounded-full"></div>
                </div>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <div className="w-6 h-6 bg-orange-primary rounded-full"></div>
                </div>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <div className="w-6 h-6 bg-orange-primary rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mt-20">
            {/* Left Card */}
            <div className="bg-white rounded-3xl p-8 relative overflow-hidden shadow-lg">
              <div className="absolute top-4 right-4">
                <ArrowRight size={24} className="text-navy-primary" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-navy-primary">
                  Find your face across<br />
                  global events.
                </h3>
                <p className="text-gray-600 text-sm">
                  Your memories may be in thousands of uncategorized photos.
                </p>
                <div className="flex justify-center mt-8">
                  <div className="text-6xl">👥</div>
                </div>
              </div>
            </div>

            {/* Right Card */}
            <div className="bg-orange-primary rounded-3xl p-8 relative overflow-hidden shadow-lg">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">
                  AI-Powered Reverse<br />
                  Photo Search
                </h3>
                <p className="text-white/90 text-sm">
                  Upload your photo to instantly find matches.
                </p>
                <div className="flex justify-center mt-8">
                  <div className="relative">
                    <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center">
                      <Camera size={32} className="text-orange-primary" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-navy-primary text-white text-xs px-2 py-1 rounded-full">
                      reclick
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AboutPage = () => (
    <div className="min-h-screen bg-cream-light">
      <div className="pt-32 pb-20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Photographer Image */}
            <div className="flex justify-center">
              <div className="relative w-80 h-96 photographer-glow">
                <img 
                  src="https://customer-assets.emergentagent.com/job_bold-frames/artifacts/78npq2ar_photographer.png"
                  alt="Photographer Character"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            {/* Right - Hero Text */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-navy-primary leading-tight">
                Behind Every Photo,<br />
                There's a <span className="text-orange-primary">Purpose</span>.
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                We make finding your memories as easy as uploading a photo.
              </p>
              <div className="flex justify-center lg:justify-start mt-8">
                <div className="animate-bounce">
                  <ArrowRight size={24} className="text-orange-primary transform rotate-90" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why We Built This Section */}
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <div className="bg-white rounded-3xl p-12 shadow-lg">
            <h2 className="text-4xl font-bold text-navy-primary text-center mb-12">
              Why We Built <span className="text-orange-primary">This</span>
            </h2>
            
            <div className="space-y-8 text-lg text-gray-700 leading-relaxed mb-12">
              <p>
                We've all been to events where photographers click hundreds of photos. But later, 
                finding our own picture in that huge pile? It's a mess.
              </p>
              <p>
                This platform solves that. Just upload a reference image of yourself — and our system 
                will instantly surface all the matching photos from the event gallery.
              </p>
              <p className="text-navy-primary font-semibold">
                It's private. It's fast. And it's built just for you.
              </p>
            </div>

            {/* Feature Icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-cream-light rounded-2xl hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-orange-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-navy-primary mb-2">Search</h3>
                <p className="text-sm text-gray-600">Find photos instantly</p>
              </div>
              
              <div className="text-center p-6 bg-cream-light rounded-2xl hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-orange-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-navy-primary mb-2">AI</h3>
                <p className="text-sm text-gray-600">Smart matching</p>
              </div>
              
              <div className="text-center p-6 bg-cream-light rounded-2xl hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-orange-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-navy-primary mb-2">Privacy</h3>
                <p className="text-sm text-gray-600">Your data is safe</p>
              </div>
              
              <div className="text-center p-6 bg-cream-light rounded-2xl hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-orange-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-navy-primary mb-2">Speed</h3>
                <p className="text-sm text-gray-600">Results in seconds</p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <h2 className="text-4xl font-bold text-navy-primary text-center mb-12">
            How It <span className="text-orange-primary">Works</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-orange-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-navy-primary mb-4">Upload Your Face</h3>
              <p className="text-gray-600">Just one selfie is enough.</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-orange-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-navy-primary mb-4">Let AI Do Its Thing</h3>
              <p className="text-gray-600">We match it against event photos instantly.</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-orange-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Download size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-navy-primary mb-4">Download Your Shots</h3>
              <p className="text-gray-600">Pick, save, and share.</p>
            </div>
          </div>
        </div>

        {/* Our Icon Section */}
        <div className="max-w-4xl mx-auto px-6 mb-20">
          <div className="bg-white rounded-3xl p-12 shadow-lg text-center">
            <div className="w-32 h-32 mx-auto mb-8">
              <img 
                src="https://customer-assets.emergentagent.com/job_bold-frames/artifacts/78npq2ar_photographer.png"
                alt="Our Icon"
                className="w-full h-full object-contain photographer-glow"
              />
            </div>
            <h2 className="text-3xl font-bold text-navy-primary mb-6">Our Icon</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              This happy little photographer represents what we stand for — fun, creative tech 
              that works for everyone. Simple, friendly, and always ready to help you find your moments.
            </p>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="bg-gradient-to-r from-orange-primary to-orange-600 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-5xl font-bold text-white mb-6">
              Let's Find Your Moments.
            </h2>
            <p className="text-xl text-white/90 mb-8">
              You were there. We've got the proof. Let's help you find it.
            </p>
            <button className="bg-white text-orange-primary px-12 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center space-x-3">
              <Upload size={20} />
              <span>Upload My Photo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const DashboardPage = () => (
    <div className="min-h-screen bg-cream-light flex">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-navy-primary text-white p-6 rounded-r-3xl">
        <div className="mb-8">
          <h2 className="text-xl font-bold">reclick</h2>
          <p className="text-sm text-gray-300">Photography Platform</p>
        </div>
        
        <nav className="space-y-2">
          <a href="#" className="flex items-center space-x-3 p-3 rounded-lg bg-orange-primary">
            <Home size={20} />
            <span>Dashboard</span>
          </a>
          <Link to="/events" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-navy-600 transition-colors">
            <Calendar size={20} />
            <span>Events</span>
          </Link>
          <Link to="/gallery" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-navy-600 transition-colors">
            <Upload size={20} />
            <span>Gallery</span>
          </Link>
          <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-navy-600 transition-colors">
            <Camera size={20} />
            <span>Event Types</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-navy-600 transition-colors">
            <BarChart3 size={20} />
            <span>Analytics</span>
          </a>
          <Link to="/settings" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-navy-600 transition-colors">
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </nav>
        
        <div className="mt-auto pt-8">
          <div className="flex items-center justify-between">
            <span className="text-sm">Theme</span>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-navy-600 transition-colors"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
              <span className="text-xs">{isDarkMode ? 'Light' : 'Dark'}</span>
            </button>
          </div>
          <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-navy-600 transition-colors mt-2" onClick={logout}>
            <LogOut size={20} />
            <span>Logout</span>
          </a>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-navy-primary">Good Morning, {user?.name || 'Photographer'} 👋</h1>
            <p className="text-gray-600">Thursday, 8 May 2025</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow">
              <Bell size={20} className="text-navy-primary" />
            </button>
            <Link to="/profile" className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow">
              <User size={20} className="text-navy-primary" />
            </Link>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-primary rounded-lg">
                <Calendar size={24} className="text-white" />
              </div>
              <span className="text-green-500 text-sm font-semibold">+23%</span>
            </div>
            <h3 className="text-2xl font-bold text-navy-primary">54</h3>
            <p className="text-gray-600">Total Events Attended</p>
            <p className="text-xs text-gray-500">Update: 8 May 2025</p>
          </div>
          
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-primary rounded-lg">
                <Camera size={24} className="text-white" />
              </div>
              <span className="text-green-500 text-sm font-semibold">+20%</span>
            </div>
            <h3 className="text-2xl font-bold text-navy-primary">11,823</h3>
            <p className="text-gray-600">Total Photos Uploaded</p>
            <p className="text-xs text-gray-500">Update: 8 May 2025</p>
          </div>
          
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-primary rounded-lg">
                <TrendingUp size={24} className="text-white" />
              </div>
              <span className="text-green-500 text-sm font-semibold">+24%</span>
            </div>
            <h3 className="text-2xl font-bold text-navy-primary">420</h3>
            <p className="text-gray-600">Avg. Photos per Event</p>
            <p className="text-xs text-gray-500">Update: 8 May 2025</p>
          </div>
          
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-primary rounded-lg">
                <Users size={24} className="text-white" />
              </div>
              <span className="text-red-500 text-sm font-semibold">-8%</span>
            </div>
            <h3 className="text-2xl font-bold text-navy-primary">Wedding</h3>
            <p className="text-gray-600">Most Frequent Event</p>
            <p className="text-xs text-gray-500">Update: 8 May 2025</p>
          </div>
        </div>
        
        {/* Activity Overview */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-navy-primary">Upload Activity</h3>
              <button className="text-orange-primary hover:text-orange-600">
                <TrendingUp size={20} />
              </button>
            </div>
            <div className="mb-4">
              <div className="text-3xl font-bold text-navy-primary mb-2">98.4%</div>
              <div className="text-green-500 text-sm">+10% +2% from last month</div>
            </div>
            
            {/* Activity Heatmap */}
            <div className="grid grid-cols-7 gap-1 text-xs">
              <div className="text-center text-gray-500 py-1">Mon</div>
              <div className="text-center text-gray-500 py-1">Tue</div>
              <div className="text-center text-gray-500 py-1">Wed</div>
              <div className="text-center text-gray-500 py-1">Thu</div>
              <div className="text-center text-gray-500 py-1">Fri</div>
              <div className="text-center text-gray-500 py-1">Sat</div>
              <div className="text-center text-gray-500 py-1">Sun</div>
              
              {/* Heatmap Squares */}
              {Array.from({ length: 35 }, (_, i) => {
                const intensity = Math.floor(Math.random() * 4);
                const colors = ['bg-gray-100', 'bg-orange-200', 'bg-orange-400', 'bg-orange-primary'];
                return (
                  <div key={i} className={`aspect-square rounded ${colors[intensity]} hover:scale-110 transition-transform cursor-pointer`}></div>
                );
              })}
            </div>
          </div>
          
          {/* Upcoming Events */}
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-navy-primary">Upcoming Events (17)</h3>
              <select className="text-sm border rounded-lg px-3 py-1 text-gray-600">
                <option>All</option>
                <option>Wedding</option>
                <option>Birthday</option>
                <option>Corporate</option>
              </select>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-cream-light rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🎂</div>
                  <div>
                    <h4 className="font-semibold text-navy-primary">Birthday Party</h4>
                    <p className="text-sm text-gray-600">20 May, 2025 • 10:00 - 16:30</p>
                  </div>
                </div>
                <button className="bg-orange-primary text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors">
                  View
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-cream-light rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🎓</div>
                  <div>
                    <h4 className="font-semibold text-navy-primary">Graduation</h4>
                    <p className="text-sm text-gray-600">20 May, 2025 • 10:00 - 16:30</p>
                  </div>
                </div>
                <button className="bg-orange-primary text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors">
                  View
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-cream-light rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">💍</div>
                  <div>
                    <h4 className="font-semibold text-navy-primary">Wedding Ceremony</h4>
                    <p className="text-sm text-gray-600">20 May, 2025 • 10:00 - 16:30</p>
                  </div>
                </div>
                <button className="bg-orange-primary text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors">
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError('');
      
      // Simulate login delay
      setTimeout(() => {
        const success = login(email, password);
        setIsLoading(false);
        
        if (success) {
          // Redirect to dashboard after successful login
          window.location.href = '/dashboard';
        } else {
          setError('Invalid email or password. Try alex@reclick.com / password');
        }
      }, 1000);
    };

    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      return <Navigate to="/dashboard" replace />;
    }

    return (
      <div className="min-h-screen bg-cream-light flex">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
          <div className="max-w-md">
            <div className="mb-8">
              <img 
                src="https://customer-assets.emergentagent.com/job_bold-frames/artifacts/78npq2ar_photographer.png"
                alt="Photographer Illustration"
                className="w-full h-auto photographer-glow"
              />
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-navy-primary mb-4">
                Capture Every Moment
              </h2>
              <p className="text-lg text-gray-600">
                Your photography dashboard awaits. Manage events, upload photos, and help people find their memories.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-navy-primary mb-2">
                  Welcome Back, Photographer 👋
                </h1>
                <p className="text-gray-600">
                  Please sign in to continue
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-6">
                  <div className="flex items-center">
                    <AlertCircle size={20} className="mr-2" />
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-navy-primary mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={20} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-primary focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-primary mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={20} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-primary focus:border-transparent"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <div className="text-right mt-2">
                    <a href="#" className="text-sm text-orange-primary hover:text-orange-600">
                      Forgot Password?
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-orange-primary focus:ring-orange-primary border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-navy-primary">
                    Remember me
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-orange-primary text-white py-3 px-4 rounded-2xl font-semibold hover:bg-orange-600 transition-all hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full bg-white border-2 border-gray-300 text-navy-primary py-3 px-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all hover:shadow-md flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Google</span>
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <a href="#" className="text-orange-primary hover:text-orange-600 font-semibold">
                    Sign up
                  </a>
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-2xl">
                  <p className="text-xs text-gray-600">
                    <strong>Demo Login:</strong><br />
                    Email: alex@reclick.com<br />
                    Password: password
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // New Pages - Additional Features

  const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState(userProfile);

    const handleSave = () => {
      setUserProfile(editedProfile);
      setIsEditing(false);
    };

    return (
      <div className="min-h-screen bg-cream-light pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Profile Header */}
          <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <div className="w-32 h-32 bg-orange-primary rounded-full flex items-center justify-center photographer-glow">
                  <User size={48} className="text-white" />
                </div>
                <button className="absolute bottom-0 right-0 bg-orange-primary text-white p-2 rounded-full hover:bg-orange-600 transition-colors">
                  <Edit size={16} />
                </button>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                      className="text-3xl font-bold text-navy-primary bg-transparent border-b-2 border-orange-primary focus:outline-none"
                    />
                    <textarea
                      value={editedProfile.bio}
                      onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                      className="w-full text-gray-600 bg-gray-50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-primary"
                      rows="3"
                    />
                  </div>
                ) : (
                  <div>
                    <h1 className="text-3xl font-bold text-navy-primary mb-2">{userProfile.name}</h1>
                    <p className="text-gray-600 mb-4">{userProfile.bio}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Location size={16} />
                        <span>{userProfile.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe size={16} />
                        <span>{userProfile.website}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-orange-primary text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors flex items-center gap-2"
                    >
                      <Save size={16} />
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-orange-primary text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors flex items-center gap-2"
                  >
                    <Edit size={16} />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-orange-primary mb-2">{userProfile.stats.totalEvents}</div>
              <div className="text-gray-600">Total Events</div>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-orange-primary mb-2">{userProfile.stats.totalPhotos.toLocaleString()}</div>
              <div className="text-gray-600">Photos Taken</div>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-orange-primary mb-2">{userProfile.stats.totalClients}</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-orange-primary mb-2">{userProfile.stats.avgRating}</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-navy-primary mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-orange-primary" />
                  <div>
                    <div className="font-semibold text-navy-primary">Email</div>
                    <div className="text-gray-600">{userProfile.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-orange-primary" />
                  <div>
                    <div className="font-semibold text-navy-primary">Phone</div>
                    <div className="text-gray-600">{userProfile.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Location size={20} className="text-orange-primary" />
                  <div>
                    <div className="font-semibold text-navy-primary">Location</div>
                    <div className="text-gray-600">{userProfile.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={20} className="text-orange-primary" />
                  <div>
                    <div className="font-semibold text-navy-primary">Website</div>
                    <div className="text-gray-600">{userProfile.website}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-navy-primary mb-6">Social Media</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Instagram size={20} className="text-orange-primary" />
                  <div>
                    <div className="font-semibold text-navy-primary">Instagram</div>
                    <div className="text-gray-600">{userProfile.social.instagram}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Facebook size={20} className="text-orange-primary" />
                  <div>
                    <div className="font-semibold text-navy-primary">Facebook</div>
                    <div className="text-gray-600">{userProfile.social.facebook}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Twitter size={20} className="text-orange-primary" />
                  <div>
                    <div className="font-semibold text-navy-primary">Twitter</div>
                    <div className="text-gray-600">{userProfile.social.twitter}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin size={20} className="text-orange-primary" />
                  <div>
                    <div className="font-semibold text-navy-primary">LinkedIn</div>
                    <div className="text-gray-600">{userProfile.social.linkedin}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const EventsPage = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newEvent, setNewEvent] = useState({
      title: '',
      date: '',
      type: 'Wedding',
      location: '',
      client: '',
      description: ''
    });

    const filteredEvents = events.filter(event => {
      const matchesFilter = selectedFilter === 'all' || event.type.toLowerCase() === selectedFilter;
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.client.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });

    const handleCreateEvent = () => {
      const event = {
        ...newEvent,
        id: events.length + 1,
        status: 'upcoming',
        photos: 0
      };
      setEvents([...events, event]);
      setShowCreateForm(false);
      setNewEvent({
        title: '',
        date: '',
        type: 'Wedding',
        location: '',
        client: '',
        description: ''
      });
    };

    return (
      <div className="min-h-screen bg-cream-light pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-navy-primary mb-2">Events Management</h1>
              <p className="text-gray-600">Organize and manage your photography events</p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-orange-primary text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Create Event
            </button>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-3xl p-6 shadow-lg mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-primary"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-primary"
                >
                  <option value="all">All Types</option>
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday</option>
                  <option value="corporate">Corporate</option>
                  <option value="graduation">Graduation</option>
                </select>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <div key={event.id} className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-primary rounded-full flex items-center justify-center">
                      <Calendar size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-primary">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.type}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    event.status === 'upcoming' 
                      ? 'bg-orange-100 text-orange-600' 
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {event.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Location size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{event.client}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{event.photos} photos</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-orange-primary text-white py-2 rounded-full hover:bg-orange-600 transition-colors">
                    View Details
                  </button>
                  <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <Edit size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Create Event Modal */}
          {showCreateForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold text-navy-primary mb-6">Create New Event</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-primary mb-2">Event Title</label>
                    <input
                      type="text"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-primary"
                      placeholder="Enter event title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-navy-primary mb-2">Date</label>
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-primary"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-navy-primary mb-2">Event Type</label>
                    <select
                      value={newEvent.type}
                      onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-primary"
                    >
                      <option value="Wedding">Wedding</option>
                      <option value="Birthday">Birthday</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Graduation">Graduation</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-navy-primary mb-2">Location</label>
                    <input
                      type="text"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-primary"
                      placeholder="Enter location"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-navy-primary mb-2">Client</label>
                    <input
                      type="text"
                      value={newEvent.client}
                      onChange={(e) => setNewEvent({...newEvent, client: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-primary"
                      placeholder="Enter client name"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleCreateEvent}
                    className="flex-1 bg-orange-primary text-white py-3 rounded-full hover:bg-orange-600 transition-colors"
                  >
                    Create Event
                  </button>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const GalleryPage = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [showUploadModal, setShowUploadModal] = useState(false);

    const filteredPhotos = photos.filter(photo => {
      const matchesSearch = photo.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           photo.event.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = selectedFilter === 'all' || photo.tags.includes(selectedFilter);
      return matchesSearch && matchesFilter;
    });

    const sortedPhotos = [...filteredPhotos].sort((a, b) => {
      switch(sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'name':
          return a.filename.localeCompare(b.filename);
        case 'size':
          return parseFloat(b.size) - parseFloat(a.size);
        case 'views':
          return b.views - a.views;
        default:
          return 0;
      }
    });

    return (
      <div className="min-h-screen bg-cream-light pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-navy-primary mb-2">Photo Gallery</h1>
              <p className="text-gray-600">Manage and organize your photography collection</p>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-orange-primary text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors flex items-center gap-2"
            >
              <Upload size={20} />
              Upload Photos
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-3xl p-6 shadow-lg mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search photos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-primary"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-primary"
                >
                  <option value="all">All Photos</option>
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday</option>
                  <option value="corporate">Corporate</option>
                  <option value="graduation">Graduation</option>
                </select>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-primary"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="size">Sort by Size</option>
                <option value="views">Sort by Views</option>
              </select>
              
              <div className="flex bg-gray-100 rounded-2xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-xl transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-orange-primary text-white' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-xl transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-orange-primary text-white' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Photo Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedPhotos.map(photo => (
                <div key={photo.id} className="bg-white rounded-3xl p-4 shadow-lg hover:shadow-xl transition-shadow group">
                  <div className="aspect-square bg-gray-100 rounded-2xl mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex gap-2">
                        <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                          <Heart size={16} className="text-gray-600" />
                        </button>
                        <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                          <Share2 size={16} className="text-gray-600" />
                        </button>
                        <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                          <MoreHorizontal size={16} className="text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-orange-primary text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors">
                        View Full
                      </button>
                    </div>
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon size={48} className="text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-navy-primary truncate">{photo.filename}</h3>
                    <p className="text-sm text-gray-600">{photo.event}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{photo.size}</span>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Eye size={14} />
                          <span>{photo.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart size={14} />
                          <span>{photo.likes}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {photo.tags.map(tag => (
                        <span key={tag} className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-600 mb-4">
                  <div className="col-span-4">Filename</div>
                  <div className="col-span-2">Event</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-1">Size</div>
                  <div className="col-span-1">Views</div>
                  <div className="col-span-1">Likes</div>
                  <div className="col-span-1">Actions</div>
                </div>
                
                {sortedPhotos.map(photo => (
                  <div key={photo.id} className="grid grid-cols-12 gap-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <ImageIcon size={20} className="text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium text-navy-primary">{photo.filename}</div>
                        <div className="text-sm text-gray-500">{photo.tags.join(', ')}</div>
                      </div>
                    </div>
                    <div className="col-span-2 flex items-center text-gray-600">{photo.event}</div>
                    <div className="col-span-2 flex items-center text-gray-600">{photo.date}</div>
                    <div className="col-span-1 flex items-center text-gray-600">{photo.size}</div>
                    <div className="col-span-1 flex items-center text-gray-600">{photo.views}</div>
                    <div className="col-span-1 flex items-center text-gray-600">{photo.likes}</div>
                    <div className="col-span-1 flex items-center">
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <MoreHorizontal size={16} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Modal */}
          {showUploadModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold text-navy-primary mb-6">Upload Photos</h2>
                
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center mb-6">
                  <Upload size={48} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Drag and drop your photos here</p>
                  <p className="text-sm text-gray-500">or click to browse</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-primary mb-2">Event</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-primary">
                      <option>Select Event</option>
                      {events.map(event => (
                        <option key={event.id} value={event.id}>{event.title}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-navy-primary mb-2">Tags</label>
                    <input
                      type="text"
                      placeholder="Add tags (comma separated)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-primary"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 bg-orange-primary text-white py-3 rounded-full hover:bg-orange-600 transition-colors"
                  >
                    Upload
                  </button>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [settings, setSettings] = useState({
      notifications: {
        email: true,
        push: false,
        sms: false
      },
      privacy: {
        profileVisibility: 'public',
        showEmail: false,
        showPhone: false
      },
      appearance: {
        theme: 'light',
        language: 'en',
        timezone: 'UTC-8'
      }
    });

    const tabs = [
      { id: 'general', label: 'General', icon: Settings },
      { id: 'notifications', label: 'Notifications', icon: Bell },
      { id: 'privacy', label: 'Privacy', icon: Security },
      { id: 'appearance', label: 'Appearance', icon: Palette },
      { id: 'billing', label: 'Billing', icon: CreditCard }
    ];

    return (
      <div className="min-h-screen bg-cream-light pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64">
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-navy-primary mb-6">Settings</h2>
                <nav className="space-y-2">
                  {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                          activeTab === tab.id
                            ? 'bg-orange-primary text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon size={20} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                {activeTab === 'general' && (
                  <div>
                    <h3 className="text-2xl font-bold text-navy-primary mb-6">General Settings</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-navy-primary mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={userProfile.name}
                          className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-primary"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-navy-primary mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={userProfile.email}
                          className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-primary"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-navy-primary mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={userProfile.phone}
                          className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-primary"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-navy-primary mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          value={userProfile.location}
                          className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-primary"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-navy-primary mb-2">
                          Bio
                        </label>
                        <textarea
                          value={userProfile.bio}
                          rows="4"
                          className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-primary"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div>
                    <h3 className="text-2xl font-bold text-navy-primary mb-6">Notification Settings</h3>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-navy-primary">Email Notifications</h4>
                          <p className="text-sm text-gray-600">Receive notifications via email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.notifications.email}
                            onChange={(e) => setSettings({
                              ...settings,
                              notifications: {
                                ...settings.notifications,
                                email: e.target.checked
                              }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-navy-primary">Push Notifications</h4>
                          <p className="text-sm text-gray-600">Receive push notifications</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.notifications.push}
                            onChange={(e) => setSettings({
                              ...settings,
                              notifications: {
                                ...settings.notifications,
                                push: e.target.checked
                              }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-navy-primary">SMS Notifications</h4>
                          <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.notifications.sms}
                            onChange={(e) => setSettings({
                              ...settings,
                              notifications: {
                                ...settings.notifications,
                                sms: e.target.checked
                              }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'privacy' && (
                  <div>
                    <h3 className="text-2xl font-bold text-navy-primary mb-6">Privacy Settings</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-navy-primary mb-2">
                          Profile Visibility
                        </label>
                        <select
                          value={settings.privacy.profileVisibility}
                          onChange={(e) => setSettings({
                            ...settings,
                            privacy: {
                              ...settings.privacy,
                              profileVisibility: e.target.value
                            }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-primary"
                        >
                          <option value="public">Public</option>
                          <option value="private">Private</option>
                          <option value="friends">Friends Only</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-navy-primary">Show Email</h4>
                          <p className="text-sm text-gray-600">Display email on public profile</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.privacy.showEmail}
                            onChange={(e) => setSettings({
                              ...settings,
                              privacy: {
                                ...settings.privacy,
                                showEmail: e.target.checked
                              }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-navy-primary">Show Phone</h4>
                          <p className="text-sm text-gray-600">Display phone number on public profile</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.privacy.showPhone}
                            onChange={(e) => setSettings({
                              ...settings,
                              privacy: {
                                ...settings.privacy,
                                showPhone: e.target.checked
                              }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'appearance' && (
                  <div>
                    <h3 className="text-2xl font-bold text-navy-primary mb-6">Appearance Settings</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-navy-primary mb-2">
                          Theme
                        </label>
                        <select
                          value={settings.appearance.theme}
                          onChange={(e) => setSettings({
                            ...settings,
                            appearance: {
                              ...settings.appearance,
                              theme: e.target.value
                            }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-primary"
                        >
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                          <option value="auto">Auto</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-navy-primary mb-2">
                          Language
                        </label>
                        <select
                          value={settings.appearance.language}
                          onChange={(e) => setSettings({
                            ...settings,
                            appearance: {
                              ...settings.appearance,
                              language: e.target.value
                            }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-primary"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-navy-primary mb-2">
                          Timezone
                        </label>
                        <select
                          value={settings.appearance.timezone}
                          onChange={(e) => setSettings({
                            ...settings,
                            appearance: {
                              ...settings.appearance,
                              timezone: e.target.value
                            }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-primary"
                        >
                          <option value="UTC-8">Pacific Time (UTC-8)</option>
                          <option value="UTC-5">Eastern Time (UTC-5)</option>
                          <option value="UTC+0">UTC</option>
                          <option value="UTC+1">Central European Time (UTC+1)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'billing' && (
                  <div>
                    <h3 className="text-2xl font-bold text-navy-primary mb-6">Billing Settings</h3>
                    
                    <div className="space-y-6">
                      <div className="bg-cream-light rounded-2xl p-6">
                        <h4 className="font-semibold text-navy-primary mb-2">Current Plan</h4>
                        <p className="text-gray-600 mb-4">Professional Plan - $29/month</p>
                        <button className="bg-orange-primary text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">
                          Change Plan
                        </button>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-navy-primary mb-4">Payment Method</h4>
                        <div className="bg-cream-light rounded-2xl p-6">
                          <div className="flex items-center gap-3">
                            <CreditCard size={24} className="text-orange-primary" />
                            <div>
                              <p className="font-medium text-navy-primary">•••• •••• •••• 4242</p>
                              <p className="text-sm text-gray-600">Expires 12/25</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-navy-primary mb-4">Billing History</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between py-3 border-b border-gray-200">
                            <div>
                              <p className="font-medium text-navy-primary">Professional Plan</p>
                              <p className="text-sm text-gray-600">May 1, 2025</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-navy-primary">$29.00</p>
                              <p className="text-sm text-green-600">Paid</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between py-3 border-b border-gray-200">
                            <div>
                              <p className="font-medium text-navy-primary">Professional Plan</p>
                              <p className="text-sm text-gray-600">April 1, 2025</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-navy-primary">$29.00</p>
                              <p className="text-sm text-green-600">Paid</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                  <button className="bg-orange-primary text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-colors flex items-center gap-2">
                    <Save size={20} />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-cream-light">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signin" element={<SignInPage />} />
          
          {/* Protected Routes - Only accessible after login */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/events" element={<ProtectedRoute><EventsPage /></ProtectedRoute>} />
          <Route path="/gallery" element={<ProtectedRoute><GalleryPage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;