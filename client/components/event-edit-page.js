import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import EventForm from './game-forms/EventForm'
import {changeEventAllFields} from '../store/event'

class EditEventFormPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentEvent: {
        name: '',
        description: '',
        location: ''
      }
    }
  }

  componentDidMount() {
    this.setState({
      currentEvent: this.props.events.byId[this.props.match.params.eventId]
    })
  }
  onSubmit = updatedEvent => {
    this.props.submitEvent(updatedEvent)
  }

  render() {
    return (
      <div>
        {/* Check to see that both currentEvent and a name (Which Sequelize validates notEmpty)
          If we have values to validate form with, we render the form. Otherwise, we display error page
        */}
        {this.state.currentEvent && this.state.currentEvent.name !== '' ? (
          <Fragment>
            <h1> Edit Event </h1>
            <EventForm
              initialValues={this.state.currentEvent}
              onSubmit={this.onSubmit}
            />
          </Fragment>
        ) : (
          <h2> It appears that this page cannot be loaded </h2>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  events: state.events
})

const mapDispatch = dispatch => ({
  submitEvent: updatedEvent => dispatch(changeEventAllFields(updatedEvent))
})
export default connect(mapState, mapDispatch)(EditEventFormPage)
