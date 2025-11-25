import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ChromePicker } from 'react-color';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import {
  calculateContrastRatio,
  getWCAGRating,
  getComplianceDescription,
  suggestAccessibleColor,
} from './helpers/accessibilityHelpers';

const styles = {
  root: {
    padding: '2rem',
    backgroundColor: '#1a1a1a',
    color: '#e0e0e0',
    maxWidth: '900px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '2rem',
    textAlign: 'center',
  },
  pickerSection: {
    marginBottom: '2rem',
  },
  pickerLabel: {
    marginBottom: '1rem',
    color: '#e0e0e0',
    fontWeight: '500',
  },
  picker: {
    width: '100% !important',
    backgroundColor: '#2a2a2a !important',
    borderRadius: '8px !important',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2) !important',
  },
  previewSection: {
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  preview: {
    padding: '3rem',
    borderRadius: '8px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
  },
  previewText: {
    margin: '0.5rem 0',
    fontWeight: '500',
  },
  resultsSection: {
    marginTop: '2rem',
  },
  ratioDisplay: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#2a2a2a',
    borderRadius: '8px',
    marginBottom: '2rem',
  },
  ratioNumber: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#64B5F6',
    margin: '0.5rem 0',
  },
  ratioDescription: {
    color: '#aaa',
    fontSize: '1.1rem',
  },
  complianceGrid: {
    marginTop: '1.5rem',
  },
  complianceCard: {
    padding: '1.5rem',
    backgroundColor: '#2a2a2a',
    borderRadius: '8px',
    textAlign: 'center',
  },
  complianceTitle: {
    marginBottom: '1rem',
    color: '#e0e0e0',
    fontWeight: '500',
  },
  levelChip: {
    margin: '0.25rem',
    fontWeight: '500',
  },
  passChip: {
    backgroundColor: '#4caf50',
    color: 'white',
  },
  failChip: {
    backgroundColor: '#f44336',
    color: 'white',
  },
  suggestionSection: {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: '#2a2a2a',
    borderRadius: '8px',
  },
  suggestionTitle: {
    marginBottom: '1rem',
    color: '#64B5F6',
  },
  colorSwatch: {
    display: 'inline-block',
    width: '60px',
    height: '60px',
    borderRadius: '8px',
    marginRight: '1rem',
    verticalAlign: 'middle',
    border: '2px solid #444',
  },
};

