import React from 'react'
import styles from './styles/PaletteFooterStyles'
import {withStyles} from '@material-ui/styles'
import Chip from '@material-ui/core/Chip';
import { calculatePaletteAccessibility } from './helpers/accessibilityHelpers';

function PaletteFooter(props) {
    const {paletteName, emoji, colors, classes} = props;
    
    // Calculate accessibility score if colors are provided
    let accessibilityScore = null;
    if (colors && colors.length > 0) {
        const accessibility = calculatePaletteAccessibility(colors);
        accessibilityScore = accessibility.score;
    }
    
    const getScoreColor = (score) => {
        if (score >= 80) return '#4caf50';
        if (score >= 60) return '#ff9800';
        if (score >= 40) return '#ff5722';
        return '#f44336';
    };
    
    return (
        <footer className={classes.PaletteFooter}>
            <div className={classes.leftSection}>
                {paletteName}
                <span className={classes.emoji}>{emoji}</span>
            </div>
            {accessibilityScore !== null && (
                <Chip 
                    label={`Accessibility: ${accessibilityScore}%`}
                    className={classes.accessibilityChip}
                    style={{ 
                        backgroundColor: getScoreColor(accessibilityScore) + '20',
                        color: getScoreColor(accessibilityScore),
                        border: `1px solid ${getScoreColor(accessibilityScore)}`,
                        fontWeight: '500'
                    }}
                />
            )}
        </footer>
    )
}

export default withStyles(styles)(PaletteFooter)
