
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState({});

  const handleGenerateText = async () => {
    try {
      const response = await axios.post('/api/generate-text/', { prompt });
      setGeneratedText(response.data.generated_text);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
      setGeneratedText('');
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/api/user-profile/');
      setUserInfo(response.data);
    } catch (err) {
      setError('Failed to load user profile');
    }
  };

  React.useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>AI SaaS Platform</h1>
      <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
        <h3>User Information</h3>
        <p>Plan: {userInfo.subscription_plan || 'Loading...'}</p>
        <p>Generations Used: {userInfo.text_generations_used || 0}</p>
        <p>Max Generations: {userInfo.max_text_generations || 0}</p>
      </div>
      <textarea
        placeholder="Enter your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={5}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <button onClick={handleGenerateText} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Generate Text
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {generatedText && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h3>Generated Text:</h3>
          <p>{generatedText}</p>
        </div>
      )}
    </div>
  );
};

export default App;
