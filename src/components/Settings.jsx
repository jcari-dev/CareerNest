import React from 'react';

const Settings = ({ settings, updateSetting, resetToDefaults, onClose }) => {
  return (
    <div>
      <h2>Settings</h2>
      <label>
        Preferred Search Engine:
        <select
          value={settings.preferredSearchEngine}
          onChange={(e) => updateSetting('preferredSearchEngine', e.target.value)}
        >
          <option value="Google">Google</option>
          <option value="Bing">Bing</option>
          <option value="Yahoo">Yahoo</option>
          <option value="DuckDuckGo">DuckDuckGo</option>
        </select>
      </label>

      <label>
        Other Setting:
        <input
          type="text"
          value={settings.otherSetting}
          onChange={(e) => updateSetting('otherSetting', e.target.value)}
        />
      </label>

      <div style={{ marginTop: "20px" }}>
        <button onClick={resetToDefaults}>Default Settings</button>
        <button onClick={onClose} style={{ marginLeft: "10px" }}>Save & Exit</button>
      </div>
    </div>
  );
};

export default Settings;
