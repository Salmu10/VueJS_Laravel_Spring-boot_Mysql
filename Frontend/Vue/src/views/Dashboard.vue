<template>
    <div class="dashboard_container">
        <h1>Dashboard</h1>
        <div class="buttons_box">
            <router-link to="/dashboard/categories"><button>Categories List</button></router-link>
            <router-link to="/dashboard/tables"><button>Tables List</button></router-link>
        </div>
    </div>
</template>
  
<script>
    export default {};
</script>
  
<style lang="scss">

    .dashboard_container {
        width: 100%;
        padding: 20px;
        min-height: 68vh;
        h1 {
            text-align: center;
            text-transform: uppercase;
            font-weight: bold;
            font-size: 35px;
            color: #333;
        }
        .buttons_box {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            button {
                display: block;
                margin: auto;
                margin-top: 2%;
                width: 200px;
                padding: 15px;
                text-transform: uppercase;
                font-weight: bold;
                font-size: 15px;
                border: 2px solid #333;
                border-radius: 10px; 
                background-color: #EAF2E3;
                color: #333;
                &:hover{
                    background-color: #66D7D1;
                }
            }
        }
    }


</style>