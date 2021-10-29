<template>
  <svg :width="config.width" :height="config.height" class="">
    <defs>
      <path
        id="fly"
        :d="config.path"
        fill="none"
      />
      <radialGradient
        id="radial"
        cx="50%"
        cy="50%"
        fx="100%"
        fy="50%"
        r="50%"
      >
        <stop offset="0%" stop-color="#fff" stop-opacity="1"></stop>
        <stop offset="100%" stop-color="#fff" stop-opacity="0"></stop>
      </radialGradient>
      <mask id="fly-mask">
        <circle r="40" cx="0" cy="0" fill="url(#radial)">
          <animateMotion
            dur="14s"
            :path="config.path"
            rotate="auto"
            repeatCount="indefinite"
          />
        </circle>
      </mask>
    </defs>
    <use
      href="#fly"
      stroke-width="1"
      stroke="#235fa7"
    />
    <!-- 用mask可以显现交接处 stroke="#00BCFF" -->
    <use
      href="#fly"
      stroke-width="4"
      stroke="#00BCFF"
      mask="url(#fly-mask)"
    />
  </svg>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default: {
        width: 0,
        height: 0,
        path: ''
      }
    }
  }
}
</script>

<style>

</style>