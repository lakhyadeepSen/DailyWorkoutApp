// script.js

const exercises = {
    warmup: [
        {
            name: "Neck rotations",
            reps: "10 rotations each direction",
            info: "",
            gifUrl: "Neck rotations.gif",
            isRepBased: true
        },
        {
            name: "Arm circles",
            reps: "10 circles each direction",
            info: "",
            gifUrl: "Arm circles.gif",
            isRepBased: true
        },
        {
            name: "Hip rotations",
            reps: "10 rotations each direction",
            info: "",
            gifUrl: "Hip rotations.gif",
            isRepBased: true
        },
        {
            name: "Spot jogging",
            duration: 60,
            info: "",
            gifUrl: "Spot jogging.gif",
            isRepBased: false
        },
        {
            name: "High knees",
            duration: 30,
            info: "",
            gifUrl: "High knees.gif",
            isRepBased: false
        },
        {
            name: "Jumping jacks",
            duration: 30,
            info: "",
            gifUrl: "Jumping jacks.gif",
            isRepBased: false
        }
    ],
    routineA: [
        {
            name: "Hanuman Dand",
            duration: 300,
            info: "",
            gifUrl: "Hanuman Dand.gif",
            isRepBased: false
        },
        {
            name: "Mountain Climbers",
            duration: 120,
            info: "",
            gifUrl: "Mountain Climbers.gif",
            isRepBased: false
        },
        {
            name: "Plank Hold",
            duration: 60,
            info: "",
            gifUrl: "Plank Hold.gif",
            isRepBased: false
        },
        {
            name: "Lunges",
            duration: 120,
            info: "",
            gifUrl: "Lunges.gif",
            isRepBased: false
        },
        {
            name: "Glute Bridge",
            duration: 120,
            info: "",
            gifUrl: "Glute Bridge.gif",
            isRepBased: false
        },
        {
            name: "Hindu Push-ups",
            duration: 120,
            info: "",
            gifUrl: "Dand.gif",
            isRepBased: false
        },
        {
            name: "Wall Sits",
            duration: 60,
            info: "",
            gifUrl: "Wall Sits.gif",
            isRepBased: false
        }
    ],
    routineB: [
        {
            name: "Hanuman Dand",
            duration: 300,
            info: "",
            gifUrl: "Hanuman Dand.gif",
            isRepBased: false
        },
        {
            name: "Bicycle Crunches",
            duration: 120,
            info: "",
            gifUrl: "Bicycle Crunches.gif",
            isRepBased: false
        },
        {
            name: "Side Planks",
            duration: 30,
            info: "",
            gifUrl: "Side Planks.gif",
            isRepBased: false
        },
        {
            name: "Bird Dog Exercise",
            duration: 120,
            info: "",
            gifUrl: "Bird Dog Exercise.gif",
            isRepBased: false
        },
        {
            name: "Standing Calf Raises",
            duration: 120,
            info: "",
            gifUrl: "Standing Calf Raises.gif",
            isRepBased: false
        },
        {
            name: "Diamond Push-ups",
            duration: 120,
            info: "",
            gifUrl: "Diamond Push-ups.gif",
            isRepBased: false
        },
        {
            name: "Russian Twists",
            duration: 120,
            info: "",
            gifUrl: "Russian Twists.gif",
            isRepBased: false
        }
    ]
};

let currentRoutine = [];
let currentExerciseIndex = 0;
let timeLeft = 0;
let timerInterval;
let isPaused = false;
let currentSection = 'warmup';

function startRoutine(routine) {
    currentSection = 'warmup';
    currentRoutine = exercises.warmup.concat(exercises[`routine${routine}`]);
    currentExerciseIndex = 0;
    document.querySelector('.routine-selection').style.display = 'none';
    document.querySelector('.exercise-display').style.display = 'flex';
    document.querySelector('.complete').style.display = 'none';
    startExercise();
}

function startExercise() {
    clearInterval(timerInterval);
    
    if (currentExerciseIndex >= currentRoutine.length) {
        showComplete();
        return;
    }

    const exercise = currentRoutine[currentExerciseIndex];
    document.querySelector('.exercise-name').textContent = exercise.name;
    document.querySelector('.exercise-info').innerHTML = exercise.info;
    document.querySelector('.exercise-gif').innerHTML = `
        <img src="${exercise.gifUrl}" alt="${exercise.name}" style="object-fit: contain; width: 100%; height: 100%;">
    `;
    document.querySelector('.exercise-progress').textContent = 
        `Exercise ${currentExerciseIndex + 1} of ${currentRoutine.length}`;

    // Reset pause state
    isPaused = false;
    updatePauseButton();

    if (exercise.isRepBased) {
        // Handle rep-based exercise
        document.querySelector('.timer').style.display = 'none';
        document.querySelector('.reps-display').style.display = 'block';
        document.querySelector('.reps-display').textContent = exercise.reps;
        document.querySelector('.proceed-btn').style.display = 'block';
        document.querySelector('.timer-controls').style.display = 'none';
    } else {
        // Handle time-based exercise
        document.querySelector('.timer').style.display = 'block';
        document.querySelector('.reps-display').style.display = 'none';
        document.querySelector('.timer-controls').style.display = 'flex';
        document.querySelector('.proceed-btn').style.display = 'block'; // Changed from 'none' to 'block'
        
        // Initialize timer
        timeLeft = exercise.duration;
        updateTimerDisplay();
        startTimer();
    }
}

function togglePause() {
    isPaused = !isPaused;
    updatePauseButton();
    
    if (isPaused) {
        clearInterval(timerInterval);
    } else {
        startTimer();
    }
}

function updatePauseButton() {
    const pauseBtn = document.querySelector('.control-btn');
    pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
    pauseBtn.classList.toggle('pause', !isPaused);
    pauseBtn.classList.toggle('resume', isPaused);
}

function startTimer() {
    clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        if (!isPaused && timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerInterval);
                document.getElementById('chime').play().catch(error => console.log('Audio play failed:', error));
                // Removed the line that shows proceed button since it's always visible now
            }
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.querySelector('.timer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function proceedToNext() {
    clearInterval(timerInterval); // Clear timer before moving to next exercise
    currentExerciseIndex++;
    startExercise();
}

function showComplete() {
    clearInterval(timerInterval); // Clear timer when workout is complete
    document.querySelector('.exercise-display').style.display = 'none';
    document.querySelector('.complete').style.display = 'flex';
    document.querySelector('.routine-selection').style.display = 'flex';
}