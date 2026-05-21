const onxrloaded = () => {
  XR8.addCameraPipelineModule(LandingPage.pipelineModule())
  LandingPage.configure({
    mediaSrc: './assets/preview.jpg'
  })
}
window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded)

