import React, {useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TableSchedule from '../components/table/TableSchedule';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getSchedule} from '../realm';
const Schedule = props => {
  const [schedule, setSchedule] = useState({_id: 1, days: []});
  //console.log(`schedule`, schedule);
  // const [isEdit, setIsEdit] = useState(false);
  // const scrollView = useRef(null);
  // useEffect(() => {
  //   scrollView.current.scrollTo({x: 0, y: 60, animated: true});
  // }, []);
  useEffect(() => {
    m_getSchedule();
  }, []);
  const m_getSchedule = async () => {
    let scheduleTemp = await getSchedule(props.classId);
    setSchedule(scheduleTemp);
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        {/* <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            marginRight: 10,
            marginVertical: 10,
            backgroundColor: '#fff',
            borderRadius: 50,
          }}
          onPress={() => {
            setIsEdit(!isEdit);
          }}>
          <MaterialIcons
            name={isEdit ? 'check-circle-outline' : 'edit'}
            size={35}
            color={'#3399ff'}
            style={{marginHorizontal: 5, marginVertical: 5}}
          />
        </TouchableOpacity> */}
        {schedule.days.map((value, index) => (
          <TableSchedule day={value} key={value._id} />
        ))}
      </ScrollView>
    </View>
  );
};
export default Schedule;
