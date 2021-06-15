//hiện thị tên của học sinh
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {STATE_STUDENT} from '../constants';
const TagName = props => {
  const {student, nghiHoc} = props;
  //console.log(`student`, student);
  const [stateStudent, setStateStudent] = useState(STATE_STUDENT.HOC);
  const nghiHocCoPhep = () => {
    if (
      stateStudent === STATE_STUDENT.HOC ||
      stateStudent === STATE_STUDENT.NGHI_KHONG_PHEP
    ) {
      nghiHoc(student._id, STATE_STUDENT.NGHI_PHEP);
      setStateStudent(STATE_STUDENT.NGHI_PHEP);
    } else {
      nghiHoc(student._id, STATE_STUDENT.HOC);
      setStateStudent(STATE_STUDENT.HOC);
    }
  };
  const nghiHocKhongPhep = () => {
    if (
      stateStudent === STATE_STUDENT.HOC ||
      stateStudent === STATE_STUDENT.NGHI_PHEP
    ) {
      nghiHoc(student._id, STATE_STUDENT.NGHI_KHONG_PHEP);
      setStateStudent(STATE_STUDENT.NGHI_KHONG_PHEP);
    } else {
      nghiHoc(student._id, STATE_STUDENT.HOC);
      setStateStudent(STATE_STUDENT.HOC);
    }
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 45,
        width: '100%',
        borderTopWidth: 0.5,
        borderColor: '#d9d9d9',
        alignItems: 'center',
      }}>
      <Text style={{marginLeft: 10, flex: 1, fontSize: 18}}>
        {student.name}
      </Text>
      <View
        style={{
          width: 90,
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginRight: 15,
        }}>
        <MaterialCommunityIcons
          name={
            stateStudent === STATE_STUDENT.HOC ||
            stateStudent === STATE_STUDENT.NGHI_KHONG_PHEP
              ? 'checkbox-blank-circle-outline'
              : 'check-circle-outline'
          }
          size={26}
          onPress={() => {
            nghiHocCoPhep();
          }}
        />
        <MaterialCommunityIcons
          name={
            stateStudent === STATE_STUDENT.HOC ||
            stateStudent === STATE_STUDENT.NGHI_PHEP
              ? 'checkbox-blank-circle-outline'
              : 'close-circle'
          }
          size={26}
          onPress={() => {
            nghiHocKhongPhep();
          }}
        />
      </View>
    </View>
  );
};

export default TagName;
