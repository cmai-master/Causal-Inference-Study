// Utility functions for Causal Inference interactive learning

// Progress tracking
function updateProgress() {
    const totalChapters = 15;
    const completed = getCompletedChapters();
    const percentage = (completed.length / totalChapters) * 100;

    const progressBar = document.querySelector('.progress-fill');
    if (progressBar) {
        progressBar.style.width = percentage + '%';
        progressBar.textContent = Math.round(percentage) + '%';
    }
}

function getCompletedChapters() {
    const completed = localStorage.getItem('completedChapters');
    return completed ? JSON.parse(completed) : [];
}

function markChapterComplete(chapterNum) {
    const completed = getCompletedChapters();
    if (!completed.includes(chapterNum)) {
        completed.push(chapterNum);
        localStorage.setItem('completedChapters', JSON.stringify(completed));
        updateProgress();
        showNotification('Chapter ' + chapterNum + ' marked as complete!', 'success');
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Quiz functionality
function initQuiz(quizElement) {
    const questions = quizElement.querySelectorAll('.question');

    questions.forEach((question, qIndex) => {
        const options = question.querySelectorAll('.option');
        const feedback = question.querySelector('.feedback');

        options.forEach((option, oIndex) => {
            option.addEventListener('click', () => {
                // Remove previous selections
                options.forEach(opt => {
                    opt.classList.remove('correct', 'incorrect');
                });

                // Check answer
                const isCorrect = option.dataset.correct === 'true';
                option.classList.add(isCorrect ? 'correct' : 'incorrect');

                // Show feedback
                if (feedback) {
                    feedback.className = `feedback show ${isCorrect ? 'correct' : 'incorrect'}`;
                }
            });
        });
    });
}

// Interactive simulation base class
class Simulation {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = null;
        this.ctx = null;
        this.data = [];
    }

    createCanvas(width = 600, height = 400) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.border = '1px solid #ddd';
        this.ctx = this.canvas.getContext('2d');
        return this.canvas;
    }

    clear() {
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
}

// Scatter plot simulation
class ScatterPlot extends Simulation {
    constructor(containerId) {
        super(containerId);
        this.points = [];
    }

    generateData(n, correlation = 0.7) {
        this.points = [];
        for (let i = 0; i < n; i++) {
            const x = Math.random();
            const y = correlation * x + (1 - correlation) * Math.random();
            this.points.push({ x, y });
        }
    }

    draw(width = 600, height = 400) {
        if (!this.canvas) {
            this.createCanvas(width, height);
            this.container.appendChild(this.canvas);
        }

        this.clear();

        // Draw axes
        this.ctx.strokeStyle = '#2c3e50';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(50, height - 50);
        this.ctx.lineTo(width - 20, height - 50);
        this.ctx.moveTo(50, height - 50);
        this.ctx.lineTo(50, 20);
        this.ctx.stroke();

        // Draw points
        this.ctx.fillStyle = '#3498db';
        this.points.forEach(point => {
            const x = 50 + point.x * (width - 70);
            const y = (height - 50) - point.y * (height - 70);

            this.ctx.beginPath();
            this.ctx.arc(x, y, 5, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Draw regression line if correlation exists
        if (this.points.length > 0) {
            this.drawRegressionLine(width, height);
        }
    }

    drawRegressionLine(width, height) {
        // Simple linear regression
        const n = this.points.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

        this.points.forEach(point => {
            sumX += point.x;
            sumY += point.y;
            sumXY += point.x * point.y;
            sumX2 += point.x * point.x;
        });

        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;

        // Draw line
        this.ctx.strokeStyle = '#e74c3c';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();

        const x1 = 0;
        const y1 = intercept;
        const x2 = 1;
        const y2 = slope + intercept;

        const canvasX1 = 50 + x1 * (width - 70);
        const canvasY1 = (height - 50) - y1 * (height - 70);
        const canvasX2 = 50 + x2 * (width - 70);
        const canvasY2 = (height - 50) - y2 * (height - 70);

        this.ctx.moveTo(canvasX1, canvasY1);
        this.ctx.lineTo(canvasX2, canvasY2);
        this.ctx.stroke();
    }
}

// DAG (Directed Acyclic Graph) visualization
class DAGVisualization extends Simulation {
    constructor(containerId) {
        super(containerId);
        this.nodes = [];
        this.edges = [];
    }

    addNode(id, label, x, y) {
        this.nodes.push({ id, label, x, y });
    }

    addEdge(from, to) {
        this.edges.push({ from, to });
    }

    draw(width = 600, height = 400) {
        if (!this.canvas) {
            this.createCanvas(width, height);
            this.container.appendChild(this.canvas);
        }

        this.clear();

        // Draw edges first
        this.ctx.strokeStyle = '#34495e';
        this.ctx.lineWidth = 2;

        this.edges.forEach(edge => {
            const fromNode = this.nodes.find(n => n.id === edge.from);
            const toNode = this.nodes.find(n => n.id === edge.to);

            if (fromNode && toNode) {
                this.drawArrow(fromNode.x, fromNode.y, toNode.x, toNode.y);
            }
        });

        // Draw nodes
        this.nodes.forEach(node => {
            // Draw circle
            this.ctx.fillStyle = '#3498db';
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, 30, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.strokeStyle = '#2c3e50';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            // Draw label
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 14px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(node.label, node.x, node.y);
        });
    }

    drawArrow(x1, y1, x2, y2) {
        const headLength = 15;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const angle = Math.atan2(dy, dx);

        // Adjust start and end points to account for node radius
        const nodeRadius = 30;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const startX = x1 + (nodeRadius / distance) * dx;
        const startY = y1 + (nodeRadius / distance) * dy;
        const endX = x2 - (nodeRadius / distance) * dx;
        const endY = y2 - (nodeRadius / distance) * dy;

        // Draw line
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();

        // Draw arrowhead
        this.ctx.beginPath();
        this.ctx.moveTo(endX, endY);
        this.ctx.lineTo(
            endX - headLength * Math.cos(angle - Math.PI / 6),
            endY - headLength * Math.sin(angle - Math.PI / 6)
        );
        this.ctx.lineTo(
            endX - headLength * Math.cos(angle + Math.PI / 6),
            endY - headLength * Math.sin(angle + Math.PI / 6)
        );
        this.ctx.closePath();
        this.ctx.fillStyle = '#34495e';
        this.ctx.fill();
    }

    clear() {
        super.clear();
        this.nodes = [];
        this.edges = [];
    }
}

// Distribution visualization
class DistributionPlot extends Simulation {
    constructor(containerId) {
        super(containerId);
        this.distribution = [];
    }

    generateNormal(mean = 0, std = 1, n = 1000) {
        this.distribution = [];
        for (let i = 0; i < n; i++) {
            // Box-Muller transform
            const u1 = Math.random();
            const u2 = Math.random();
            const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
            this.distribution.push(mean + z * std);
        }
    }

    drawHistogram(bins = 30, width = 600, height = 400) {
        if (!this.canvas) {
            this.createCanvas(width, height);
            this.container.appendChild(this.canvas);
        }

        this.clear();

        const min = Math.min(...this.distribution);
        const max = Math.max(...this.distribution);
        const binWidth = (max - min) / bins;

        // Create histogram
        const histogram = new Array(bins).fill(0);
        this.distribution.forEach(value => {
            const binIndex = Math.min(Math.floor((value - min) / binWidth), bins - 1);
            histogram[binIndex]++;
        });

        const maxCount = Math.max(...histogram);

        // Draw bars
        const barWidth = (width - 100) / bins;
        this.ctx.fillStyle = '#3498db';

        histogram.forEach((count, i) => {
            const barHeight = (count / maxCount) * (height - 100);
            const x = 50 + i * barWidth;
            const y = height - 50 - barHeight;

            this.ctx.fillRect(x, y, barWidth - 2, barHeight);
        });

        // Draw axes
        this.ctx.strokeStyle = '#2c3e50';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(50, height - 50);
        this.ctx.lineTo(width - 20, height - 50);
        this.ctx.moveTo(50, height - 50);
        this.ctx.lineTo(50, 20);
        this.ctx.stroke();
    }
}

// Treatment effect simulator
class TreatmentEffectSimulator {
    constructor() {
        this.data = [];
    }

    simulate(n, treatmentEffect, confounding = 0) {
        this.data = [];

        for (let i = 0; i < n; i++) {
            const confounder = Math.random();
            const treatment = Math.random() < (0.5 + confounding * (confounder - 0.5)) ? 1 : 0;
            const noise = (Math.random() - 0.5) * 2;
            const y0 = confounder + noise; // Potential outcome without treatment
            const y1 = y0 + treatmentEffect; // Potential outcome with treatment
            const y = treatment ? y1 : y0; // Observed outcome

            this.data.push({
                treatment,
                outcome: y,
                y0,
                y1,
                confounder,
                individualEffect: y1 - y0
            });
        }
    }

    calculateATE() {
        const treated = this.data.filter(d => d.treatment === 1);
        const control = this.data.filter(d => d.treatment === 0);

        const meanTreated = treated.reduce((sum, d) => sum + d.outcome, 0) / treated.length;
        const meanControl = control.reduce((sum, d) => sum + d.outcome, 0) / control.length;

        return meanTreated - meanControl;
    }

    calculateTrueATE() {
        const sum = this.data.reduce((sum, d) => sum + d.individualEffect, 0);
        return sum / this.data.length;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Update progress if on main page
    updateProgress();

    // Initialize any quizzes on the page
    const quizzes = document.querySelectorAll('.quiz-container');
    quizzes.forEach(quiz => initQuiz(quiz));

    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ScatterPlot,
        DAGVisualization,
        DistributionPlot,
        TreatmentEffectSimulator,
        markChapterComplete,
        showNotification
    };
}
