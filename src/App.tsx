import { useState } from 'react';
import { JsonEditor } from './components/JsonEditor';
import { JsonViewer } from './components/JsonViewer';
import { Github, Play, AlertCircle, Trash2 } from 'lucide-react';

function App() {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [parsedJson, setParsedJson] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (value: string) => {
    setJsonInput(value);

    if (!value.trim()) {
      setParsedJson(null);
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(value);
      setParsedJson(parsed);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Invalid JSON');
      }
      // Keep previous parsedJson? No, if invalid, maybe clear it or keep stale?
      // Clearing is safer to avoid mismatch.
      // But maybe user wants to see last valid?
      // I'll clear it implicitly if strictly invalid? 
      // Actually, let's keep it null if invalid or just don't update if I wanted.
      // But layout shows "Invalid JSON" if parsedJson is null.
      // So I must set it to null.
      setParsedJson(null);
    }
  };

  const handleFormat = () => {
    if (parsedJson) {
      // Update input with formatted JSON
      const formatted = JSON.stringify(parsedJson, null, 2);
      setJsonInput(formatted);
    }
  };

  const handleClear = () => {
    setJsonInput('');
    setParsedJson(null);
    setError(null);
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>
          <span>{'{ }'}</span> JSON Farm
        </h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a
            href="#" // Add GitHub repo link later
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn"
            title="View Source on GitHub"
          >
            <Github size={20} />
          </a>
        </div>
      </header>

      <main className="main-content">
        <div className="panel input-panel">
          <div className="panel-header">
            <span>INPUT (JSON)</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className="icon-btn"
                onClick={handleClear}
                title="Clear"
              >
                <Trash2 size={16} />
              </button>
              <button
                className="btn-primary"
                onClick={handleFormat}
                disabled={!parsedJson}
                style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Play size={14} /> Format
              </button>
            </div>
          </div>
          {error && (
            <div className="error-banner">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
          <div className="panel-body">
            <JsonEditor
              value={jsonInput}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="panel output-panel">
          <div className="panel-header">
            <span>OUTPUT (Tree View)</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {/* Copy button can be inside viewer or here */}
            </div>
          </div>
          <div className="panel-body">
            {parsedJson ? (
              <JsonViewer data={parsedJson} />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>
                {error ? 'Invalid JSON' : 'Waiting for input...'}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
