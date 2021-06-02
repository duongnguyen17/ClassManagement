import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

import TagClass from '../components/TagClass';
const Classes = props => {
  const [classes, setClasses] = useState([
    {
      name: '12A4',
      year: '2014-2017',
      teacher: 'Nguyễn Văn Duy',
    },
    {
      name: '12A2',
      year: '2014-2017',
      teacher: 'Nguyễn Văn Vũ',
    },
  ]);
  const gotoClass = (classId, className) => {
    props.navigation.navigate('Class', {_id: classId, name: className});
  };
  const showModal = data => {};
  return (
    <SafeAreaView>
      <ScrollView>
        {classes.map((value, index) => (
          <TagClass
            key={index}
            inforClass={value}
            onPress={gotoClass}
            isEdit={false}
            onLongPress={showModal}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Classes;
