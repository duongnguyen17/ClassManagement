import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
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
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: '5%',
          right: 20,
          backgroundColor: '#fff',
          borderRadius: 50,
          width: 50,
          height: 50,
        }}
        onPress={() => {}}>
        <MaterialIcons name="add-circle-outline" size={50} color="#0066ff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Classes;
