// Advanced visualization utilities for Causal Inference
// Includes Chart.js integration and custom animations

// Chart.js configuration
const chartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'top',
            labels: {
                font: { size: 14, family: 'Segoe UI' },
                padding: 15
            }
        },
        tooltip: {
            backgroundColor: 'rgba(44, 62, 80, 0.9)',
            titleFont: { size: 14, family: 'Segoe UI' },
            bodyFont: { size: 13, family: 'Segoe UI' },
            padding: 12,
            cornerRadius: 8
        }
    },
    animation: {
        duration: 1000,
        easing: 'easeInOutQuart'
    }
};

// Advanced Scatter Plot with Chart.js
class InteractiveScatterPlot {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.chart = null;
        this.options = { ...chartDefaults, ...options };
    }

    plot(data, config = {}) {
        const {
            xLabel = 'X',
            yLabel = 'Y',
            title = 'Scatter Plot',
            showRegression = true,
            groups = null
        } = config;

        // Destroy existing chart
        if (this.chart) {
            this.chart.destroy();
        }

        // Prepare datasets
        const datasets = [];

        if (groups) {
            // Multiple groups
            const uniqueGroups = [...new Set(groups)];
            const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12'];

            uniqueGroups.forEach((group, idx) => {
                const groupData = data.filter((_, i) => groups[i] === group);
                datasets.push({
                    label: `Group ${group}`,
                    data: groupData,
                    backgroundColor: colors[idx % colors.length],
                    borderColor: colors[idx % colors.length],
                    pointRadius: 6,
                    pointHoverRadius: 8
                });
            });
        } else {
            // Single group
            datasets.push({
                label: 'Data Points',
                data: data,
                backgroundColor: '#3498db',
                borderColor: '#2980b9',
                pointRadius: 6,
                pointHoverRadius: 8
            });
        }

        // Add regression line
        if (showRegression && data.length > 0) {
            const regression = this.calculateRegression(data);
            const linePoints = [
                { x: Math.min(...data.map(d => d.x)), y: regression.predict(Math.min(...data.map(d => d.x))) },
                { x: Math.max(...data.map(d => d.x)), y: regression.predict(Math.max(...data.map(d => d.x))) }
            ];

            datasets.push({
                label: `Regression (R² = ${regression.r2.toFixed(3)})`,
                data: linePoints,
                type: 'line',
                borderColor: '#e74c3c',
                borderWidth: 3,
                pointRadius: 0,
                fill: false,
                borderDash: [5, 5]
            });
        }

        this.chart = new Chart(this.ctx, {
            type: 'scatter',
            data: { datasets },
            options: {
                ...this.options,
                scales: {
                    x: {
                        title: { display: true, text: xLabel, font: { size: 14, weight: 'bold' } },
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    },
                    y: {
                        title: { display: true, text: yLabel, font: { size: 14, weight: 'bold' } },
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    }
                },
                plugins: {
                    ...this.options.plugins,
                    title: {
                        display: true,
                        text: title,
                        font: { size: 18, weight: 'bold' }
                    }
                }
            }
        });

        return regression;
    }

    calculateRegression(data) {
        const n = data.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;

        data.forEach(point => {
            sumX += point.x;
            sumY += point.y;
            sumXY += point.x * point.y;
            sumX2 += point.x * point.x;
            sumY2 += point.y * point.y;
        });

        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;

        // R-squared
        const meanY = sumY / n;
        let ssTotal = 0, ssResidual = 0;
        data.forEach(point => {
            const predicted = slope * point.x + intercept;
            ssTotal += Math.pow(point.y - meanY, 2);
            ssResidual += Math.pow(point.y - predicted, 2);
        });
        const r2 = 1 - (ssResidual / ssTotal);

        return {
            slope,
            intercept,
            r2,
            predict: (x) => slope * x + intercept
        };
    }

    update(data, config = {}) {
        this.plot(data, config);
    }
}

