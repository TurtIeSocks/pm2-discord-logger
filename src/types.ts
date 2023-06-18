export interface Config {
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

export interface Data {
  process: {
    name: string
    version?: string
    restart_time?: number
    unstable_restarts?: number
  }
  event?:
    | 'kill'
    | 'exception'
    | 'restart'
    | 'exit'
    | 'delete'
    | 'start'
    | 'stop'
    | 'online'
    | 'restart overlimit'
  data: string | object
  at: number
}

export interface Message extends Data {
  buffer?: string[]
  data: string
}

export type Role = 'log' | 'error' | 'event'
