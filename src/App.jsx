import React, { useState, useEffect } from 'react';
import DataGrid from './components/DataGrid';
import Footer from './components/Footer';
import Settings from './components/Settings';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/App.css';

const App = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const defaultSettings = {
    preferredSearchEngine: 'Google',
    otherSetting: 'DefaultValue',
  };

  const [settings, setSettings] = useState({
    preferredSearchEngine: localStorage.getItem('preferredSearchEngine') || defaultSettings.preferredSearchEngine,
    otherSetting: localStorage.getItem('otherSetting') || defaultSettings.otherSetting,
  });


  useEffect(() => {
    localStorage.setItem('preferredSearchEngine', settings.preferredSearchEngine);
    localStorage.setItem('otherSetting', settings.otherSetting);
  }, [settings]);


  const updateSetting = (key, value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };


  const resetToDefaults = () => {
    setSettings(defaultSettings);
    localStorage.setItem('preferredSearchEngine', defaultSettings.preferredSearchEngine);
    localStorage.setItem('otherSetting', defaultSettings.otherSetting);
  };

  return (
    <div className='app-main-body'>
      {/* Settings Button */}
      <h1 style={{textAlign: "center", margin: 0}}>CareerNest</h1>
      <h4 style={{textAlign: "center", margin: 0}}>Where your career takes wing.</h4>
      <button 
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        className='settings-button'
        aria-label="Settings"
      >
        <i className="fas fa-cog"></i>
      </button>
      
      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="settings-modal">
          <Settings 
            settings={settings} 
            updateSetting={updateSetting} 
            resetToDefaults={resetToDefaults} // Pass reset function
            onClose={() => setIsSettingsOpen(false)}
          />
        </div>
      )}

      <DataGrid preferredSearchEngine={settings.preferredSearchEngine} />
      <Footer />
    </div>
  );
};

export default App;
