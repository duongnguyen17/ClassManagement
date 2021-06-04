import React from 'react';
import {Text, View} from 'react-native';
import TagName from './TagName';

const TableStudent = props => {
  const {students} = props;
  return (
    <View style={{marginTop: 10, width: '100%', alignItems: 'center'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 20,
        }}>
        <View style={{flex: 1, marginLeft: 20}}>
          <Text style={{marginLeft: 10, fontSize: 18}}>Họ tên</Text>
        </View>

        <View
          style={{
            width: 95,
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginRight: 20,
          }}>
          <Text style={{marginRight: 10}}>Có phép</Text>
          <Text>Ko phép</Text>
        </View>
      </View>
      {students.map((value, index) => (
        <TagName key={index} name={value.name} _id={value._id} />
      ))}
    </View>
  );
};
export default TableStudent;
