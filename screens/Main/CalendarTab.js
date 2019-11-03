import React from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import RouteGuard from "../../navigation/RouteGuard";
import {logoutPatient} from '../../store';

export default function CalendarTab({navigation}) {
  RouteGuard(navigation);

  return (
      <Calendar style={{paddingTop: 100}}
          current={Date()}
          onDayPress={(day) => {console.log('selected day', day)}}
          monthFormat={'yyyy MM'}
          firstDay={0} // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
      />
  );
}
