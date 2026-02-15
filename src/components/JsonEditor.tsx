import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

interface JsonEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({ value, onChange }) => {
    return (
        <div className="json-editor-container" style={{ height: '100%', fontSize: '14px' }}>
            <CodeMirror
                value={value}
                height="100%"
                extensions={[json()]}
                onChange={(val) => onChange(val)}
                theme="dark" // Default dark theme or verify if it needs explicit import
                basicSetup={{
                    lineNumbers: true,
                    foldGutter: true,
                    highlightActiveLine: true,
                }}
                // Minimal styling to fit our theme
                style={{ height: '100%' }}
            />
        </div>
    );
};
