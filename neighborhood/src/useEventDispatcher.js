import { ref } from 'vue';

export function useEventDispatcher() {
  const eventDetail = ref(null);

  const dispatchEvent = (type, header, message) => {
    eventDetail.value = {
      type,
      header,
      message,
    };
    window.dispatchEvent(new CustomEvent('jobCreated', { detail: eventDetail.value }));
  };

  return {
    dispatchEvent,
  };
}
