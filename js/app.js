import { Pages } from "./modules/pages.js";
import { Prizes } from "./modules/prizes.js";
import { question } from "./modules/questions.js"

const Quiz = {
    app: document.querySelector('.app'),
    body: document.createElement('div'),
    live: 3,
    page: 0,
    questions: [],

    init() {
        this.questions = this.getQuestions();
        this.getPage();
        this.body.classList.add('app-body');
        for(let key in this.getPagesText()[this.page]) {
            this.body.append(
                this.renderTextElement(key, this.getPagesText()[this.page][key])
            )
        }
        this.app.append(
            this.body,
            this.renderButton('Начать'),
            this.renderTextElement('img', '')
        )
        this.buttonListener(document.querySelector('.button'));
    },

    buttonListener(button) {
        if(button) {
            button.onclick = () => {
                this.body.classList.remove('hidden')
                if(this.page > 0) {
                    button.textContent = 'Далее'
                }
                if(this.live > 0 && this.page < this.questions.length + 1) {
                    this.renderQuizPage();
                }else if(this.live === 0) {
                    console.log('looser')
                }else{
                    console.log('winner')
                }
            }
        }
    },

    getQuestions() {
        return question;
    },

    getPrizes() {
        return Prizes
    },

    getPagesText() {
        return Pages
    },

    mistake() {
        this.live--;
    },

    getPage() {
        this.page++;
        this.app.dataset.page = this.page;
    },

    renderTextElement(style, text) {
        if(typeof text !== 'object') {
            const el = style === 'button' ? document.createElement('button') : document.createElement('div');
            el.className = style;
            el.textContent = text;
            return el;
        }
    },

    renderButton(text) {
        const button = document.createElement('button');
        button.classList.add('button');
        button.textContent = text;
        return button;
    },

    renderAnswers(array) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('answers');
        array.forEach((el, index) => {
            const answer = document.createElement('button');
            answer.classList.add('answer');
            answer.textContent = el.text;
            answer.dataset.id = index;
            wrapper.append(answer)
        });
        wrapper.onclick = (e) => {
            this.checkAnswer(e.target)
        }
        return wrapper;
    },

    checkAnswer(target) {
        if(target.dataset.id) {
            this.afterCheckAnswer(target, Boolean(this.questions[this.page - 2].answers[target.dataset.id].true))
            if(this.questions[this.page - 2].answers[target.dataset.id].true) {
                
            }else{
                this.mistake()
            }
        }
    },

    afterCheckAnswer(target, answer) {
        target.classList.add(answer)
        this.body.classList.add('hidden');
    },

    renderQuizPage() {
        document.querySelector('.img').style.animation = 'none';
        this.getPage();
        this.body.innerHTML = '';
        this.body.append(
            this.renderTextElement(
                'question', this.questions[this.page - 2].question
            ),
            this.renderAnswers(this.questions[this.page - 2].answers),
            this.renderTextElement('message', this.questions[this.page - 2].message)
        )
        setTimeout(() => {
            document.querySelector('.img').style.animation = "show .3s linear forwards";
        }, 100)
    },
}

Quiz.init();