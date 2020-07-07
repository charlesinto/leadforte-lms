import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import useJitsi from './useJitsi'
import Swal from 'sweetalert2'

const Jutsu = (props) => {
  const { domain, roomName, displayName, password, jwt = null, subject } = props
  const { loadingComponent, containerStyles, jitsiContainerStyles, onMeetingEnd } = props

  const [loading, setLoading] = useState(true)
  const jitsi = useJitsi({ roomName, parentNode: 'jitsi-container', jwt: jwt }, domain)

  const containerStyle = {
    width: '800px',
    height: '400px'
  }

  const jitsiContainerStyle = {
    display: loading ? 'none' : 'block',
    width: '100%',
    height: '100%'
  }

  useEffect(() => {
    if (jitsi) {
      jitsi.executeCommand('subject', subject)

      jitsi.addEventListener('videoConferenceJoined', () => {
        if (password) jitsi.executeCommand('password', password)
        setLoading(false)
        jitsi.executeCommand('displayName', displayName)
      })
      jitsi.addEventListener('readyToClose', () => onMeetingEnd())
      jitsi.addEventListener('passwordRequired', () => {
        if (password) {
          jitsi.executeCommand('password', password)
        }
        setLoading(false)
      })
    }

    return () => jitsi && jitsi.dispose()
  }, [jitsi, displayName, password, subject])

  return (
    <div style={{ ...containerStyle, ...containerStyles }}>
      {loading && (loadingComponent || <p>Loading ...</p>)}
      <div
        id='jitsi-container'
        style={{ ...jitsiContainerStyle, ...jitsiContainerStyles }}
      />
    </div>
  )
}

Jutsu.propTypes = {
  domain: PropTypes.string,
  roomName: PropTypes.string.isRequired,
  displayName: PropTypes.string,
  password: PropTypes.string,
  jwt: PropTypes.string,
  subject: PropTypes.string,
  loadingComponent: PropTypes.object,
  containerStyles: PropTypes.object,
  jitsiContainerStyles: PropTypes.object
}

export { Jutsu, useJitsi }