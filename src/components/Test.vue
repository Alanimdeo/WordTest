<template>
    <div class="wrap">
        <h1>단어시험</h1>
        <p class="wt-name">{{ wtName }}</p>
        <div class="words">
            <ol>
                <li v-for="(word, index) in words" :key="word">
                    <div class="cover">
                        <div class="word">
                            <p :class="score.incorrect.includes(index) ? 'red' : ''">{{ word.word }}</p>
                        </div>
                        <div class="word-meaning">
                            <div class="meaning" v-for="(meaning, meaningIndex) in word.meaning" :key="meaning">
                                <p>{{ meaning.part }}.</p>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="뜻"
                                        v-for="(_, i) in meaning.meaning"
                                        v-model="answer[index].meaning[meaningIndex].meaning[i]"
                                        autocomplete="off"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ol>
            <div v-if="score.complete">
                <p>
                    전체 {{ words.length }}개 단어 중 {{ score.correct }}개 정답, {{ words.length - score.correct }}개
                    틀림
                </p>
                <p>점수: {{ score.score }}점</p>
            </div>
            <div class="bottom-buttons">
                <button @click="doScore()">채점하기</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            wtName: "제목 없음",
            words: null,
            answer: null,
            score: {
                complete: false,
                correct: 0,
                score: 0,
                incorrect: [],
            },
        };
    },
    created() {
        if (!this.$route.params.words) location.href = "/";
        const file = JSON.parse(this.$route.params.words);
        this.wtName = file.wtName;
        let words = file.words;
        words.sort(() => Math.random() - 0.5);
        let answer = JSON.parse(JSON.stringify(words));
        answer.map((word) => {
            word.meaning.map((meaning) => {
                meaning.meaning = new Array(meaning.meaning.length);
                meaning.meaning.fill("");
            });
        });
        this.words = words;
        this.answer = answer;
    },
    methods: {
        doScore() {
            let correct = 0;
            let incorrect = [];
            let maxScore = this.words.length;
            // this.words.map((word) => word.meaning.map((meaning) => (maxScore += meaning.meaning.length)));
            this.answer.map((word, wordIndex) => {
                let wordCorrect = 0;
                word.meaning.map((meaning, meaningIndex) => {
                    let meaningSet = new Set(meaning.meaning);
                    let meaningCorrect = false;
                    meaningSet.forEach((partMeaning) => {
                        if (this.words[wordIndex].meaning[meaningIndex].meaning.includes(partMeaning))
                            meaningCorrect = true;
                    });
                    if (meaningCorrect) wordCorrect++;
                });
                if (wordCorrect == word.meaning.length) correct++;
                else incorrect.push(wordIndex);
            });
            this.score.complete = true;
            this.score.correct = correct;
            this.score.score = (correct / maxScore) * 100;
            this.score.incorrect = incorrect;
            alert(
                `전체 ${maxScore}개 단어 중 ${correct}개의 단어를 맞혔습니다.\n점수: ${(correct / maxScore) * 100}점`
            );
        },
    },
};
</script>

<style scoped>
button {
    background-color: #fcfcfc;
    border-radius: 5px;
    border: 1px solid #000000;
    cursor: pointer;
    text-align: left;
    transition-duration: 0.2s;
    text-align: center;
    color: black;
}
button:hover {
    background-color: #eeeeee;
}
button:active {
    background-color: #dddddd;
}
.wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.wt-name {
    width: 100%;
    margin-bottom: 20px;
    text-align: center;
}
h1 {
    font-size: 36px;
    font-weight: 100;
    margin: 3% 0;
}
ol {
    margin: 0;
}
li {
    margin-bottom: 10px;
}
.words {
    flex: 1;
    overflow-y: scroll;
}
.cover {
    width: 100%;
    display: flex;
    justify-content: center;
}
.word {
    width: 38%;
    margin-right: 2%;
}
.word p {
    margin: 0;
}
.word-meaning {
    width: 56%;
    margin: 0 2%;
}
.meaning {
    width: 100%;
    display: flex;
    justify-content: center;
}
.meaning p {
    width: 10%;
    margin: 0 2% 4px 0;
}
.meaning div {
    width: 80%;
    margin: 0;
}
.meaning div input {
    width: 100%;
    margin-bottom: 4px;
}
.red {
    color: red;
}
</style>
