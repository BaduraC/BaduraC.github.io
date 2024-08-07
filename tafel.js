document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');
    const transparentField = document.getElementById('transparentField');
    const canvas = document.getElementById('noteCanvas');
    const ctx = canvas.getContext('2d');
    let drawing = false;
    let moving = false;
    let startY = 0;
    let endY = 0;
    const threshold = 50; // Threshold for swipe detection

    // Resize canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    // Toggle transparent field visibility
    toggleButton.addEventListener('click', function() {
        if (transparentField.style.display === 'none') {
            transparentField.style.display = 'block';
        } else {
            transparentField.style.display = 'none';
        }
    });

    // Start drawing
    canvas.addEventListener('mousedown', startDrawing, false);
    canvas.addEventListener('mousemove', draw, false);
    canvas.addEventListener('mouseup', stopDrawing, false);
    canvas.addEventListener('mouseout', stopDrawing, false);

    canvas.addEventListener('touchstart', startDrawing, false);
    canvas.addEventListener('touchmove', draw, false);
    canvas.addEventListener('touchend', stopDrawing, false);

    function startDrawing(e) {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY);
        e.preventDefault();
    }

    function draw(e) {
        if (!drawing) return;
        ctx.lineTo(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY);
        ctx.stroke();
        e.preventDefault();
    }

    function stopDrawing(e) {
        if (!drawing) return;
        drawing = false;
        ctx.closePath();
        e.preventDefault();
    }

    // Swipe up detection
    const swipeUpArea = document.getElementById('swipeUpArea');
    swipeUpArea.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    }, false);

    swipeUpArea.addEventListener('touchmove', function(e) {
        endY = e.touches[0].clientY;
    }, false);

    swipeUpArea.addEventListener('touchend', function() {
        if (startY - endY > threshold) {
            alert('Swipe up detected!');
        }
    }, false);

    // Mouse event listeners for swipe area
    swipeUpArea.addEventListener('mousedown', startAction, false);
    swipeUpArea.addEventListener('mousemove', moveAction, false);
    swipeUpArea.addEventListener('mouseup', endAction, false);

    function startAction(e) {
        startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        moving = true; // Start tracking movement
        e.preventDefault(); // Prevent default action (scroll / drag)
    }

    // Function to handle movement (for both touch and mouse)
    function moveAction(e) {
        if (moving) {
            let currentY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
            endY = currentY;
        }
    }

    // Function to handle the end of a swipe or mouse drag
    function endAction(e) {
        if (moving && startY - endY > threshold) { // Swipe up or drag up
            transparentField.style.display = 'block';
        }
        moving = false; // Stop tracking movement
    }
});