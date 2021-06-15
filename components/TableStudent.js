import React from 'react';
import {Text, View, FlatList} from 'react-native';
import TagName from './TagName';

const TableStudent = props => {
  const {students, nghiHoc} = props;
  return (
    <View
      style={{
        marginHorizontal: 6,
        alignItems: 'center',
        // backgroundColor: '#fff',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 20,
          marginBottom: 15,
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
      <FlatList
        style={{width: '100%'}}
        data={students}
        renderItem={(item, index) => (
          <TagName student={item.item} nghiHoc={nghiHoc} />
        )}
        keyExtractor={item => item._id}
      />
    </View>
  );
};
export default TableStudent;