// Interactive Line Chart
class AnimatedLineChart {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.chart = null;
        this.options = { ...chartDefaults, ...options };
    }

    plot(datasets, config = {}) {
        const {
            xLabel = 'X',
            yLabel = 'Y',
            title = 'Line Chart',
            showPoints = true
        } = config;

        if (this.chart) {
            this.chart.destroy();
        }

        const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];

        const chartDatasets = datasets.map((dataset, idx) => ({
            label: dataset.label || `Series ${idx + 1}`,
            data: dataset.data,
            borderColor: colors[idx % colors.length],
            backgroundColor: `${colors[idx % colors.length]}33`,
            borderWidth: 3,
            pointRadius: showPoints ? 5 : 0,
            pointHoverRadius: 8,
            fill: dataset.fill !== undefined ? dataset.fill : false,
            tension: 0.4
        }));

        this.chart = new Chart(this.ctx, {
            type: 'line',
            data: { datasets: chartDatasets },
            options: {
                ...this.options,
                scales: {
                    x: {
                        type: 'linear',
                        title: { display: true, text: xLabel, font: { size: 14, weight: 'bold' } },
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    },
                    y: {
                        title: { display: true, text: yLabel, font: { size: 14, weight: 'bold' } },
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    }
                },
                plugins: {
                    ...this.options.plugins,
                    title: {
                        display: true,
                        text: title,
                        font: { size: 18, weight: 'bold' }
                    }
                }
            }
        });
    }

    animateDataPoints(initialData, finalData, duration = 2000) {
        const steps = 60;
        const stepDuration = duration / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
            const progress = currentStep / steps;
            const currentData = initialData.map((point, idx) => ({
                x: point.x + (finalData[idx].x - point.x) * progress,
                y: point.y + (finalData[idx].y - point.y) * progress
            }));

            if (this.chart) {
                this.chart.data.datasets[0].data = currentData;
                this.chart.update('none');
            }

            currentStep++;
            if (currentStep > steps) {
                clearInterval(interval);
            }
        }, stepDuration);
    }
}

// Interactive Bar Chart
class InteractiveBarChart {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.chart = null;
        this.options = { ...chartDefaults, ...options };
    }

    plot(labels, datasets, config = {}) {
        const {
            xLabel = 'Categories',
            yLabel = 'Values',
            title = 'Bar Chart',
            stacked = false,
            horizontal = false
        } = config;

        if (this.chart) {
            this.chart.destroy();
        }

        const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];

        const chartDatasets = datasets.map((dataset, idx) => ({
            label: dataset.label || `Series ${idx + 1}`,
            data: dataset.data,
            backgroundColor: colors[idx % colors.length],
            borderColor: colors[idx % colors.length],
            borderWidth: 2,
            borderRadius: 8
        }));

        this.chart = new Chart(this.ctx, {
            type: horizontal ? 'bar' : 'bar',
            data: {
                labels: labels,
                datasets: chartDatasets
            },
            options: {
                ...this.options,
                indexAxis: horizontal ? 'y' : 'x',
                scales: {
                    x: {
                        stacked: stacked,
                        title: { display: true, text: xLabel, font: { size: 14, weight: 'bold' } },
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    },
                    y: {
                        stacked: stacked,
                        title: { display: true, text: yLabel, font: { size: 14, weight: 'bold' } },
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    }
                },
                plugins: {
                    ...this.options.plugins,
                    title: {
                        display: true,
                        text: title,
                        font: { size: 18, weight: 'bold' }
                    }
                }
            }
        });
    }
}

// Distribution Histogram with Chart.js
class DistributionHistogram {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.chart = null;
        this.options = { ...chartDefaults, ...options };
    }

    plot(data, config = {}) {
        const {
            bins = 30,
            title = 'Distribution',
            xLabel = 'Value',
            yLabel = 'Frequency',
            showNormal = false,
            color = '#3498db'
        } = config;

        if (this.chart) {
            this.chart.destroy();
        }

        // Calculate histogram
        const min = Math.min(...data);
        const max = Math.max(...data);
        const binWidth = (max - min) / bins;

        const histogram = new Array(bins).fill(0);
        const binLabels = [];

        for (let i = 0; i < bins; i++) {
            const binStart = min + i * binWidth;
            const binEnd = binStart + binWidth;
            binLabels.push(binStart.toFixed(2));

            histogram[i] = data.filter(x => x >= binStart && x < binEnd).length;
        }

        const datasets = [{
            label: 'Frequency',
            data: histogram,
            backgroundColor: color,
            borderColor: color,
            borderWidth: 2,
            borderRadius: 5
        }];

        // Add normal curve overlay
        if (showNormal) {
            const mean = data.reduce((a, b) => a + b, 0) / data.length;
            const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length;
            const std = Math.sqrt(variance);

            const normalCurve = binLabels.map(label => {
                const x = parseFloat(label);
                const z = (x - mean) / std;
                const density = (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
                return density * data.length * binWidth;
            });

            datasets.push({
                label: 'Normal Distribution',
                data: normalCurve,
                type: 'line',
                borderColor: '#e74c3c',
                borderWidth: 3,
                pointRadius: 0,
                fill: false
            });
        }

        this.chart = new Chart(this.ctx, {
            type: 'bar',
            data: {
                labels: binLabels,
                datasets: datasets
            },
            options: {
                ...this.options,
                scales: {
                    x: {
                        title: { display: true, text: xLabel, font: { size: 14, weight: 'bold' } },
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    },
                    y: {
                        title: { display: true, text: yLabel, font: { size: 14, weight: 'bold' } },
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    }
                },
                plugins: {
                    ...this.options.plugins,
                    title: {
                        display: true,
                        text: title,
                        font: { size: 18, weight: 'bold' }
                    }
                }
            }
        });
    }
}

