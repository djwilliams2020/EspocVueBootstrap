let vm = new Vue({
    el: '#app',
    data: {
        instruction1: 'Click on the symbol below the card to guess the next image.',
        instruction2: 'If you score 3 out of 10, then you win ESP',
        header1: 'The',
        header2: 'Guessing Game',
        back: 'images/back.svg',
        dark: 'images/dark.png',
        isDark: false,
        noOfGuess: 10,
        pass: 3,
        score: 0,
        winAudio: new Audio('sound/ding.mp3'),
        guessChoices: ['star', 'circle', 'square', 'wave', 'plus'],
        toogleMsg: 'Press Icon To Toggle Dark-Mode',

        images: [
            {
                imgSrc: 'images/circle.svg',
                id: 'circle',
            },
            {
                imgSrc: 'images/plus.svg',
                id: 'plus',
            },
            {
                imgSrc: 'images/square.svg',
                id: 'square',
            },
            {
                imgSrc: 'images/star.svg',
                id: 'star',
            },
            {
                imgSrc: 'images/wave.svg',
                id: 'wave',
            },
        ],
    },
    watch: {},
    methods: {
        glowCard: function () {
            let card = document.getElementById('mainCard');
            card.classList.add('glowCard');
            setTimeout(function () {
                card.classList.remove('glowCard');
            }, 1000);
        },
        setCookie: function (name, value) {
            document.cookie = `${name}=${value};`;
        },
        getCookie: function (name) {
            const cookieObj = document.cookie
                .split(';')
                .map((cookie) => cookie.split('='))
                .reduce(
                    (accumulator, [key, value]) => ({
                        ...accumulator,
                        [key.trim()]: decodeURIComponent(value),
                    }),
                    {}
                );
            return cookieObj[name] || null;
        },
        switchIsDark: function () {
            let toggledImg = document.getElementsByClassName('top');
            toggledImg[0].classList.toggle('transparent');
            //   $('#cf2 img.top').toggleClass('transparent');
            this.isDark = !this.isDark;
            this.setCookie('switch', this.isDark);
            this.setCookie('color', this.isDark);
            this.setBackGroundColor();
        },
        shakeAll: function () {
            document.body.classList.toggle('setShake');
            setTimeout(function () {
                document.body.classList.toggle('setShake');
            }, 2000);
        },
        setBackGroundColor: function () {
            if (this.isDark == true) document.body.style.backgroundColor = '#282828';
            else {
                document.body.style.backgroundColor = 'aquamarine';
            }
        },
        userChoice: function (id) {
            let userChoice = id.target.id;
            let randomIndex = Math.floor(Math.random() * this.guessChoices.length);
            let current = this.guessChoices[randomIndex];
            let mainCard = document.getElementById('mainCard');
            mainCard.src = `images/${current}.svg`;

            if (current == userChoice) {
                this.score++;
                document.getElementById('Score').innerHTML = `Score:  ${this.score}`;
                this.winAudio.play();
                setTimeout(function () {
                    mainCard.src = 'images/back.svg';
                }, 1000);
            } else {
                this.shakeAll();
                this.glowCard();

                setTimeout(function () {
                    mainCard.src = 'images/back.svg';
                }, 1000);
            }

            this.noOfGuess--;
            document.getElementById('Guess').innerHTML = `Guess: ${this.noOfGuess}`;

            if (this.noOfGuess == 0) {
                setTimeout(function () {
                    mainCard.src = 'images/back.svg';
                }, 500);
                let num = this.score;
                let espNum = this.pass;
                const OverallGuesses = 10;
                const msg1 = 'Congratulations you have earned ESP!';
                const msg2 = 'Sorry you did not earn ESP!';
                console.log('pass is', this.pass);
                console.log('num is', this.score);

                setTimeout(function () {
                    if (num >= espNum) {
                        alert(`Your score is: ${num} out of ${OverallGuesses} \n ${msg1}`);
                    } else {
                        alert(`Your score is:  ${num} out of ${OverallGuesses} \n ${msg2}`);
                    }
                    location.reload();
                }, 1000);
            }
        },
    },
    mounted: function () {
        // this.isDark = JSON.parse(this.getCookie('switch')) || false;
        // console.log('thisis on the mount', this.isDark)
        if (JSON.parse(this.getCookie('switch')) != null) {
            this.isDark = JSON.parse(this.getCookie('switch'));
        } else {
            this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }

        if (this.isDark == true)
            this.bgColor = document.body.style.backgroundColor = '#282828';
        else {
            this.bgColor = document.body.style.backgroundColor = 'aquamarine';
        }
    },
});
