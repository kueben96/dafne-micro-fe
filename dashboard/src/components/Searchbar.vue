<template>
<div class="search-bar">
    <input v-model="searchQuery" @input="performSearch" placeholder="Search...">
</div>

</template>

<script>
import Search from 'ol-ext/control/SearchNominatim';

</script>