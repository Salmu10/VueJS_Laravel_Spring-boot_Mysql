<template>
    <footer>
        <div class="footer">
            <div class="page_logo_box">
                <img src="../assets/logo.png" alt="logo"/>
            </div>
            <div class="text_box">
                <p>Restaurant project by Salva Muñoz</p>
            </div>
            <div class="logo_box">
                <img src="../assets/Logo_Salmu.png" alt="logo"/>
            </div>        
        </div>
    </footer>
</template>

<script>
</script>

<style lang="scss">

    .footer {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        width: 100%;
        // margin-top: 2%;
        padding: 2em 0;
        background-color: #142b3b;
        color: white;
        align-items: center;
        .page_logo_box {
            grid-column-start: 1;
            grid-column-end: 2;
            text-align: left;
            img {
                width: 45%;
                margin-left: 30%;
            }
        }
        .text_box {
            grid-column-start: 2;
            grid-column-end: 3;
            text-align: center;
            font-size: 16px;
            font-weight: bold;
        }
        .logo_box {
            grid-column-start: 3;
            grid-column-end: 4;
            text-align: right;
            img {
                width: 10%;
                margin-right: 30%;
            }
        }
    }

</style>