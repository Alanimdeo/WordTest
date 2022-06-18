<template>
    <div class="wrap">
        <h1>단어장 생성</h1>
        <div class="wt-name">
            <input type="text" v-model="wtName" placeholder="단어장 이름" autocomplete="off" />
        </div>
        <div class="words">
            <ol>
                <li v-for="(word, index) in words" :key="word">
                    <div class="cover">
                        <div class="word">
                            <button v-if="words.length != 1" @click="deleteWord(index)">✕</button>
                            <input
                                type="text"
                                placeholder="단어 제목"
                                :id="`word_${index}`"
                                v-model="words[index].word"
                                @input="wordInput(index)"
                                autocomplete="off"
                            />
                        </div>
                        <div class="word-meaning">
                            <div class="meaning" v-for="(meaning, meaningIndex) in words[index].meaning" :key="meaning">
                                <button
                                    style="margin-bottom: 4px"
                                    v-if="words[index].meaning.length != 1"
                                    @click="deleteWord(index, meaningIndex)"
                                >
                                    ✕
                                </button>
                                <select
                                    :id="`sel_${index}_${meaningIndex}`"
                                    @change="selectChange"
                                    :value="`${meaning.part}.`"
                                >
                                    <option
                                        v-for="part in parts"
                                        :key="part"
                                        :disabled="
                                            meaning.part != part && word.meaning.map((e) => e.part).includes(part)
                                        "
                                    >
                                        {{ part }}.
                                    </option>
                                </select>
                                <div>
                                    <div class="part-meaning" v-for="(_, i) in meaning.meaning">
                                        <button
                                            v-if="meaning.meaning.length != 1"
                                            @click="deleteWord(index, meaningIndex, i)"
                                        >
                                            ✕
                                        </button>
                                        <input
                                            type="text"
                                            placeholder="뜻"
                                            :id="`meaning_${index}_${meaningIndex}_${i}`"
                                            v-model="words[index].meaning[meaningIndex].meaning[i]"
                                            autocomplete="off"
                                        />
                                    </div>
                                    <button @click="addMeaning(index, meaningIndex)">뜻 추가</button>
                                </div>
                            </div>
                            <div class="meaning" style="justify-content: left">
                                <button style="width: 18%" @click="addPart(index)">+</button>
                            </div>
                        </div>
                    </div>
                </li>
            </ol>
            <div class="bottom-buttons">
                <button @click="addWord">단어 추가</button>
                <button @click="save">저장</button>
            </div>
        </div>
    </div>
</template>

<script>
import inko from "inko";

export default {
    data() {
        return {
            inko: null,
            wtName: "",
            words: [
                {
                    word: "",
                    meaning: [
                        {
                            part: "n",
                            meaning: [""],
                        },
                    ],
                },
            ],
            // part of speech of english
            parts: ["n", "v", "a", "ad", "p"],
        };
    },
    created() {
        this.inko = new inko.Inko();
        if (this.$route.params.words) {
            this.words = JSON.parse(this.$route.params.words);
            this.wtName = this.words.wtName;
            this.words = this.words.words;
        }
    },
    methods: {
        wordInput(index) {
            this.words[index].word = this.inko.ko2en(this.words[index].word);
        },
        selectChange(e) {
            const [wordIndex, meaningIndex] = e.target.id.split("_").slice(1);
            const part = e.target.value.split(".")[0];
            this.words[wordIndex].meaning[meaningIndex].part = part;
        },
        deleteWord(wordIndex, meaningIndex, partMeaningIndex) {
            if (partMeaningIndex !== undefined)
                this.words[wordIndex].meaning[meaningIndex].meaning.splice(partMeaningIndex, 1);
            else if (meaningIndex !== undefined) this.words[wordIndex].meaning.splice(meaningIndex, 1);
            else this.words.splice(wordIndex, 1);
        },
        addWord() {
            this.words.push({
                word: "",
                meaning: [
                    {
                        part: "n",
                        meaning: [""],
                    },
                ],
            });
            setTimeout(() => document.getElementById(`word_${this.words.length - 1}`).focus(), 10);
        },
        addPart(index) {
            let usedParts = this.words[index].meaning.map((e) => e.part);
            let partsAvailable = this.parts.filter((part) => !usedParts.includes(part));
            if (partsAvailable.length == 0)
                return this.$toast.open({
                    message: "추가할 수 있는 품사가 없습니다.",
                    type: "error",
                    position: "top",
                    duration: 2000,
                });
            this.words[index].meaning.push({
                part: partsAvailable[0],
                meaning: [""],
            });
            setTimeout(
                () => document.getElementById(`sel_${index}_${this.words[index].meaning.length - 1}`).focus(),
                10
            );
        },
        addMeaning(index, meaningIndex) {
            this.words[index].meaning[meaningIndex].meaning.push("");
            setTimeout(
                () =>
                    document
                        .getElementById(
                            `meaning_${index}_${meaningIndex}_${
                                this.words[index].meaning[meaningIndex].meaning.length - 1
                            }`
                        )
                        .focus(),
                10
            );
        },
        save() {
            const element = document.createElement("a");
            element.setAttribute(
                "href",
                "data:application/octet-stream;charset=utf-8," +
                    encodeURIComponent(JSON.stringify({ wtName: this.wtName, words: this.words }, null, 2))
            );
            element.setAttribute("download", `${this.wtName}.wt`);
            document.body.appendChild(element);
            element.click();
            element.remove();
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
.bottom-buttons {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}
.bottom-buttons button {
    margin: 10px 10px;
}
.wt-name {
    width: 100%;
    margin-bottom: 20px;
    text-align: center;
}
.wt-name input {
    width: 100%;
    max-width: 200px;
}
.wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
}
h1 {
    font-size: 36px;
    font-weight: 100;
    margin: 3% 0;
}
ol {
    margin: 0;
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
    display: flex;
    align-items: flex-start;
    width: 38%;
    margin-right: 2%;
}
li {
    margin-bottom: 10px;
}
.word input {
    width: 100%;
}
.word-meaning {
    width: 56%;
    margin: 0 2%;
}
.part-meaning {
    display: flex;
    width: 100% !important;
}
.meaning {
    width: 100%;
    display: flex;
    justify-content: center;
}
.meaning select {
    width: 18%;
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
.meaning div button {
    margin-bottom: 4px;
}
</style>
