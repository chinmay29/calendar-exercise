import React, {PureComponent, PropTypes} from 'react';
import {EVENT_PROP_TYPE} from './constants';
import {getDisplayDate, getDisplayHour} from '../utils';

import './EventDetailOverlay.css';

export default class EventDetailOverlay extends PureComponent {
    _handleClickOutside(event) {
      //when clicking outside of the component. call onClose method of props
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.onClose()
        }
    }
    _handleKeyPress(e) {
      //when pressed esc key, call close method
      if(e.keyCode === 27) {
          this.props.onClose()
      }
    }
    componentDidMount() {
      document.addEventListener('keydown', this._handleKeyPress.bind(this));
      document.addEventListener('mousedown', this._handleClickOutside.bind(this));
    }
    componentWillUnmount () {
      document.removeEventListener('keydown', this._handleKeyPress.bind(this));
      document.removeEventListener('mousedown', this._handleClickOutside.bind(this));
    }
    static propTypes = {
        event: EVENT_PROP_TYPE.isRequired,
        onClose: PropTypes.func.isRequired
    }

    render() {
        let {event, onClose} = this.props;
        let {title, description, start, color, hours} = event;
        let displayDate = getDisplayDate(start);
        let startHour = (new Date(start)).getHours();

        // TODO: Fix. If hours was other than 1 the UI would break
        let endHour = startHour + hours;

        let startHourDisplay = getDisplayHour(startHour)
        let endHourDisplay = getDisplayHour(endHour);
        let displayDateTime = `${displayDate} ${startHourDisplay} - ${endHourDisplay}`

        // TODO: Add appropriate ARIA tags to overlay/dialog
        return (
            <section className="event-detail-overlay" role="dialog" aria-labelledby="dialog1Title" aria-describedby="dialog1Desc">
                <div className="event-detail-overlay__container" tabIndex="-1" ref={(node) => (this.wrapperRef = node)}>
                    <button
                        className="event-detail-overlay__close"
                        title="Close detail view"
                        onClick={onClose}
                    />
                    <div>
                        {displayDateTime}
                        <span
                            className={[`event-detail-overlay--${color}`, "event-detail-overlay__color"].join(' ')}
                            title={`Event label color: ${color}`}
                        />
                    </div>
                    <h1 className="event-detail-overlay__title">
                        {title}
                    </h1>
                    <p>{description}</p>
                </div>
            </section>
        );
    }
}
