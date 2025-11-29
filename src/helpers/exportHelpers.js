import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

/**
 * Get flat array of colors from palette
 * @param {object} palette - Palette object
 * @returns {array} Flat array of colors
 */
function getFlatColors(palette) {
  if (!palette || !palette.colors) return [];
  
  // If colors is already an array (seed palette)
  if (Array.isArray(palette.colors)) {
    return palette.colors;
  }
  
  // If colors is an object with levels (generated palette)
  const flatColors = [];
  const levels = Object.keys(palette.colors).sort((a, b) => Number(a) - Number(b));
  
  levels.forEach(level => {
    if (Array.isArray(palette.colors[level])) {
      palette.colors[level].forEach(color => {
        flatColors.push({
          name: color.name,
          color: color.hex || color.color,
        });
      });
    }
  });
  
  return flatColors;
}

/**
 * Export palette as CSS custom properties
 * @param {object} palette - Palette object with colors array
 * @returns {string} CSS code
 */
export function exportAsCSS(palette) {
  const { paletteName } = palette;
  const colors = getFlatColors(palette);
  
  let css = `/* ${paletteName} Color Palette */\n:root {\n`;
  
  colors.forEach(color => {
    const safeName = color.name.toLowerCase().replace(/\s+/g, '-');
    css += `  --${safeName}: ${color.color};\n`;
  });
  
  css += `}\n`;
  return css;
}

/**
 * Export palette as SCSS variables
 * @param {object} palette - Palette object
 * @returns {string} SCSS code
 */
export function exportAsSCSS(palette) {
  const { paletteName } = palette;
  const colors = getFlatColors(palette);
  
  let scss = `// ${paletteName} Color Palette\n\n`;
  
  // Individual variables
  colors.forEach(color => {
    const safeName = color.name.toLowerCase().replace(/\s+/g, '-');
    scss += `$${safeName}: ${color.color};\n`;
  });
  
  scss += `\n// Color map\n`;
  scss += `$palette-colors: (\n`;
  colors.forEach((color, index) => {
    const safeName = color.name.toLowerCase().replace(/\s+/g, '-');
    scss += `  '${safeName}': ${color.color}`;
    if (index < colors.length - 1) scss += ',';
    scss += '\n';
  });
  scss += `);\n`;
  
  return scss;
}

/**
 * Export palette as JSON
 * @param {object} palette - Palette object
 * @returns {string} JSON string
 */
export function exportAsJSON(palette) {
  const colors = getFlatColors(palette);
  const exportData = {
    name: palette.paletteName,
    emoji: palette.emoji,
    colors: colors.map(c => ({
      name: c.name,
      hex: c.color,
    })),
  };
  return JSON.stringify(exportData, null, 2);
}

/**
 * Export palette as Tailwind config
 * @param {object} palette - Palette object
 * @returns {string} Tailwind config code
 */
export function exportAsTailwind(palette) {
  const { paletteName } = palette;
  const colors = getFlatColors(palette);
  const safeName = paletteName.toLowerCase().replace(/\s+/g, '-');
  
  let config = `// ${paletteName} - Tailwind CSS Configuration\n\n`;
  config += `module.exports = {\n`;
  config += `  theme: {\n`;
  config += `    extend: {\n`;
  config += `      colors: {\n`;
  config += `        '${safeName}': {\n`;
  
  colors.forEach((color, index) => {
    const colorName = color.name.toLowerCase().replace(/\s+/g, '-');
    config += `          '${colorName}': '${color.color}'`;
    if (index < colors.length - 1) config += ',';
    config += '\n';
  });
  
  config += `        },\n`;
  config += `      },\n`;
  config += `    },\n`;
  config += `  },\n`;
  config += `}\n`;
  
  return config;
}

/**
 * Export palette as JavaScript object
 * @param {object} palette - Palette object
 * @returns {string} JavaScript code
 */
export function exportAsJavaScript(palette) {
  const { paletteName } = palette;
  const colors = getFlatColors(palette);
  const safeName = paletteName.replace(/\s+/g, '');
  
  let js = `// ${paletteName} Color Palette\n\n`;
  js += `export const ${safeName}Palette = {\n`;
  
  colors.forEach((color, index) => {
    const colorName = color.name.replace(/\s+/g, '');
    js += `  ${colorName}: '${color.color}'`;
    if (index < colors.length - 1) js += ',';
    js += '\n';
  });
  
  js += `};\n\n`;
  
  // Also export as array
  js += `export const ${safeName}Colors = [\n`;
  colors.forEach((color, index) => {
    js += `  { name: '${color.name}', value: '${color.color}' }`;
    if (index < colors.length - 1) js += ',';
    js += '\n';
  });
  js += `];\n`;
  
  return js;
}

/**
 * Export palette as SVG
 * @param {object} palette - Palette object
 * @returns {string} SVG code
 */
export function exportAsSVG(palette) {
  const { paletteName } = palette;
  const colors = getFlatColors(palette);
  const swatchWidth = 100;
  const swatchHeight = 100;
  const cols = Math.ceil(Math.sqrt(colors.length));
  const rows = Math.ceil(colors.length / cols);
  const width = cols * swatchWidth;
  const height = rows * swatchHeight + 40; // Extra space for title
  
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n`;
  svg += `  <rect width="${width}" height="${height}" fill="#ffffff"/>\n`;
  svg += `  <text x="${width / 2}" y="25" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" fill="#333333">${paletteName}</text>\n`;
  
  colors.forEach((color, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const x = col * swatchWidth;
    const y = row * swatchHeight + 40;
    
    svg += `  <rect x="${x}" y="${y}" width="${swatchWidth}" height="${swatchHeight}" fill="${color.color}"/>\n`;
    svg += `  <text x="${x + swatchWidth / 2}" y="${y + swatchHeight / 2}" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="${getContrastColor(color.color)}">${color.name}</text>\n`;
    svg += `  <text x="${x + swatchWidth / 2}" y="${y + swatchHeight / 2 + 15}" font-family="monospace" font-size="9" text-anchor="middle" fill="${getContrastColor(color.color)}">${color.color}</text>\n`;
  });
  
  svg += `</svg>`;
  return svg;
}

