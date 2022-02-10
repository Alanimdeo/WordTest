<template>
    <div class="wrap">
        <h1>파일 불러오기</h1>
        <p class="wt-name">제목: {{ wtName }}</p>
        <label>
            <input type="checkbox" v-model="showWords" />
            단어장 보기
        </label>
        <div class="words" v-if="showWords">
            <ol>
                <li v-for="word in words" :key="word">
                    <div class="cover">
                        <div class="word">
                            <p>{{ word.word }}</p>
                        </div>
                        <div class="word-meaning">
                            <div class="meaning" v-for="meaning in word.meaning" :key="meaning">
                                <p>{{ meaning.part }}.</p>
                                <div>
                                    <ol>
                                        <li v-for="partMeaning in meaning.meaning" :key="partMeaning">
                                            {{ partMeaning }}
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ol>
        </div>
        <label><input type="checkbox" v-model="shuffle" /> 단어장 섞기</label>
        <div class="bottom-buttons">
            <button @click="editWord()">단어 수정</button>
            <button @click="testStart()">시험 보기</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showWords: false,
            file: null,
            wtName: null,
            words: null,
            shuffle: false,
        };
    },
    created() {
        if (!this.$route.params.words) location.href = "/";
        this.file = this.$route.params.words;
        this.wtName = JSON.parse(this.file).wtName;
        this.words = JSON.parse(this.file).words;
    },
    methods: {
        editWord() {
            this.$router.push({ name: "생성", params: { words: this.file } });
        },
        testStart() {
            this.$router.push({ name: "테스트", params: { words: this.file, shuffle: this.shuffle } });
        },
    },
};
</script>

<style scoped>
.wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
}
h1 {
    font-size: 36px;
    font-weight: 100;
    margin: 3% 0;
}
.wt-name {
    width: 100%;
    margin-bottom: 20px;
    text-align: center;
}
ol {
    margin: 0;
}
li {
    margin-bottom: 10px;
}
.words {
    flex: 1;
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
    text-align: left;
}
.meaning div p {
    width: 100%;
    margin-bottom: 4px;
}
.bottom-buttons {
    display: flex;
    flex-direction: column;
    margin-top: 5%;
}
button {
    background-color: #1e7fce;
    border-radius: 5px;
    border: 2px solid #0e6fbe;
    cursor: pointer;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: left;
    font-size: 16px;
    transition-duration: 0.2s;
    display: inline-block;
    margin: 10px auto;
    text-align: center;
    color: white;
    text-decoration-line: none;
}
button:hover {
    opacity: 0.9;
}
button:active {
    background-color: #1666a8;
}
label {
    margin-bottom: 10px;
}
</style>
