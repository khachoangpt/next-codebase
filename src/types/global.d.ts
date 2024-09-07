/* eslint-disable @typescript-eslint/no-empty-object-type */
import type messages from '#/messages'

type Messages = typeof messages

declare global {
  interface IntlMessages extends Messages {}
}
