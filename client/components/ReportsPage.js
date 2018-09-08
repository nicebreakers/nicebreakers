import React, {Fragment} from 'react'
import axios from 'axios'
import {Report} from '../emails/report'

export default class ReportsPage extends React.Component {
  state = {reports: {}}

  async componentDidMount() {
    try {
      const {eventId} = this.props.match.params
      const {data: reports} = await axios.get(
        `/api/interactions/event/${eventId}`
      )
      this.setState({reports})
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <Fragment>
        <div className="section" />
        <div className="container" style={{backgroundColor: 'white'}}>
          <h4 className="header">Nicebreakers Event Report Summary</h4>
          <Report userReports={this.state.reports} />
          <div className="section">{`\u00a0`}</div>
        </div>
      </Fragment>
    )
  }
}
