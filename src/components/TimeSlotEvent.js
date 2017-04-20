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
        let endHour = new Date(start).getHours() + hours;
        let currentHour = new Date().getHours();

        const componentClasses = [`time-slot-event time-slot-event--${color}`];
        //when end hour is in the past for the current date(DD MM YY), fade it out or when the event date is in the past fade it out
        //TO compare it with current date, have to check for all three: date, month and year.
        if((new Date().getDate() === new Date(start).getDate()) && (new Date().getMonth() === new Date(start).getMonth()) && (new Date().getFullYear() === new Date(start).getFullYear())) {
          if(currentHour > endHour){
            componentClasses.push('fadeOut');
          }
        } else if(new Date() > new Date(start)){
          componentClasses.push('fadeOut');
        }

        return (
            <button className={componentClasses.join(' ')} onClick={onSelect}>
                {title}
            </button>
        );
    }
}
