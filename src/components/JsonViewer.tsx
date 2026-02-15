import React from 'react';
import ReactJson from 'react-json-view';

interface JsonViewerProps {
    data: object;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({ data }) => {
    return (
        <div className="json-viewer-container" style={{ padding: '1rem', height: '100%' }}>
            <ReactJson
                src={data}
                theme="ocean" // Built-in theme
                iconStyle="triangle"
                enableClipboard={true}
                displayDataTypes={false}
                displayObjectSize={true}
                collapsed={2} // Collapse after 2 levels by default
                style={{ backgroundColor: 'transparent', fontSize: '14px', fontFamily: 'var(--font-mono)' }}
            />
        </div>
    );
};
