import chroma from 'chroma-js';

/**
 * Flatten colors array from palette object
 * Handles both flat arrays (seed palettes) and nested objects (generated palettes)
 */
function flattenColors(colors) {
  if (!colors) return [];
  
  // If colors is already an array, return it
  if (Array.isArray(colors)) {
    return colors;
  }
  
  // If colors is an object with levels (generated palette)
  const flatColors = [];
  const levels = Object.keys(colors).sort((a, b) => Number(a) - Number(b));
  
  levels.forEach(level => {
    if (Array.isArray(colors[level])) {
      colors[level].forEach(colorObj => {
        flatColors.push({
          color: colorObj.hex || colorObj.color || colorObj,
          name: colorObj.name || `${colorObj.id || 'color'}-${level}`,
        });
      });
    }
  });
  
  return flatColors;
}

/**
 * Calculate relative luminance of a color according to WCAG 2.0
 * https://www.w3.org/TR/WCAG20-TECHS/G17.html
 */
export function getLuminance(color) {
  try {
    const rgb = chroma(color).rgb();
    const [r, g, b] = rgb.map(val => {
      const sRGB = val / 255;
      return sRGB <= 0.03928
        ? sRGB / 12.92
        : Math.pow((sRGB + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  } catch (e) {
    return 0;
  }
}

/**
 * Calculate contrast ratio between two colors according to WCAG 2.0
 * https://www.w3.org/TR/WCAG20-TECHS/G17.html
 * @param {string} color1 - First color (hex, rgb, etc.)
 * @param {string} color2 - Second color (hex, rgb, etc.)
 * @returns {number} Contrast ratio (1-21)
 */
export function calculateContrastRatio(color1, color2) {
  try {
    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
  } catch (e) {
    return 1;
  }
}

/**
 * Get WCAG compliance levels for a contrast ratio
 * @param {number} ratio - Contrast ratio
 * @returns {object} Compliance levels for different text sizes and UI components
 */
export function getWCAGRating(ratio) {
  return {
    // Normal text (< 18pt or < 14pt bold)
    normalText: {
      AA: ratio >= 4.5,
      AAA: ratio >= 7,
    },
    // Large text (>= 18pt or >= 14pt bold)
    largeText: {
      AA: ratio >= 3,
      AAA: ratio >= 4.5,
    },
    // UI components and graphical objects
    uiComponents: {
      AA: ratio >= 3,
    },
  };
}

/**
 * Get a human-readable description of WCAG compliance
 * @param {number} ratio - Contrast ratio
 * @returns {string} Description of compliance level
 */
export function getComplianceDescription(ratio) {
  const rating = getWCAGRating(ratio);
  
  if (rating.normalText.AAA) {
    return 'Excellent - AAA for all text';
  } else if (rating.normalText.AA) {
    return 'Good - AA for all text';
  } else if (rating.largeText.AAA) {
    return 'Good - AAA for large text only';
  } else if (rating.largeText.AA) {
    return 'Fair - AA for large text only';
  } else if (rating.uiComponents.AA) {
    return 'Minimal - UI components only';
  } else {
    return 'Fail - Does not meet WCAG standards';
  }
}

/**
 * Suggest an accessible color based on a base color and target contrast ratio
 * @param {string} baseColor - The base color to work with
 * @param {string} backgroundColor - The background color
 * @param {number} targetRatio - Target contrast ratio (default 4.5 for AA normal text)
 * @returns {string} Suggested color that meets the target ratio
 */
export function suggestAccessibleColor(baseColor, backgroundColor, targetRatio = 4.5) {
  try {
    const baseLum = getLuminance(backgroundColor);
    const baseChroma = chroma(baseColor);
    
    // Try adjusting lightness
    let adjustedColor = baseChroma;
    let ratio = calculateContrastRatio(adjustedColor.hex(), backgroundColor);
    
    // Determine if we need to go lighter or darker
    const shouldLighten = baseLum > 0.5;
    
    // Binary search for the right lightness
    let step = shouldLighten ? 0.1 : -0.1;
    let iterations = 0;
    const maxIterations = 20;
    
    while (Math.abs(ratio - targetRatio) > 0.1 && iterations < maxIterations) {
      const currentLightness = adjustedColor.get('hsl.l');
      const newLightness = Math.max(0, Math.min(1, currentLightness + step));
      
      adjustedColor = adjustedColor.set('hsl.l', newLightness);
      const newRatio = calculateContrastRatio(adjustedColor.hex(), backgroundColor);
      
      if (shouldLighten) {
        if (newRatio < ratio) step = -step / 2;
      } else {
        if (newRatio < ratio) step = -step / 2;
      }
      
      ratio = newRatio;
      iterations++;
    }
    
    return adjustedColor.hex();
  } catch (e) {
    return baseColor;
  }
}

/**
 * Check if a color is light or dark
 * @param {string} color - Color to check
 * @returns {boolean} True if light, false if dark
 */
export function isLightColor(color) {
  try {
    return getLuminance(color) > 0.5;
  } catch (e) {
    return false;
  }
}

/**
 * Get the best text color (black or white) for a background
 * @param {string} backgroundColor - Background color
 * @returns {string} '#000000' or '#ffffff'
 */
export function getBestTextColor(backgroundColor) {
  const whiteContrast = calculateContrastRatio('#ffffff', backgroundColor);
  const blackContrast = calculateContrastRatio('#000000', backgroundColor);
  return whiteContrast > blackContrast ? '#ffffff' : '#000000';
}

/**
 * Calculate accessibility score for an entire palette
 * @param {array} colors - Array of color objects with {name, color} properties
 * @returns {object} Accessibility score and details
 */
export function calculatePaletteAccessibility(colors) {
  const flatColors = flattenColors(colors);
  
  if (!flatColors || flatColors.length === 0) {
    return { score: 0, totalPairs: 0, accessiblePairs: 0, details: [] };
  }
  
  const pairs = [];
  let accessiblePairs = 0;
  
  // Check all color combinations
  for (let i = 0; i < flatColors.length; i++) {
    for (let j = i + 1; j < flatColors.length; j++) {
      const color1 = flatColors[i];
      const color2 = flatColors[j];
      const ratio = calculateContrastRatio(color1.color, color2.color);
      const rating = getWCAGRating(ratio);
      const isAccessible = rating.normalText.AA;
      
      if (isAccessible) accessiblePairs++;
      
      pairs.push({
        color1: color1.name,
        color2: color2.name,
        ratio: ratio.toFixed(2),
        isAccessible,
        rating,
      });
    }
  }
  
  const totalPairs = pairs.length;
  const score = totalPairs > 0 ? Math.round((accessiblePairs / totalPairs) * 100) : 0;
  
  return {
    score,
    totalPairs,
    accessiblePairs,
    details: pairs.sort((a, b) => b.ratio - a.ratio),
  };
}

/**
 * Get color palette statistics
 * @param {array} colors - Array of color objects
 * @returns {object} Statistics about the palette
 */
export function getPaletteStatistics(colors) {
  const flatColors = flattenColors(colors);
  
  if (!flatColors || flatColors.length === 0) {
    return null;
  }
  
  const stats = {
    totalColors: flatColors.length,
    lightColors: 0,
    darkColors: 0,
    averageLuminance: 0,
    colorTemperature: 'neutral',
  };
  
  let totalLuminance = 0;
  let warmColors = 0;
  let coolColors = 0;
  
  flatColors.forEach(({ color }) => {
    try {
      const lum = getLuminance(color);
      totalLuminance += lum;
      
      if (lum > 0.5) stats.lightColors++;
      else stats.darkColors++;
      
      // Determine color temperature based on hue
      const hue = chroma(color).get('hsl.h');
      if ((hue >= 0 && hue <= 60) || (hue >= 300 && hue <= 360)) {
        warmColors++;
      } else if (hue >= 180 && hue <= 300) {
        coolColors++;
      }
    } catch (e) {
      // Skip invalid colors
    }
  });
  
  stats.averageLuminance = totalLuminance / flatColors.length;
  
  if (warmColors > coolColors * 1.5) {
    stats.colorTemperature = 'warm';
  } else if (coolColors > warmColors * 1.5) {
    stats.colorTemperature = 'cool';
  }
  
  return stats;
}


