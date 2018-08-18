import React from 'react'
import {Email, Item, Span, A, renderEmail} from 'react-html-email'

export const createEmails = interactions =>
  interactions.map(
    renderEmail(
      <Email title="Your Nicebreakers report.">
        <Item align="center">
          <Span fontSize={20}>interaction.</Span>
        </Item>
      </Email>
    )
  )
