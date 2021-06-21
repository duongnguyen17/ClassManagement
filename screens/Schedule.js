import React, {useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TableScheduleTemp from '../components/table/TableScheduleTemp';
import {getSchedule} from '../realm';
import {useIsFocused} from '@react-navigation/native';
const Schedule = props => {
  const isFocused = useIsFocused();
  const [schedule, setSchedule] = useState({_id: 1, days: []});
  useEffect(() => {
    if (isFocused) m_getSchedule();
  }, [isFocused]);
  const m_getSchedule = async () => {
    let scheduleTemp = await getSchedule(props.classId);
    //console.log(`scheduleTemp`, scheduleTemp);
    setSchedule(scheduleTemp);
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        {schedule.days.map((value, index) => (
          <TableScheduleTemp day={value} key={value._id} />
        ))}
      </ScrollView>
    </View>
  );
};
export default Schedule;
