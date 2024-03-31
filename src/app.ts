import pm2 from 'pm2'
import io from '@pm2/io'
import { DiscordLogger } from './Discord'
import { Config, Data } from './types'

io.initModule({}, (err: Error) => {
  console.log('Starting up pm2-discord-logger')
  if (err) {
    console.error(err)
    process.exit(1)
  }
  const conf = io.getConfig() as Config

  conf.buffer_seconds =
    conf.buffer_seconds && conf.buffer_seconds > 0 && conf.buffer_seconds < 5
      ? conf.buffer_seconds
      : 1

  const logClient = conf.log_url ? new DiscordLogger(conf.log_url, 'log') : null
  const errorClient = conf.error_url
    ? new DiscordLogger(conf.error_url, 'error')
    : null
  const eventClient = conf.event_url
    ? new DiscordLogger(conf.event_url, 'event')
    : null

  // Start listening on the PM2 BUS
  pm2.launchBus(async (err, bus) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    // Listen for process logs
    if (logClient) {
      bus.on('log:out', (data: Data) => {
        logClient.pushToBuffer(data)
      })
    }

    // Listen for process errors
    if (errorClient) {
      bus.on('log:err', (data: Data) => {
        errorClient.pushToBuffer(data)
      })
    }

    // Listen for process events
    if (eventClient) {
      // Listen for PM2 kill
      bus.on('pm2:kill', (data: Data) => {
        eventClient.createMessage(
          data,
          `${DiscordLogger.getTitle(data)} Killed`
        )
      })

      // Listen for process exceptions
      bus.on('process:exception', (data: Data) => {
        eventClient.createMessage(
          data,
          `${DiscordLogger.getTitle(data)} Exception`
        )
      })

      // Listen for PM2 events
      bus.on('process:event', (data: Data) => {
        if (data.event && conf[data.event]) {
          eventClient.createMessage(
            data,
            '',
            `Restart Count: ${data.process.restart_time}\nUnstable Restarts: ${data.process.unstable_restarts}`
          )
        }
      })
    }

    setInterval(async () => {
      await Promise.allSettled(
        [logClient, errorClient, eventClient].map(async (client) => {
          if (client) {
            await client.sendMessages()
          }
        })
      )
    }, (conf.buffer_seconds || 1) * 1000)
  })
})
