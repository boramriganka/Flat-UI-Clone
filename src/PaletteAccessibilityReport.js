import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { calculatePaletteAccessibility, getPaletteStatistics } from './helpers/accessibilityHelpers';

const styles = {
  root: {
    padding: '2rem',
    backgroundColor: '#1a1a1a',
    color: '#e0e0e0',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '2rem',
    textAlign: 'center',
  },
  scoreSection: {
    padding: '2rem',
    backgroundColor: '#2a2a2a',
    borderRadius: '8px',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  scoreCircle: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
    fontWeight: 'bold',
    margin: '1rem auto',
  },
  statsSection: {
    marginBottom: '2rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginTop: '1rem',
  },
  statCard: {
    padding: '1.5rem',
    backgroundColor: '#2a2a2a',
    borderRadius: '8px',
    textAlign: 'center',
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#64B5F6',
    marginBottom: '0.5rem',
  },
  statLabel: {
    color: '#aaa',
    fontSize: '0.9rem',
  },
  tableSection: {
    marginTop: '2rem',
  },
  tableContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: '8px',
  },
  tableHeader: {
    backgroundColor: '#333',
  },
  tableHeaderCell: {
    color: '#e0e0e0',
    fontWeight: 'bold',
  },
  tableCell: {
    color: '#e0e0e0',
    borderBottom: '1px solid #444',
  },
  colorCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  colorSwatch: {
    width: '30px',
    height: '30px',
    borderRadius: '4px',
    border: '1px solid #555',
  },
  passChip: {
    backgroundColor: '#4caf50',
    color: 'white',
  },
  failChip: {
    backgroundColor: '#f44336',
    color: 'white',
  },
};

class PaletteAccessibilityReport extends Component {
  getScoreColor(score) {
    if (score >= 80) return '#4caf50';
    if (score >= 60) return '#ff9800';
    if (score >= 40) return '#ff5722';
    return '#f44336';
  }

  getScoreGrade(score) {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'F';
  }

  render() {
    const { classes, palette } = this.props;
    
    if (!palette || !palette.colors) {
      return (
        <div className={classes.root}>
          <Typography variant="h5" style={{ color: '#e0e0e0', textAlign: 'center' }}>
            No palette data available
          </Typography>
        </div>
      );
    }

    const accessibility = calculatePaletteAccessibility(palette.colors);
    const stats = getPaletteStatistics(palette.colors);
    const scoreColor = this.getScoreColor(accessibility.score);
    const scoreGrade = this.getScoreGrade(accessibility.score);

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography variant="h4" style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>
            Accessibility Report
          </Typography>
          <Typography variant="h6" style={{ color: '#64B5F6' }}>
            {palette.paletteName}
          </Typography>
        </div>

        <Paper className={classes.scoreSection}>
          <Typography variant="h6" style={{ color: '#aaa', marginBottom: '1rem' }}>
            Overall Accessibility Score
          </Typography>
          <div
            className={classes.scoreCircle}
            style={{ backgroundColor: scoreColor + '20', color: scoreColor }}
          >
            {scoreGrade}
          </div>
          <Typography variant="h3" style={{ color: scoreColor, margin: '1rem 0' }}>
            {accessibility.score}%
          </Typography>
          <Typography variant="body1" style={{ color: '#aaa' }}>
            {accessibility.accessiblePairs} of {accessibility.totalPairs} color pairs are accessible
          </Typography>
        </Paper>

        {stats && (
          <div className={classes.statsSection}>
            <Typography variant="h6" style={{ color: '#e0e0e0', marginBottom: '1rem' }}>
              Palette Statistics
            </Typography>
            <div className={classes.statsGrid}>
              <Paper className={classes.statCard}>
                <div className={classes.statValue}>{stats.totalColors}</div>
                <div className={classes.statLabel}>Total Colors</div>
              </Paper>
              <Paper className={classes.statCard}>
                <div className={classes.statValue}>{stats.lightColors}</div>
                <div className={classes.statLabel}>Light Colors</div>
              </Paper>
              <Paper className={classes.statCard}>
                <div className={classes.statValue}>{stats.darkColors}</div>
                <div className={classes.statLabel}>Dark Colors</div>
              </Paper>
              <Paper className={classes.statCard}>
                <div className={classes.statValue} style={{ textTransform: 'capitalize' }}>
                  {stats.colorTemperature}
                </div>
                <div className={classes.statLabel}>Color Temperature</div>
              </Paper>
            </div>
          </div>
        )}

        <div className={classes.tableSection}>
          <Typography variant="h6" style={{ color: '#e0e0e0', marginBottom: '1rem' }}>
            Color Pair Contrast Ratios
          </Typography>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table>
              <TableHead className={classes.tableHeader}>
                <TableRow>
                  <TableCell className={classes.tableHeaderCell}>Foreground</TableCell>
                  <TableCell className={classes.tableHeaderCell}>Background</TableCell>
                  <TableCell className={classes.tableHeaderCell} align="center">
                    Contrast Ratio
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell} align="center">
                    WCAG AA
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accessibility.details.slice(0, 20).map((pair, index) => (
                  <TableRow key={index}>
                    <TableCell className={classes.tableCell}>
                      <div className={classes.colorCell}>
                        <div
                          className={classes.colorSwatch}
                          style={{
                            backgroundColor: palette.colors.find(c => c.name === pair.color1)?.color,
                          }}
                        />
                        <span>{pair.color1}</span>
                      </div>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <div className={classes.colorCell}>
                        <div
                          className={classes.colorSwatch}
                          style={{
                            backgroundColor: palette.colors.find(c => c.name === pair.color2)?.color,
                          }}
                        />
                        <span>{pair.color2}</span>
                      </div>
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      <strong>{pair.ratio}:1</strong>
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      <Chip
                        icon={pair.isAccessible ? <CheckCircleIcon /> : <CancelIcon />}
                        label={pair.isAccessible ? 'Pass' : 'Fail'}
                        size="small"
                        className={pair.isAccessible ? classes.passChip : classes.failChip}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {accessibility.details.length > 20 && (
            <Typography
              variant="body2"
              style={{ color: '#aaa', marginTop: '1rem', textAlign: 'center' }}
            >
              Showing top 20 of {accessibility.details.length} color pairs
            </Typography>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteAccessibilityReport);


