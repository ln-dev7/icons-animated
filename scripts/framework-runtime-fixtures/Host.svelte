<script>
  let { Icon, iconProps } = $props();
  let controlled = $state(true);
  let instance;

  export function setControlled(value) {
    controlled = value;
  }

  export function getHandle() {
    return instance;
  }
</script>

<Icon {...iconProps} {controlled} bind:this={instance} />
