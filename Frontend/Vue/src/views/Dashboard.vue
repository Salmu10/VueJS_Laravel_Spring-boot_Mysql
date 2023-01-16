<template>
    <div class="dashboard_container">
        <h1>Dashboard</h1>
        <div class="buttons_box">
            <router-link to="/dashboard/categories" class="button">Categories List</router-link>
            <router-link to="/dashboard/tables" class="button">Tables List</router-link>
            <router-link to="/dashboard/users" class="button">Users List</router-link>
            <router-link to="/dashboard/reserves" class="button">Reserves List</router-link>
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
        min-height: 80vh;
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
            .button {
                display: block;
                margin: auto;
                text-align: center;
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