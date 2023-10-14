<template>
  <div>
    <h1>Neighborhood Generation</h1>
    <button @click="increment">Counter</button>
    <div>{{ arrayOfEmojis }}</div>
    <div v-if="palette">
      <div :style="{ color: palette.primary.main }">Primary Color: {{ palette.primary.main }}</div>
    </div>
    <p>Counter Value: {{ counter }}</p>
  </div>

</template>

<script>
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import {ref, onMounted, watch, computed, reactive} from 'vue';  


async function fetchPalette() {
  const palette = await import('theme/palette');
  console.log("fetchPalette function")
  console.log(palette.default)
  
  return palette.default;
}

export default {
  props: {
    emoji: {
      type: String,
      default: '💩',
    },
  },

  setup(props, context) {
    console.log("setup function")
    console.log("props")
    console.log(props)
    console.log("context")
    console.log(context)

    const counter = ref(0)
    const increment = () => {
      counter.value++
    }

    watch(counter, current => {
      if(current ===5) console.log("counter is 5")
    })

    const arrayOfEmojis = computed(() => 
      Array.from(new Array(counter.value), ()=> props.emoji).join(' ')
    );

    const palette = ref(null);
    // fetchPalette().then((data) => {
    //   palette.value = reactive(data);
    // });
    onMounted(async () => {
      // Fetch the palette
      const data = await fetchPalette();
      // Set the CSS variable for primary color
      document.documentElement.style.setProperty(
        '--primary-color',
        data.primary.main
      );
      // Update the reactive palette value
      palette.value = reactive(data);
    });

    return {
      palette, counter, increment, arrayOfEmojis
    };
  },

  data() {
    return {
      tasksCheckbox: [],
      dropdownCity: null,
      events: null,
    };
  },

};



</script>

<style lang="scss">

body {
  background-color: var(--primary-color);

}

$fontSize: 14px;
// $bodyBgColor: v-bind('palette?.primary?.main');
$bodyBgColor: #fff;
$textColor: #333333;
$textSecondaryColor: #707070;
$borderRadius: 3px;
$dividerColor: #e3e3e3;
$transitionDuration: 0.2s;
$maskBgColor: #424242;
$focusShadowColor: #8dcdff;

/* Menu Common */
$menuitemBadgeBgColor: #007be5;
$menuitemBadgeColor: #ffffff;
$submenuFontSize: 13px;
$menuitemActiveRouteColor: #1fa1fc;

/* Menu Light */
$menuBgColorFirst: #f3f4f9;
$menuBgColorLast: #d7dbe8;
$menuitemColor: #232428;
$menuitemHoverColor: #0388e5;
$menuitemActiveColor: #0388e5;
$menuitemActiveBgColor: #ffffff;
$menuitemBorderColor: rgba(207, 211, 224, 0.6);

/* Menu Dark */
$menuDarkBgColorFirst: #4d505b;
$menuDarkBgColorLast: #3b3e47;
$menuitemDarkColor: #ffffff;
$menuitemDarkHoverColor: #0388e5;
$menuitemDarkActiveColor: #0388e5;
$menuitemDarkActiveBgColor: #2e3035;
$menuitemDarkBorderColor: rgba(52, 56, 65, 0.6);

/* Topbar */
$topbarLeftBgColor: #0388e5;
$topbarRightBgColor: #07bdf4;
$topbarItemBadgeBgColor: #ef6262;
$topbarItemBadgeColor: #ffffff;
$topbarItemColor: #ffffff;
$topbarItemHoverColor: #c3e8fb;
$topbarSearchInputBorderBottomColor: #ffffff;
$topbarSearchInputColor: #ffffff;









</style>
