import React, {PureComponent, PropTypes} from 'react';
import {EVENT_PROP_TYPE} from './constants';

import './TimeSlotEvent.css';

export default class TimeSlotEvent extends PureComponent {
    static propTypes = {
        event: EVENT_PROP_TYPE.isRequired,
        onSelect: PropTypes.func.isRequired,
    }

    render() {
        let {
            event: {title, start, color, hours},
            onSelect,
        } = this.props;
        let startHour = (new Date(start)).getHours();
        let endHour = startHour + hours;
        let currentHour = (new Date()).getHours();

        const componentClasses = [`time-slot-event time-slot-event--${color}`];
        if(currentHour >= endHour){
          componentClasses.push('fadeOut');
        }

        return (
            <button className={componentClasses.join(' ')} onClick={onSelect}>
                {title}
            </button>
        );
    }
}
