import React, {useRef, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TableSchedule from './TableSchedule';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Schedule = props => {
  const scrollView = useRef(null);
  useEffect(() => {
    scrollView.current.scrollTo({x: 0, y: 60, animated: true});
  }, []);
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}} ref={scrollView}>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            marginRight: 10,
            marginVertical: 10,
            backgroundColor: '#fff',
            borderRadius: 50,
          }}>
          <MaterialIcons
            name="edit"
            size={35}
            color={'#3399ff'}
            style={{marginHorizontal: 5, marginVertical: 5}}
          />
        </TouchableOpacity>
        {props.schedule.map((value, index) => (
          <TableSchedule {...value} key={index} />
        ))}
      </ScrollView>
    </View>
  );
};
export default Schedule;