// Animated Counter
class AnimatedCounter {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
        this.currentValue = 0;
    }

    animateTo(targetValue, duration = 1000, decimals = 0) {
        const startValue = this.currentValue;
        const diff = targetValue - startValue;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeProgress = this.easeOutQuart(progress);

            const currentValue = startValue + (diff * easeProgress);
            this.currentValue = currentValue;
            this.element.textContent = currentValue.toFixed(decimals);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
}

// Progress Bar Animation
class ProgressBarAnimator {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
        this.currentProgress = 0;
    }

    animateTo(targetProgress, duration = 1000) {
        const startProgress = this.currentProgress;
        const diff = targetProgress - startProgress;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeProgress = this.easeOutCubic(progress);
            const currentValue = startProgress + (diff * easeProgress);

            this.currentProgress = currentValue;
            this.element.style.width = `${currentValue}%`;
            this.element.textContent = `${Math.round(currentValue)}%`;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
}

// Animated DAG with enhanced visuals
class EnhancedDAGVisualization extends DAGVisualization {
    constructor(containerId) {
        super(containerId);
        this.animating = false;
    }

    drawWithAnimation(width = 600, height = 400, duration = 1500) {
        if (!this.canvas) {
            this.createCanvas(width, height);
            this.container.appendChild(this.canvas);
        }

        this.clear();

        // Animate edges first
        this.animateEdges(duration / 2).then(() => {
            // Then animate nodes
            this.animateNodes(duration / 2);
        });
    }

    animateEdges(duration) {
        return new Promise(resolve => {
            const startTime = performance.now();
            const totalEdges = this.edges.length;

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                this.clear();

                // Draw edges progressively
                const edgesToDraw = Math.floor(progress * totalEdges);
                for (let i = 0; i < edgesToDraw; i++) {
                    const edge = this.edges[i];
                    const fromNode = this.nodes.find(n => n.id === edge.from);
                    const toNode = this.nodes.find(n => n.id === edge.to);
                    if (fromNode && toNode) {
                        this.drawArrow(fromNode.x, fromNode.y, toNode.x, toNode.y);
                    }
                }

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };

            requestAnimationFrame(animate);
        });
    }

    animateNodes(duration) {
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Draw all edges
            this.edges.forEach(edge => {
                const fromNode = this.nodes.find(n => n.id === edge.from);
                const toNode = this.nodes.find(n => n.id === edge.to);
                if (fromNode && toNode) {
                    this.drawArrow(fromNode.x, fromNode.y, toNode.x, toNode.y);
                }
            });

            // Draw nodes with scaling animation
            const scale = this.easeOutBack(progress);
            this.nodes.forEach(node => {
                const radius = 30 * scale;

                // Shadow
                this.ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
                this.ctx.shadowBlur = 10;
                this.ctx.shadowOffsetX = 2;
                this.ctx.shadowOffsetY = 2;

                // Circle with gradient
                const gradient = this.ctx.createRadialGradient(
                    node.x - 10, node.y - 10, 0,
                    node.x, node.y, radius
                );
                gradient.addColorStop(0, '#5dade2');
                gradient.addColorStop(1, '#2980b9');

                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
                this.ctx.fill();

                this.ctx.shadowColor = 'transparent';

                // Border
                this.ctx.strokeStyle = '#1a5276';
                this.ctx.lineWidth = 3;
                this.ctx.stroke();

                // Label
                this.ctx.fillStyle = 'white';
                this.ctx.font = `bold ${16 * scale}px Arial`;
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(node.label, node.x, node.y);
            });

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    easeOutBack(t) {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    }
}

// Utility: Generate normal distribution
function generateNormalDistribution(mean, std, n) {
    const data = [];
    for (let i = 0; i < n; i++) {
        // Box-Muller transform
        const u1 = Math.random();
        const u2 = Math.random();
        const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        data.push(mean + z * std);
    }
    return data;
}

// Export for use
if (typeof window !== 'undefined') {
    window.InteractiveScatterPlot = InteractiveScatterPlot;
    window.AnimatedLineChart = AnimatedLineChart;
    window.InteractiveBarChart = InteractiveBarChart;
    window.DistributionHistogram = DistributionHistogram;
    window.AnimatedCounter = AnimatedCounter;
    window.ProgressBarAnimator = ProgressBarAnimator;
    window.EnhancedDAGVisualization = EnhancedDAGVisualization;
    window.generateNormalDistribution = generateNormalDistribution;
}
