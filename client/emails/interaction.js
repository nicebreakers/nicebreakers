import React from 'react'
import {Image, Span} from 'react-html-email'
import {connect} from 'react-redux'

const nameStyle = {
  fontFamily: 'verdana',
  fontSize: 26,
  color: 'blue'
}

const InteractionTemplate = ({interaction, userReports, user, prompts}) => {
  let otherUser =
    interaction.aId === user.id
      ? userReports[interaction.bId]
      : userReports[interaction.aId]

  let otherResponse =
    interaction.aId === user.id ? interaction.aInput : interaction.bInput

  return (
    <tr>
      <td style={{paddingBottom: '100px'}}>
        <Image
          alt={`A picture of ${otherUser.firstName}`}
          src={otherUser.imageURL}
          width={200}
          height={200}
          style={{borderRadius: '25%'}}
        />
        <div
          style={{
            paddingTop: '30px',
            paddingBottom: '30px',
            textAlign: 'center'
          }}
        >
          <Span style={nameStyle}>{`${otherUser.firstName} ${
            otherUser.lastName
          }`}</Span>
        </div>
      </td>
      <td
        style={{textAlign: 'left', paddingLeft: '50px', paddingBottom: '100px'}}
      >
        <Span style={{fontSize: 20, fontWeight: 'bold'}}>
          You talked about:
        </Span>
        <br />
        <Span style={{fontSize: 18}}>
          {prompts[interaction.promptId].question}
        </Span>
        <br />
        <br />
        <Span style={{fontSize: 20, fontWeight: 'bold'}}>You said: </Span>
        <br />
        <Span style={{fontSize: 18}}>{otherResponse || ''}</Span>
      </td>
    </tr>
  )
}

const mapStateToProps = state => {
  return {
    prompts: state.prompt.byId
  }
}

export default connect(mapStateToProps)(InteractionTemplate)
