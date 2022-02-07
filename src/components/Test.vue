<template>
    <!-- <p v-for="(meaning, word) in words" :key="word">{{ word }}: {{ meaning }}</p> -->
    <div class="wrap">
        <h1>단어시험</h1>
        <p class="wt-name">{{ wtName }}</p>
        <div class="words">
            <ol>
                <li v-for="(word, index) in words" :key="word">
                    <div class="cover">
                        <div class="word">
                            <p>{{ word.word }}</p>
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
            <div class="bottom-buttons">
                <button @click="score()">채점하기</button>
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
        score() {
            let maxScore = 0;
            this.words.map((word) => word.meaning.map((meaning) => (maxScore += meaning.meaning.length)));
            let correct = 0;
            this.answer.map((word, wordIndex) => {
                word.meaning.map((meaning, meaningIndex) => {
                    let meaningSet = new Set(meaning.meaning);
                    meaningSet.forEach((partMeaning) => {
                        if (this.words[wordIndex].meaning[meaningIndex].meaning.includes(partMeaning)) correct++;
                    });
                });
            });
            console.log("maxScore:", maxScore);
            console.log("score:", correct);
            console.log("max 100 score:", (correct / maxScore) * 100);
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
</style>
