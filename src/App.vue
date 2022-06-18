<template>
    <div class="container">
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<style>
body {
    background: rgb(36, 231, 74);
    background: linear-gradient(90deg, rgba(36, 231, 74, 1) 0%, rgba(0, 183, 255, 1) 100%);
    overflow-y: scroll;
    margin: 0;
    display: inline;
}

#app {
    height: 94vh;
    max-width: 100vw;
}

.container {
    width: 100vw;
    max-width: 500px;
    background: white;
    height: 100%;
    margin: 3vh auto 3vh auto;
    border-radius: 15px;
    box-shadow: 10px 10px 20px 3px rgba(0, 0, 0, 0.3);
}
.content {
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    margin: 15px;
    display: inline-block;
    text-align: center;
}
</style>
