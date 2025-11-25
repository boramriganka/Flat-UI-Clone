import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import chroma from 'chroma-js';

const styles = {
  // Style 1: Grid Layout
  gridLayout: {
    backgroundColor: '#ffffff',
    padding: '3rem',
    fontFamily: "'Roboto', sans-serif",
    minWidth: '800px',
    boxSizing: 'border-box',
  },
  gridTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1.5rem',
  },
  gridItem: {
    textAlign: 'center',
  },
  gridSwatch: {
    width: '100%',
    height: '120px',
    borderRadius: '8px',
    marginBottom: '0.75rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  gridName: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#333',
    marginBottom: '0.25rem',
  },
  gridCode: {
    fontSize: '0.85rem',
    color: '#666',
    fontFamily: 'monospace',
  },
  
  // Style 2: Card Layout
  cardLayout: {
    backgroundColor: '#f5f5f5',
    padding: '3rem',
    fontFamily: "'Roboto', sans-serif",
    minWidth: '900px',
    boxSizing: 'border-box',
  },
  cardTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#222',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '2.5rem',
    textAlign: 'center',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  cardSwatch: {
    width: '100%',
    height: '140px',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  cardName: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#222',
    marginBottom: '0.5rem',
  },
  cardCode: {
    fontSize: '0.95rem',
    color: '#666',
    fontFamily: 'monospace',
    backgroundColor: '#f5f5f5',
    padding: '0.5rem',
    borderRadius: '4px',
  },
  
  // Style 3: Horizontal Strip
  stripLayout: {
    backgroundColor: '#ffffff',
    padding: '3rem',
    fontFamily: "'Roboto', sans-serif",
    minWidth: '1000px',
    boxSizing: 'border-box',
  },
  stripTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  stripContainer: {
    display: 'flex',
    gap: '0',
    marginBottom: '2rem',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
  },
  stripSwatch: {
    flex: 1,
    height: '200px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: '1rem',
  },
  stripLabel: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    textAlign: 'center',
  },
  stripName: {
    fontSize: '0.9rem',
    fontWeight: '600',
    marginBottom: '0.25rem',
  },
  stripCode: {
    fontSize: '0.8rem',
    fontFamily: 'monospace',
  },
  
  // Style 4: Detailed List
  listLayout: {
    backgroundColor: '#ffffff',
    padding: '3rem',
    fontFamily: "'Roboto', sans-serif",
    minWidth: '800px',
    boxSizing: 'border-box',
  },
  listTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#222',
    marginBottom: '0.5rem',
  },
  listSubtitle: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '2.5rem',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '1.5rem',
    marginBottom: '1rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  listSwatch: {
    width: '80px',
    height: '80px',
    borderRadius: '8px',
    marginRight: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  listInfo: {
    flex: 1,
  },
  listName: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#222',
    marginBottom: '0.5rem',
  },
  listDetails: {
    display: 'flex',
    gap: '2rem',
    fontSize: '0.9rem',
    color: '#666',
  },
  listDetail: {
    fontFamily: 'monospace',
  },
};

function ImageExportPreview({ classes, palette, style = 'grid' }) {
  const colors = palette.colors || [];
  
  const getRGB = (hexColor) => {
    try {
      const rgb = chroma(hexColor).rgb();
      return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    } catch {
      return hexColor;
    }
  };
  
  // Grid Layout
  if (style === 'grid') {
    return (
      <div className={classes.gridLayout}>
        <div className={classes.gridTitle}>{palette.paletteName}</div>
        <div className={classes.gridContainer}>
          {colors.map((color, index) => (
            <div key={index} className={classes.gridItem}>
              <div
                className={classes.gridSwatch}
                style={{ backgroundColor: color.color }}
              />
              <div className={classes.gridName}>{color.name}</div>
              <div className={classes.gridCode}>{color.color}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Card Layout
  if (style === 'card') {
    return (
      <div className={classes.cardLayout}>
        <div className={classes.cardTitle}>{palette.paletteName}</div>
        <div className={classes.cardSubtitle}>
          {colors.length} colors • {palette.emoji}
        </div>
        <div className={classes.cardContainer}>
          {colors.map((color, index) => (
            <div key={index} className={classes.card}>
              <div
                className={classes.cardSwatch}
                style={{ backgroundColor: color.color }}
              />
              <div className={classes.cardName}>{color.name}</div>
              <div className={classes.cardCode}>{color.color}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Horizontal Strip
  if (style === 'strip') {
    return (
      <div className={classes.stripLayout}>
        <div className={classes.stripTitle}>{palette.paletteName} {palette.emoji}</div>
        <div className={classes.stripContainer}>
          {colors.map((color, index) => (
            <div
              key={index}
              className={classes.stripSwatch}
              style={{ backgroundColor: color.color }}
            >
              <div className={classes.stripLabel}>
                <div
                  className={classes.stripName}
                  style={{ color: '#333' }}
                >
                  {color.name}
                </div>
                <div
                  className={classes.stripCode}
                  style={{ color: '#666' }}
                >
                  {color.color}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Detailed List
  if (style === 'list') {
    return (
      <div className={classes.listLayout}>
        <div className={classes.listTitle}>{palette.paletteName} {palette.emoji}</div>
        <div className={classes.listSubtitle}>
          Color Palette • {colors.length} colors
        </div>
        {colors.map((color, index) => (
          <div key={index} className={classes.listItem}>
            <div
              className={classes.listSwatch}
              style={{ backgroundColor: color.color }}
            />
            <div className={classes.listInfo}>
              <div className={classes.listName}>{color.name}</div>
              <div className={classes.listDetails}>
                <div className={classes.listDetail}>HEX: {color.color}</div>
                <div className={classes.listDetail}>RGB: {getRGB(color.color)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  return null;
}

export default withStyles(styles)(ImageExportPreview);

