# pm2-discord-logger

PM2 Module for logging events & logs from your PM2 processes to Discord via webhooks. This module is designed to be used with [PM2](https://pm2.keymetrics.io/), it is not a standalone application.

## Install

To install and setup pm2-discord-logger, run the following commands:

```bash
  pm2 install pm2-discord-logger
```

## Config Properties

```ts
interface Config {
  /**
   * Duration in seconds to aggregate messages.
   * @default 1
   * */
  buffer_seconds?: number
  /**
   * Discord webhook url for logs
   * @default null
   * */
  log_url: string | null
  /**
   * Discord webhook url for errors
   * @default null
   * */
  error_url: string | null
  /**
   * Discord webhook url for events
   * @default null
   * */
  event_url: string | null

  // All of these are considered events and logged to the event channel

  /**
   * Enable kill event logs
   * @default false
   * */
  kill: boolean
  /**
   * Enable exception event logs
   * @default true
   * */
  exception: boolean
  /**
   * Enable restart event logs
   * @default true
   * */
  restart: boolean
  /**
   * Enable exit event logs
   * @default false
   * */
  exit: boolean
  /**
   * Enable delete event logs
   * @default false
   * */
  delete: boolean
  /**
   * Enable start event logs
   * @default true
   * */
  start: boolean
  /**
   * Enable stop event logs
   * @default true
   * */
  stop: boolean
  /**
   * Enable online event logs
   * @default true
   * */
  online: boolean
  /**
   * Enable restart overlimit event logs
   * @default true
   * */
  'restart overlimit': boolean
}
```

## Setup

1. Create a Discord Webhook for your server. See [this article](https://support.discordapp.com/hc/en-us/articles/228383668-Intro-to-Webhooks) for more information.
1. Set your PM2 config values
1. e.g:

```bash
  pm2 set pm2-discord-logger:log_url https://discordapp.com/api/webhooks/123456789/abcdefghijklmnopqrstuvwxyz
  pm2 set pm2-discord-logger:restart true
```

1. You can set the same or different webhook for each channel but logs will not be recorded if the webhook is not set.

## Development

1. Fork and clone the repo
1. Install dependencies

```bash
  yarn install
```

1. Build the project in watch mode

```bash
  yarn watch
```

1. Copy the `package.json` file into the `dist` folder

```bash
  cp package.json dist
```

1. Run the project locally in PM2

```bash
  cd dist
  pm2 install .
```

## Acknowledgements

Core concept inspired by [ben-sommer/pm2-discord](https://github.com/ben-sommer/pm2-discord-webhook)
