<template>
  <div id = "rule-form"> 
     <div>
         <label> <h3>How would you like to filter your packets?</h3> </label>
 
</div>
      
      <div>
          <label> <h3>IP Address:</h3> </label>
          <input type = "text" v-model = "ip">
          <button @click = "addIP"> Add IP </button>
          

            <label> <h3>Protocol:</h3> </label>
          <input type = "text" v-model = "protocol">
          <button @click = "addProtocol"> Add Protocol </button>
      </div>
        
          </div>
</template>
<script>
export default {
    
}
</script>






