function plotGraph() {
    const equation = document.getElementById('equation').value;
    const xMin = parseFloat(document.getElementById('xMin').value);
    const xMax = parseFloat(document.getElementById('xMax').value);
    const xMark1 = parseFloat(document.getElementById('xMark1').value);
    const yMark1 = parseFloat(document.getElementById('yMark1').value);
    const xMark2 = parseFloat(document.getElementById('xMark2').value);
    const yMark2 = parseFloat(document.getElementById('yMark2').value);
    const canvas = document.getElementById('graph');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw x and y axes with labels
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    // Draw axis labels
    ctx.font = "12px Arial";
    ctx.fillText("0", canvas.width / 2 + 5, canvas.height / 2 - 5);
    ctx.fillText(xMin, 5, canvas.height / 2 - 5);
    ctx.fillText(xMax, canvas.width - 20, canvas.height / 2 - 5);

    // Plot the equation
    const scale = canvas.width / (xMax - xMin);
    if (equation) {
        ctx.beginPath();
        for (let x = xMin; x <= xMax; x += 0.1) {
            const y = eval(equation.replace(/x/g, `(${x})`));
            const canvasX = (x - xMin) * scale;
            const canvasY = canvas.height / 2 - y * scale;
            if (x === xMin) {
                ctx.moveTo(canvasX, canvasY);
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
        ctx.stroke();
    }

    // Mark specific points
    const markCanvasX1 = (xMark1 - xMin) * scale;
    const markCanvasY1 = canvas.height / 2 - yMark1 * scale;
    const markCanvasX2 = (xMark2 - xMin) * scale;
    const markCanvasY2 = canvas.height / 2 - yMark2 * scale;

    // Draw vertical and horizontal lines for first point
    ctx.beginPath();
    ctx.moveTo(markCanvasX1, 0);
    ctx.lineTo(markCanvasX1, canvas.height);
    ctx.moveTo(0, markCanvasY1);
    ctx.lineTo(canvas.width, markCanvasY1);
    ctx.strokeStyle = 'red';
    ctx.stroke();

    // Draw vertical and horizontal lines for second point
    ctx.beginPath();
    ctx.moveTo(markCanvasX2, 0);
    ctx.lineTo(markCanvasX2, canvas.height);
    ctx.moveTo(0, markCanvasY2);
    ctx.lineTo(canvas.width, markCanvasY2);
    ctx.strokeStyle = 'blue';
    ctx.stroke();

    // Draw marker points
    ctx.beginPath();
    ctx.arc(markCanvasX1, markCanvasY1, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(markCanvasX2, markCanvasY2, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();

    // Calculate and display the rate of change if no equation is provided
    if (!equation) {
        const rateOfChange = (yMark2 - yMark1) / (xMark2 - xMark1);
        const roundedRateOfChange = Math.round(rateOfChange * 10) / 10;
        
        const numerator = yMark2 - yMark1;
        const denominator = xMark2 - xMark1;
        const fraction = `${numerator}/${denominator}`;

        document.getElementById('rateOfChange').innerText = 
            `Rate of Change: ${roundedRateOfChange} (Fraction: ${fraction})`;
    }
}
