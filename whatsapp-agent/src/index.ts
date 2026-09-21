import { config } from './config.js'
import { app } from './app.js'

app.listen(config.port, () => {
  console.log(`Lais Mota WhatsApp agent listening on port ${config.port} (model: ${config.anthropicModel})`)
  if (!config.oabNumber) {
    console.warn('OAB_NUMBER is not set — the assistant will introduce itself without a registration number.')
  }
})
