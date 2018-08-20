import React, {Fragment} from 'react'
import {Email, Box, Item, Image, Span, A, renderEmail} from 'react-html-email'
import InteractionTemplate from './interaction'
import store from '../store'

export const EmailTemplate = ({userReports, user}) => {
  const mailtitle = `Nicebreakers: ${user.firstName}'s Post-Event Report`
  return (
    <Email title={mailtitle} style={{backgroundColor: 'white'}}>
      <Box cellSpacing={20}>
        <Item style={{border: '0'}}>
          <Span fontSize={20} style={{fontWeight: 'bold'}}>
            {mailtitle}
          </Span>
        </Item>
        <Box>
          {user.interactions.map(interaction => (
            <InteractionTemplate
              key={interaction.id}
              interaction={interaction}
              userReports={userReports}
              user={user}
              store={store}
            />
          ))}
        </Box>
      </Box>
    </Email>
  )
}

export const createHtmlEmails = userReports =>
  Object.values(userReports).map(user => ({
    to: user.email,
    html: renderEmail(<EmailTemplate user={user} userReports={userReports} />)
  }))

export const Report = ({userReports}) => (
  <Box>
    {Object.values(userReports).map(user => (
      <Fragment key={user.id}>
        <Item style={{border: '0'}}>
          <Span fontSize={20} style={{fontWeight: 'bold'}}>{`Nicebreakers: ${
            user.firstName
          }'s Post-Event Report`}</Span>
        </Item>
        <Item>
          {user.interactions.map(interaction => (
            <InteractionTemplate
              key={interaction.id}
              user={user}
              interaction={interaction}
              userReports={userReports}
            />
          ))}
        </Item>
      </Fragment>
    ))}
  </Box>
)