/**
 * Helper function to get contrasting text color
 */
function getContrastColor(hexColor) {
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

/**
 * Export palette as PNG/JPEG image
 * @param {HTMLElement} element - DOM element to capture
 * @param {string} filename - Output filename
 * @param {string} format - 'png' or 'jpeg'
 * @returns {Promise} Promise that resolves when export is complete
 */
export async function exportAsImage(elementOrRef, filename, format = 'png', captureColorsOnly = true) {
  try {
    // Handle React refs
    const domElement = elementOrRef && elementOrRef.current ? elementOrRef.current : elementOrRef;
    
    if (!domElement) {
      throw new Error('Invalid element for image export');
    }
    
    // For palette view, find just the colors container if requested
    let targetElement = domElement;
    if (captureColorsOnly && domElement.querySelector) {
      // Look for the colors div (contains all ColorBox components)
      const colorsDiv = domElement.querySelector('[class*="colors"]');
      if (colorsDiv) {
        targetElement = colorsDiv;
      }
    }
    
    const canvas = await html2canvas(targetElement, {
      backgroundColor: format === 'png' ? null : '#ffffff',
      scale: 2, // Higher quality
      logging: false,
      useCORS: true,
      allowTaint: true,
    });
    
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `${filename}.${format}`);
          resolve();
        } else {
          reject(new Error('Failed to create image'));
        }
      }, `image/${format}`, format === 'jpeg' ? 0.95 : undefined);
    });
  } catch (error) {
    console.error('Error exporting image:', error);
    throw error;
  }
}

/**
 * Download file with given content
 * @param {string} content - File content
 * @param {string} filename - Filename with extension
 * @param {string} mimeType - MIME type
 */
export function downloadFile(content, filename, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  saveAs(blob, filename);
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Get all export formats with metadata
 * @returns {array} Array of export format objects
 */
export function getExportFormats() {
  return [
    {
      id: 'css',
      name: 'CSS Variables',
      extension: 'css',
      mimeType: 'text/css',
      description: 'CSS custom properties for use in stylesheets',
      icon: 'code',
    },
    {
      id: 'scss',
      name: 'SCSS Variables',
      extension: 'scss',
      mimeType: 'text/plain',
      description: 'SCSS variables and color maps',
      icon: 'code',
    },
    {
      id: 'json',
      name: 'JSON',
      extension: 'json',
      mimeType: 'application/json',
      description: 'Structured JSON data',
      icon: 'data_object',
    },
    {
      id: 'tailwind',
      name: 'Tailwind Config',
      extension: 'js',
      mimeType: 'text/javascript',
      description: 'Tailwind CSS configuration',
      icon: 'code',
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      extension: 'js',
      mimeType: 'text/javascript',
      description: 'ES6 module exports',
      icon: 'code',
    },
    {
      id: 'svg',
      name: 'SVG',
      extension: 'svg',
      mimeType: 'image/svg+xml',
      description: 'Scalable vector graphic',
      icon: 'image',
    },
    {
      id: 'png',
      name: 'PNG Image',
      extension: 'png',
      mimeType: 'image/png',
      description: 'High-quality raster image',
      icon: 'image',
    },
    {
      id: 'jpeg',
      name: 'JPEG Image',
      extension: 'jpeg',
      mimeType: 'image/jpeg',
      description: 'Compressed raster image',
      icon: 'image',
    },
  ];
}

/**
 * Export palette in specified format
 * @param {object} palette - Palette object
 * @param {string} format - Export format id
 * @param {HTMLElement} element - DOM element for image export
 * @returns {Promise<string>} Exported content or success message
 */
export async function exportPalette(palette, format, element = null) {
  const safeName = palette.paletteName.toLowerCase().replace(/\s+/g, '-');
  
  switch (format) {
    case 'css':
      const css = exportAsCSS(palette);
      downloadFile(css, `${safeName}.css`, 'text/css');
      return css;
      
    case 'scss':
      const scss = exportAsSCSS(palette);
      downloadFile(scss, `${safeName}.scss`, 'text/plain');
      return scss;
      
    case 'json':
      const json = exportAsJSON(palette);
      downloadFile(json, `${safeName}.json`, 'application/json');
      return json;
      
    case 'tailwind':
      const tailwind = exportAsTailwind(palette);
      downloadFile(tailwind, `${safeName}-tailwind.config.js`, 'text/javascript');
      return tailwind;
      
    case 'javascript':
      const js = exportAsJavaScript(palette);
      downloadFile(js, `${safeName}.js`, 'text/javascript');
      return js;
      
    case 'svg':
      const svg = exportAsSVG(palette);
      downloadFile(svg, `${safeName}.svg`, 'image/svg+xml');
      return svg;
      
    case 'png':
      if (!element) throw new Error('Element required for PNG export');
      await exportAsImage(element, safeName, 'png');
      return 'PNG exported successfully';
      
    case 'jpeg':
      if (!element) throw new Error('Element required for JPEG export');
      await exportAsImage(element, safeName, 'jpeg');
      return 'JPEG exported successfully';
      
    default:
      throw new Error(`Unknown export format: ${format}`);
  }
}


