// ===== ОСНОВНОЙ КОД =====
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация переменных
    const ageElement = document.getElementById('age');
    const photo = document.getElementById('photo');
    const confettiBtn = document.getElementById('confettiBtn');
    let age = 25;
    let targetAge = 17; // Замените на нужный возраст
    
    // Массив с локальными фото из папки img
    const photoUrls = [
        'img/мужик1.jpg',
        'img/мужик2.jpg' 
    ];
    
    let photoIndex = 0;

    // Анимация увеличения возраста
    let ageCounter = setInterval(() => {
        if (age < targetAge) {
            age++;
            ageElement.textContent = age;
            ageElement.style.transform = 'scale(1.2)';
            setTimeout(() => {
                ageElement.style.transform = 'scale(1)';
            }, 200);
        } else {
            clearInterval(ageCounter);
        }
    }, 150);
    
    // Функция для запуска конфетти
    window.startConfetti = function() {
        // Создаем эффект конфетти с помощью canvas
        const canvas = document.getElementById('confetti');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        let particles = [];
        const particleCount = 200;
        
        // Создаем частицы конфетти
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                size: Math.random() * 10 + 5,
                speed: Math.random() * 5 + 2,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 10 - 5
            });
        }
        
        // Анимация конфетти
        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach((p, index) => {
                p.y += p.speed;
                p.x += Math.sin(p.y * 0.01) * 2;
                p.rotation += p.rotationSpeed;
                
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation * Math.PI/180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
                ctx.restore();
                
                if (p.y > canvas.height) {
                    particles[index] = {
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height - canvas.height,
                        size: Math.random() * 10 + 5,
                        speed: Math.random() * 5 + 2,
                        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                        rotation: Math.random() * 360,
                        rotationSpeed: Math.random() * 10 - 5
                    };
                }
            });
        }
        
        animate();
        
        // Останавливаем конфетти через 5 секунд
        setTimeout(() => {
            particles = [];
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 5000);
        
        // Анимация кнопки
        confettiBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            confettiBtn.style.transform = '';
        }, 100);
    }
    
    // Функция смены текста
    window.changeText = function() {
        const textStyles = ['normal', 'uppercase', 'lowercase'];
        staticTextStyle = (staticTextStyle + 1) % textStyles.length;
        document.querySelectorAll('.message p').forEach(p => {
            p.style.textTransform = textStyles[staticTextStyle];
        });
        
        // Добавляем анимацию
        const message = document.querySelector('.message');
        message.style.animation = 'none';
        setTimeout(() => {
            message.style.animation = 'slideIn 1.5s';
        }, 10);
    }
    
    // Функция смены фона
    window.changeBackground = function() {
        const colors = [
            'linear-gradient(135deg, #0a192f 0%, #112240 25%, #15315a 50%, #1e40af 75%, #2563eb 100%)',
            'linear-gradient(135deg, #1e3a8a 0%, #1e40af 25%, #2563eb 50%, #3b82f6 75%, #60a5fa 100%)',
            'linear-gradient(135deg, #000080 0%, #0000ff 25%, #4169e1 50%, #1e90ff 75%, #87cefa 100%)',
            'linear-gradient(135deg, #03045e 0%, #023e8a 25%, #0077b6 50%, #0096c7 75%, #00b4d8 100%)'
        ];
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.style.background = randomColor;
        document.body.style.backgroundSize = '400% 400%';
    }
    
    // Функция смены фото
    window.changePhoto = function() {
        photoIndex = (photoIndex + 1) % photoUrls.length;
        photo.src = photoUrls[photoIndex];
        
        // Анимация смены фото
        photo.style.opacity = 0;
        setTimeout(() => {
            photo.style.transition = 'opacity 0.5s';
            photo.style.opacity = 1;
        }, 300);
    }
    
    // Функция добавления мышц
    window.addMuscles = function() {
        photo.style.transform = 'scale(1.1)';
        photo.style.filter = 'contrast(1.2) brightness(1.1)';
        
        // Создаем эффект "накачки"
        const frame = document.querySelector('.photo-frame');
        frame.style.boxShadow = '0 0 30px rgba(56, 189, 248, 0.8)';
        frame.style.transform = 'scale(1.1)';
        
        // Возвращаем к исходному состоянию через 1 секунду
        setTimeout(() => {
            photo.style.transform = '';
            photo.style.filter = '';
            frame.style.boxShadow = '';
            frame.style.transform = '';
        }, 1000);
    }
    
    // Функция воспроизведения звука
    window.playSound = function() {
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-boxing-punch-2054.mp3');
        audio.play();
    }
    
    // Функция накачки мышц
    window.pumpIt = function() {
        const elements = document.querySelectorAll('.btn, .toy, .photo-frame');
        
        elements.forEach(el => {
            el.style.transform = 'scale(1.1)';
            el.style.transition = 'transform 0.3s';
        });
        
        // Вибрация для поддерживаемых устройств
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
        
        // Возвращаем к исходному состоянию
        setTimeout(() => {
            elements.forEach(el => {
                el.style.transform = '';
            });
        }, 300);
        
        // Запускаем конфетти
        startConfetti();
    }
    
    // Добавляем начальные стили для фото
    photo.style.filter = 'grayscale(0.3)';
    photo.style.transition = 'filter 0.5s';
    
    let staticTextStyle = 0;
});