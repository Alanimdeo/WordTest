<template>
    <div class="wrap">
        <h1>단어시험</h1>
        <router-link class="button" to="/create">단어장 생성</router-link>
        <p>또는</p>
        <label class="button bottom-margin" for="fileInput">단어장 불러오기</label>
        <input type="file" id="fileInput" accept=".wt" ref="file" @change="readFile()" />
    </div>
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
                this.$router.push({ name: "로드", params: { words: res.target.result } });
            };
            reader.onerror = (err) => {
                this.$toast.open({
                    message: "오류가 발생했습니다! 로그를 확인해주세요.",
                    type: "error",
                    position: "top",
                    duartion: 2000,
                });
                console.error(err);
            };
            reader.readAsText(file);
        },
    },
};
</script>

<style scoped>
.wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
input[type="file"] {
    display: none;
}

h1 {
    font-size: 64px;
    font-weight: 100;
    margin-top: 0;
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
    margin: 0 auto;
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
.bottom-margin {
    margin-bottom: 10%;
}
</style>