class ContrastChecker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foreground: props.foreground || '#000000',
      background: props.background || '#ffffff',
    };
    this.handleForegroundChange = this.handleForegroundChange.bind(this);
    this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
  }

  handleForegroundChange(color) {
    this.setState({ foreground: color.hex });
  }

  handleBackgroundChange(color) {
    this.setState({ background: color.hex });
  }

  render() {
    const { classes } = this.props;
    const { foreground, background } = this.state;
    
    const ratio = calculateContrastRatio(foreground, background);
    const rating = getWCAGRating(ratio);
    const description = getComplianceDescription(ratio);
    const suggestedColor = suggestAccessibleColor(foreground, background, 4.5);

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography variant="h4" style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>
            Contrast Checker
          </Typography>
          <Typography variant="body1" style={{ color: '#aaa' }}>
            Test color combinations for WCAG accessibility compliance
          </Typography>
        </div>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <div className={classes.pickerSection}>
              <Typography variant="h6" className={classes.pickerLabel}>
                Foreground Color (Text)
              </Typography>
              <ChromePicker
                color={foreground}
                onChangeComplete={this.handleForegroundChange}
                className={classes.picker}
                disableAlpha={true}
              />
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className={classes.pickerSection}>
              <Typography variant="h6" className={classes.pickerLabel}>
                Background Color
              </Typography>
              <ChromePicker
                color={background}
                onChangeComplete={this.handleBackgroundChange}
                className={classes.picker}
                disableAlpha={true}
              />
            </div>
          </Grid>
        </Grid>

        <div className={classes.previewSection}>
          <Paper
            className={classes.preview}
            style={{ backgroundColor: background, color: foreground }}
          >
            <Typography variant="h5" className={classes.previewText}>
              The quick brown fox jumps over the lazy dog
            </Typography>
            <Typography variant="body1" className={classes.previewText}>
              Normal text preview - This is how your text will look
            </Typography>
            <Typography variant="h6" className={classes.previewText}>
              Large text preview - 18pt or 14pt bold
            </Typography>
          </Paper>
        </div>

        <div className={classes.resultsSection}>
          <div className={classes.ratioDisplay}>
            <Typography variant="h6" style={{ color: '#aaa' }}>
              Contrast Ratio
            </Typography>
            <div className={classes.ratioNumber}>{ratio.toFixed(2)}:1</div>
            <Typography className={classes.ratioDescription}>
              {description}
            </Typography>
          </div>

          <Grid container spacing={2} className={classes.complianceGrid}>
            <Grid item xs={12} md={4}>
              <Paper className={classes.complianceCard}>
                <Typography variant="h6" className={classes.complianceTitle}>
                  Normal Text
                </Typography>
                <Typography variant="body2" style={{ color: '#aaa', marginBottom: '1rem' }}>
                  {'< 18pt or < 14pt bold'}
                </Typography>
                <div>
                  <Chip
                    icon={rating.normalText.AA ? <CheckCircleIcon /> : <CancelIcon />}
                    label="AA"
                    className={`${classes.levelChip} ${
                      rating.normalText.AA ? classes.passChip : classes.failChip
                    }`}
                  />
                  <Chip
                    icon={rating.normalText.AAA ? <CheckCircleIcon /> : <CancelIcon />}
                    label="AAA"
                    className={`${classes.levelChip} ${
                      rating.normalText.AAA ? classes.passChip : classes.failChip
                    }`}
                  />
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper className={classes.complianceCard}>
                <Typography variant="h6" className={classes.complianceTitle}>
                  Large Text
                </Typography>
                <Typography variant="body2" style={{ color: '#aaa', marginBottom: '1rem' }}>
                  {'>= 18pt or >= 14pt bold'}
                </Typography>
                <div>
                  <Chip
                    icon={rating.largeText.AA ? <CheckCircleIcon /> : <CancelIcon />}
                    label="AA"
                    className={`${classes.levelChip} ${
                      rating.largeText.AA ? classes.passChip : classes.failChip
                    }`}
                  />
                  <Chip
                    icon={rating.largeText.AAA ? <CheckCircleIcon /> : <CancelIcon />}
                    label="AAA"
                    className={`${classes.levelChip} ${
                      rating.largeText.AAA ? classes.passChip : classes.failChip
                    }`}
                  />
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper className={classes.complianceCard}>
                <Typography variant="h6" className={classes.complianceTitle}>
                  UI Components
                </Typography>
                <Typography variant="body2" style={{ color: '#aaa', marginBottom: '1rem' }}>
                  Icons, borders, etc.
                </Typography>
                <div>
                  <Chip
                    icon={rating.uiComponents.AA ? <CheckCircleIcon /> : <CancelIcon />}
                    label="AA"
                    className={`${classes.levelChip} ${
                      rating.uiComponents.AA ? classes.passChip : classes.failChip
                    }`}
                  />
                </div>
              </Paper>
            </Grid>
          </Grid>

          {!rating.normalText.AA && (
            <Paper className={classes.suggestionSection}>
              <Typography variant="h6" className={classes.suggestionTitle}>
                Suggested Accessible Color
              </Typography>
              <Typography variant="body1" style={{ color: '#e0e0e0', marginBottom: '1rem' }}>
                Try this foreground color for better accessibility:
              </Typography>
              <div>
                <div
                  className={classes.colorSwatch}
                  style={{ backgroundColor: suggestedColor }}
                />
                <Typography
                  variant="h6"
                  style={{ display: 'inline-block', verticalAlign: 'middle', color: '#e0e0e0' }}
                >
                  {suggestedColor}
                </Typography>
              </div>
            </Paper>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ContrastChecker);


