<template>
    <h1>단어시험</h1>
    <router-link class="button" to="/create">단어장 생성</router-link>
    <p>또는</p>
    <label class="button" for="fileInput">단어장 불러오기</label>
    <input type="file" id="fileInput" accept=".wt" ref="file" @change="readFile()" />
    <!-- <p>hello</p> -->
</template>

<script>
export default {
    data() {
        return {
            words: {},
            input: "",
        };
    },
    methods: {
        readFile() {
            const file = this.$refs.file.files[0];
            const reader = new FileReader();
            if (!file.name.toLowerCase().endsWith(".wt"))
                return this.$toast.open({
                    message: ".wt 파일만 불러올 수 있습니다.",
                    type: "error",
                    position: "top",
                    duration: 2000,
                });
            reader.onload = (res) => {
                this.$router.push({ name: "테스트", params: { words: res.target.result } });
            };
            reader.onerror = (err) => console.error(err);
            reader.readAsText(file);
        },
    },
};
</script>

<style scoped>
input[type="file"] {
    display: none;
}

h1 {
    font-size: 64px;
    font-weight: 100;
    margin-top: 30%;
}

.button {
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
    /* width: auto; */
    margin: auto;
    text-align: center;
    color: white;
    text-decoration-line: none;
}

.button:hover {
    opacity: 0.9;
}

.button:active {
    background-color: #1666a8;
}
</style>
